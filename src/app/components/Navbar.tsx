import Link from 'next/link'

async function Navbar() {

  return (
    <nav className="bg-slate-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Pagina web - PCIBER</h1>
        </div>
        <div>
          <ul className="flex gap-4">
                <>
                  <li className='px-3 py-1.5 rounded'>
                    <Link href="/" className="hover:underline ">Home</Link>
                  </li>
                  <li className='px-3 py-1.5 rounded'>
                    <Link href="/auth/login" className="hover:underline">Login</Link>
                  </li>
                  <li className='px-3 py-1.5 rounded'>
                    <Link href="/auth/register" className="hover:underline">Register</Link>
                  </li>
                </>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar