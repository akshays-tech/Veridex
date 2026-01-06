    const express = require('express');
    const router = express.Router();
    const fetch = require('node-fetch');
    const auth = require('../middleware/auth');
    const Skill = require('../models/Skill');
    const Event = require('../models/Event');

    // Summarize a skill's evidence using OpenAI
    router.post('/summarize/:skillId', auth, async (req,res)=>{
      const {skillId} = req.params;
      const skill = await Skill.findById(skillId).populate('evidence.eventId').lean();
      if(!skill) return res.status(404).json({error:'not found'});
      const OPENAI_KEY = process.env.OPENAI_API_KEY;
      if(!OPENAI_KEY) return res.status(400).json({error:'OpenAI key not configured'});
      // Build prompt
      const evidenceText = (skill.evidence || []).slice(0,8).map(ev=>`- ${ev.summary || ''} (${ev.eventId && ev.eventId.meta && ev.eventId.meta.file ? ev.eventId.meta.file : 'event'})`).join('\n');
      const prompt = `You are a helpful assistant. Create 2 outputs in JSON:
1) A concise resume bullet (max 30 words) summarizing the skill evidence.\n2) A human-friendly explanation (1-2 sentences) of the proof items.
Skill: ${skill.name}\nEvidence:\n${evidenceText}\n
Respond with JSON: { "bullet": "...", "explain": "..." }`;
      try {
        const resp = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST', headers: {'Content-Type':'application/json','Authorization':`Bearer ${OPENAI_KEY}`},
          body: JSON.stringify({ model: 'gpt-4o-mini', messages:[{role:'user', content: prompt}], max_tokens:300, temperature:0.2 })
        });
        const data = await resp.json();
        const txt = data?.choices?.[0]?.message?.content || JSON.stringify(data);
        // try parse JSON out of response
        let parsed = null;
        try { parsed = JSON.parse(txt); } catch(e){ parsed = { bullet: txt.slice(0,200), explain: '' } }
        res.json({ok:true, result: parsed, raw:data});
      } catch(err){
        res.status(500).json({error:String(err)});
      }
    });

    module.exports = router;
