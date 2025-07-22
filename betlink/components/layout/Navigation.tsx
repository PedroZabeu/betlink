"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/admin", label: "Admin", role: "Master/Admin" },
    { href: "/meus-canais", label: "Meus Canais", role: "Tipster" },
    { href: "/dashboard", label: "Dashboard", role: "Cliente" },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-blue-600">BetLink</span>
            <span className="text-sm text-gray-500">Beta</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  "hover:bg-gray-100",
                  pathname === link.href
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                {link.label}
                {link.role && (
                  <span className="ml-1 text-xs text-gray-400">({link.role})</span>
                )}
              </Link>
            ))}
          </div>

          {/* User Info (Placeholder) */}
          <div className="flex items-center space-x-3">
            <Link
              href="/login"
              className="text-sm text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              Entrar
            </Link>
            <Link
              href="/signup"
              className="text-sm bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg"
            >
              Cadastrar
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}