import Link from "next/link";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
// server sesssion es el mismo sersession de los componentes de cliente
//pero en este caso al ser un componente del backend usamos
// getserversession

export default async function Navbar() {
  const session = await getServerSession();
  console.log(session?.user, "ESTO ES SERVER SESSION");

  return (
    <nav className="bg-zinc-900 p-4">
      <div className="flex justify-between container mx-auto text-white">
        <Link href="/">NextAuth</Link>
        <ul className="flex gap-x-2">
          {session ? (
            <li className="px-3 py-1 text-white">
              {/* <li className="px-3 py-1 text-white" onClick={() => signOut()}> */}
              {/* nextauth tambien nos da una funcion de sign out que esta arriba */}
              <Link href="/api/auth/signout">Sign out</Link>
            </li>
          ) : (
            <>
              <li className="px-3 py-1 text-white">
                <Link href="/register">Register</Link>
              </li>
              <li className="px-3 py-1 text-white">
                <Link href="/login">Login</Link>
              </li>
              <li className="px-3 py-1 text-white">
                <Link href="/about">About us</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
