'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const Header = () => {
  const pathname = usePathname()

  const navLinks = [
    { href: '/clientes', label: 'Clientes' },
    { href: '/transacoes', label: 'Transações' },
  ];

  return (
    <header className="shadow-2xs">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image
              src="/images/logo.png"
              alt="Itaú Logo"
              width={40}
              height={40}
              className="rounded"
            />
            <h1 className="text-xl font-bold text-zinc-900">Itaú Banking</h1>
          </div>

          <nav>
            <ul className="flex space-x-6">
              {navLinks.map(({ href, label }) => {
                const isActive = pathname.startsWith(href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={
                        `transition-colors duration-200 font-medium ` +
                        (isActive
                          ? 'text-orange-500'
                          : 'text-zinc-900 hover:text-orange-500')
                      }
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}