import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'


async function Navbar() {

  const session = await getServerSession(authOptions)

  return (
    <nav className="bg-blue-300 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Pagina web - PCIBER</h1>
        </div>
        <div>
          <ul className="flex gap-4">
            {
              !session ? (
                <>
                  <li className='bg-blue-700 px-3 py-1.5 rounded'>
                    <Link href="/" className="hover:underline ">Home</Link>
                  </li>
                  <li className='bg-blue-700 px-3 py-1.5 rounded'>
                    <Link href="/auth/login" className="hover:underline">Login</Link>
                  </li>
                  <li className='bg-blue-700 px-3 py-1.5 rounded'>
                    <Link href="/auth/register" className="hover:underline">Register</Link>
                  </li>
                </>
              ): (
                
                <>
                  {/* <li className='bg-blue-700 px-3 py-1.5 rounded'>
                    <Link href="/" className="hover:underline ">Home</Link>
                  </li> */}
                  <li className='bg-blue-700 px-3 py-1.5 rounded'>
                    <Link href="/dashboard" className="hover:underline">Dashboard</Link>
                  </li>
                  <li className='bg-red-400 px-3 py-1.5 rounded'>
                    <Link href="/api/auth/signout" className="hover:underline">Logout</Link>
                  </li>
                </>
              )}
                </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar