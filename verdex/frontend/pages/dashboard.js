import useSWR from 'swr'
import axios from 'axios'
const fetcher = (url)=> axios.get(url).then(r=>r.data).catch(()=>null)
export default function Dashboard(){
  const token = typeof window !== 'undefined' ? localStorage.getItem('rr_token') : null
  const {data}=useSWR(() => token ? '/api/skills' : null, fetcher)
  const skills = data?.skills || []
  return (
    <div className='max-w-4xl mx-auto p-6'>
      <h1 className='text-2xl font-semibold mb-4'>Dashboard</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {skills.map(s=>(
          <div key={s._id} className='bg-white p-4 rounded shadow'>
            <h3 className='font-medium'>{s.name}</h3>
            <p className='text-sm'>Score: {s.score}</p>
            <p className='text-xs mt-2'>Evidence: {s.evidence?.length || 0}</p>
          </div>
        ))}
        {skills.length===0 && <div className='bg-white p-4 rounded shadow'>No skills found. Seed demo or add events.</div>}
      </div>
    </div>
  )
}
