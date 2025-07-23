"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/features/auth/AuthProvider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Settings, ChevronDown } from "lucide-react";

export default function Navigation() {
  const pathname = usePathname();
  const { user, profile, loading, signOut } = useAuth();

  // Filter links based on user role
  const getVisibleLinks = () => {
    const baseLinks = [{ href: "/", label: "Home" }];
    
    if (!profile) return baseLinks;
    
    switch (profile.role) {
      case 'Master':
      case 'Admin':
        return [...baseLinks, { href: "/admin", label: "Admin" }];
      case 'Tipster':
        return [...baseLinks, { href: "/meus-canais", label: "Meus Canais" }];
      case 'Cliente':
        return [...baseLinks, { href: "/dashboard", label: "Dashboard" }];
      default:
        return baseLinks;
    }
  };

  const links = getVisibleLinks();

  // Get role color
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Master':
        return 'text-purple-600 bg-purple-50';
      case 'Admin':
        return 'text-red-600 bg-red-50';
      case 'Tipster':
        return 'text-blue-600 bg-blue-50';
      case 'Cliente':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

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
              </Link>
            ))}
          </div>

          {/* User Info */}
          <div className="flex items-center space-x-3">
            {loading ? (
              <div className="h-8 w-8 animate-pulse bg-gray-200 rounded-full" />
            ) : user && profile ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 hover:bg-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="flex flex-col items-end">
                        <span className="text-sm font-medium text-gray-900">{profile.name}</span>
                        <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", getRoleColor(profile.role))}>
                          {profile.role}
                        </span>
                      </div>
                      <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-gray-600" />
                      </div>
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{profile.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{profile.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="w-full flex items-center cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Configurações</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="cursor-pointer text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}