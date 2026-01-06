import Link from 'next/link'
export default function Home(){
  return (
    <div className='min-h-screen bg-gray-50'>
      <header className='bg-white shadow'>
        <div className='max-w-4xl mx-auto py-6 px-4'>
          <h1 className='text-2xl font-semibold'>RealityResume</h1>
        </div>
      </header>
      <main className='max-w-4xl mx-auto p-6'>
        <section className='bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg p-8 mb-6'>
          <h2 className='text-xl font-bold'>Living, proof-based resumes — automated</h2>
          <p className='mt-2 text-sm opacity-90'>Connect GitHub, Figma, VS Code and let RealityResume build evidence-backed bullets for your CV.</p>
          <div className='mt-4'>
            <Link href='/auth'><a className='bg-white text-indigo-600 px-4 py-2 rounded'>Get started — Demo</a></Link>
          </div>
        </section>
        <section className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='bg-white rounded shadow p-4'>
            <h3 className='font-medium'>Demo Account</h3>
            <p className='text-sm mt-2'>Use the seeded demo user after running backend seed script.</p>
          </div>
          <div className='bg-white rounded shadow p-4'>
            <h3 className='font-medium'>Features</h3>
            <ul className='list-disc list-inside text-sm mt-2'>
              <li>Auto-detect skills from events</li>
              <li>AI-powered resume bullet summarizer</li>
              <li>Proof dashboard & PDF export (basic)</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  )
}
