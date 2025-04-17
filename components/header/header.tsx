"use client";

import Link from "next/link"
import Image from "next/image"
import logoImage from "@/app/favicon.ico"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react";

export default function Header() {
  const pathname = usePathname()
  const { data: session }
  = useSession()

const isLoggedIn = session?.user?.email !== undefined && session?.user?.email !== null
  return (
    <header className="md:fixed top-0 z-10 flex w-full items-center justify-between bg-[#000814] px-4 py-4 font-sans text-white md:px-24 ">
      <Link href="/" className="flex items-center space-x-2">
        <Image src="/Exauge.png" width={100} height={100} alt="header-logo" priority  />
        {/* <span className="text-lg font-semibold md:text-xl">Exauge</span> */}
      </Link>
      <nav>
        {
          isLoggedIn ? (
          <ul className="flex space-x-4 md:space-x-8">
            <li>
              <Link href="/dashboard" className="text-sm transition-colors duration-200 hover:text-gray-300 md:text-base">
                Dashboard
              </Link>
            </li>
            </ul>
          ) :(<ul className="flex space-x-4 md:space-x-8">
            <li>
              <Link href="/documentation" className="text-sm transition-colors duration-200 hover:text-gray-300 md:text-base">
                Documentation
              </Link>
            </li>
          {pathname !== "/login" && (
            <li>
              <Link href="/login" className="text-sm transition-colors duration-200 hover:text-gray-300 md:text-base">
                Login
              </Link>
            </li>
          )}
          {pathname !== "/register" && (
            <li>
              <Link
                href="/register"
                className="text-sm transition-colors duration-200 hover:text-gray-300 md:text-base"
              >
                Sign Up
              </Link>
            </li>
          )}
        </ul>)
        }
        
      </nav>
    </header>
  )
}

// import Link from "next/link"
// import Image from "next/image"
// import logoImage from '@/app/favicon.ico'

// export default function Header() {
//   return (
//     <header className="text-white font-sans bg-[#000814]">
//       <Link href="/">
//         <Image src={logoImage} alt="header-logo" priority />
//         Exauge
//       </Link>
//       <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
//         <div className="flex lg:flex-1">
//         <ul>
//           <li>
//             <Link href="/login" className="-m-1.5 p-1.5">Login</Link>
//           </li>
//           <li>
//             <Link href="/register">Sign Up</Link>
//           </li>
//         </ul>
//         </div>
//       </nav>
//     </header>
//   )
// }
