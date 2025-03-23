"use client"

import { useState, type ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Shield, Home, CreditCard, Send, Bell, LogOut, Menu, X, User, BarChart3 } from "lucide-react"

interface DashboardLayoutProps {
  children: ReactNode
  isAdmin?: boolean
}

export function DashboardLayout({ children, isAdmin = false }: DashboardLayoutProps) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const userNavItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/transfers", label: "Transfers", icon: Send },
    { href: "/cards", label: "Cards", icon: CreditCard },
    { href: "/notifications", label: "Notifications", icon: Bell },
  ]

  const adminNavItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: BarChart3 },
    { href: "/admin/users", label: "Users", icon: User },
    { href: "/admin/cards", label: "Card Requests", icon: CreditCard },
    { href: "/admin/transactions", label: "Transactions", icon: Send },
  ]

  const navItems = isAdmin ? adminNavItems : userNavItems

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
            <Link href={isAdmin ? "/admin/dashboard" : "/dashboard"} className="flex items-center gap-2 font-bold">
              <Shield className="h-6 w-6" />
              <span>ITCash Bank</span>
              {isAdmin && (
                <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-md">Admin</span>
              )}
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign out</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        {/* Sidebar for mobile */}
        <div
          className={`fixed inset-0 z-20 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-200 ease-in-out md:hidden`}
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-3/4 max-w-xs bg-background p-6 shadow-lg">
            <div className="flex items-center justify-between mb-8">
              <Link href={isAdmin ? "/admin/dashboard" : "/dashboard"} className="flex items-center gap-2 font-bold">
                <Shield className="h-6 w-6" />
                <span>ITCash Bank</span>
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)}>
                <X className="h-6 w-6" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button variant={pathname === item.href ? "secondary" : "ghost"} className="w-full justify-start">
                    <item.icon className="mr-2 h-5 w-5" />
                    {item.label}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Sidebar for desktop */}
        <div className="hidden w-64 flex-shrink-0 border-r md:block">
          <div className="flex h-full flex-col gap-2 p-4">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button variant={pathname === item.href ? "secondary" : "ghost"} className="w-full justify-start">
                    <item.icon className="mr-2 h-5 w-5" />
                    {item.label}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}

