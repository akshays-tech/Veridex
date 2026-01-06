import {useState} from 'react'
import axios from 'axios'
export default function Auth(){
  const [email,setEmail]=useState('demo@local')
  const [pass,setPass]=useState('demo')
  async function signup(){ try{ const r=await axios.post('/api/auth/signup',{name:'Demo',email,password:pass}); alert('Signed up: '+r.data.token) }catch(e){ alert('err') } }
  async function login(){ try{ const r=await axios.post('/api/auth/login',{email,password:pass}); localStorage.setItem('rr_token', r.data.token); alert('Logged in (token saved)') }catch(e){ alert('err') } }
  return (
    <div className='max-w-md mx-auto mt-20'>
      <div className='bg-white p-6 rounded shadow'>
        <h2 className='text-lg font-semibold'>Quick Demo Login</h2>
        <label className='block mt-3 text-sm'>Email</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} className='w-full border p-2 rounded' />
        <label className='block mt-3 text-sm'>Password</label>
        <input value={pass} onChange={e=>setPass(e.target.value)} className='w-full border p-2 rounded' />
        <div className='mt-4 flex gap-2'>
          <button onClick={login} className='bg-indigo-600 text-white px-3 py-2 rounded'>Login</button>
          <button onClick={signup} className='bg-gray-200 px-3 py-2 rounded'>Signup</button>
        </div>
      </div>
    </div>
  )
}
