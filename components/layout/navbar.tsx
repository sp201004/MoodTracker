"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface NavbarProps {
  userEmail?: string
}

export function Navbar({ userEmail }: NavbarProps) {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    // Clear the token cookie
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"
    router.push("/")
  }

  const getInitials = (email: string) => {
    return email.charAt(0).toUpperCase()
  }

  return (
    <nav className="border-b bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center overflow-hidden">
              <img
                src="/logo.png"
                alt="MoodTracker Logo"
                width={32}
                height={32}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  if (target.parentElement) {
                    target.parentElement.innerHTML = '<span class="text-primary-foreground font-bold text-sm">M</span>';
                  }
                }}
              />
            </div>
            <span className="text-xl font-bold text-primary">MoodTracker</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/dashboard" className="text-foreground hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link href="/entries/new" className="text-foreground hover:text-primary transition-colors">
              New Entry
            </Link>
            <Link href="/reports" className="text-foreground hover:text-primary transition-colors">
              Reports
            </Link>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <Button asChild className="hidden md:inline-flex">
              <Link href="/entries/new">+ New Entry</Link>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {userEmail ? getInitials(userEmail) : "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex flex-col space-y-1 p-2">
                  <p className="text-sm font-medium leading-none">{userEmail}</p>
                  <p className="text-xs leading-none text-muted-foreground">Wellness Journey</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="md:hidden">
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="md:hidden">
                  <Link href="/entries/new">New Entry</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="md:hidden">
                  <Link href="/reports">Reports</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="md:hidden" />
                <DropdownMenuItem
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="text-destructive focus:text-destructive"
                >
                  {isLoggingOut ? "Signing out..." : "Sign out"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}
