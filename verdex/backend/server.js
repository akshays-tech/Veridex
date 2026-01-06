require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./src/routes/auth');
const apiRoutes = require('./src/routes/api');
const aiRoutes = require('./src/routes/ai');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json({limit:'1mb'}));

// MongoDB connect
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/realityresume_dev';
mongoose.connect(MONGODB_URI).then(()=>console.log('MongoDB connected')).catch(err=>console.error(err));

// Routes
app.get('/health', (req,res)=> res.json({status:'ok'}));
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);
app.use('/ai', aiRoutes);

app.listen(PORT, ()=> console.log(`Backend listening on ${PORT}`));
