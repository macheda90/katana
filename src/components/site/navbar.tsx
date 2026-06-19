"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
  Menu, Shield, ChevronDown, Phone, Mail, Facebook, Instagram, Youtube,
  AlertTriangle, LogIn, User, LogOut, LayoutDashboard, ShieldCheck,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-store"
import { LoginDialog } from "@/components/admin/login-dialog"

const navMenus = [
  {
    label: "Profil",
    href: "#about",
    children: [
      { label: "Tentang Kami", href: "#about" },
      { label: "Sejarah", href: "#about" },
      { label: "Visi & Misi", href: "#about" },
      { label: "Struktur Organisasi", href: "#struktur" },
      { label: "Legalitas", href: "#about" },
    ],
  },
  {
    label: "Kegiatan",
    href: "#kegiatan",
    children: [
      { label: "Rescue", href: "#kegiatan" },
      { label: "Sosial", href: "#kegiatan" },
      { label: "Pelatihan", href: "#kegiatan" },
      { label: "Simulasi", href: "#kegiatan" },
      { label: "Bencana", href: "#kegiatan" },
    ],
  },
  {
    label: "Berita",
    href: "#berita",
    children: [
      { label: "Organisasi", href: "#berita" },
      { label: "Bencana", href: "#berita" },
      { label: "Nasional", href: "#berita" },
      { label: "Daerah", href: "#berita" },
      { label: "Edukasi", href: "#berita" },
    ],
  },
  { label: "Agenda", href: "#agenda" },
  { label: "Divisi", href: "#divisi" },
  { label: "Edukasi", href: "#edukasi" },
  { label: "Kontak", href: "#kontak" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [loginOpen, setLoginOpen] = useState(false)
  const { user, checkAuth, logout, setShowAdmin } = useAuth()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    checkAuth()
    return () => window.removeEventListener("scroll", onScroll)
  }, [checkAuth])

  const handleLogout = async () => {
    await logout()
  }

  return (
    <>
      {/* Top bar */}
      <div className="hidden lg:block bg-[#0F172A] text-white text-xs">
        <div className="container mx-auto flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Phone className="h-3 w-3 text-orange-500" />
              +62 812-3456-7890
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="h-3 w-3 text-orange-500" />
              info@katanarescue.cikampek.id
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-slate-400">Ikuti Kami:</span>
            <Link href="#" className="hover:text-orange-500 transition-colors"><Facebook className="h-3.5 w-3.5" /></Link>
            <Link href="#" className="hover:text-orange-500 transition-colors"><Instagram className="h-3.5 w-3.5" /></Link>
            <Link href="#" className="hover:text-orange-500 transition-colors"><Youtube className="h-3.5 w-3.5" /></Link>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-md shadow-lg"
            : "bg-white dark:bg-[#0F172A]"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="#beranda" className="flex items-center gap-2.5 shrink-0">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 shadow-md">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-lg font-extrabold tracking-tight text-[#0F172A] dark:text-white">
                  KATANA<span className="text-orange-500">RESCUE</span>
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                  SAR Cikampek
                </span>
              </div>
            </Link>

            {/* Desktop menu */}
            <nav className="hidden xl:flex items-center gap-1">
              {navMenus.map((menu) => (
                <div
                  key={menu.label}
                  className="relative"
                  onMouseEnter={() => menu.children && setOpenDropdown(menu.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={menu.href}
                    className="flex items-center gap-0.5 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-orange-600 transition-colors rounded-md"
                  >
                    {menu.label}
                    {menu.children && <ChevronDown className="h-3.5 w-3.5" />}
                  </Link>
                  {menu.children && openDropdown === menu.label && (
                    <div className="absolute left-0 top-full pt-1 w-56 z-50">
                      <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl overflow-hidden">
                        {menu.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="block px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-slate-800 hover:text-orange-600 transition-colors border-b border-slate-100 dark:border-slate-800 last:border-0"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <Button
                asChild
                size="sm"
                className="hidden md:flex bg-orange-500 hover:bg-orange-600 text-white"
              >
                <Link href="#daftar">Gabung Anggota</Link>
              </Button>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="hidden md:flex border-red-500 text-red-600 hover:bg-red-50"
              >
                <Link href="#lapor">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  Lapor Bencana
                </Link>
              </Button>

              {/* Login / User Menu */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2 px-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white font-bold text-xs">
                        {user.name.charAt(0)}
                      </div>
                      <span className="hidden sm:inline text-sm font-medium text-[#0F172A] dark:text-white">{user.name.split(" ")[0]}</span>
                      <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-60">
                    <DropdownMenuLabel>
                      <div className="flex flex-col">
                        <span className="font-semibold">{user.name}</span>
                        <span className="text-xs text-slate-500 font-normal">{user.email}</span>
                        <Badge className="bg-orange-100 text-orange-700 border-0 text-[10px] mt-1 w-fit">
                          <ShieldCheck className="h-3 w-3 mr-1" />{user.role}
                        </Badge>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setShowAdmin(true)}>
                      <LayoutDashboard className="h-4 w-4 mr-2" />
                      Back Office
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                      <LogOut className="h-4 w-4 mr-2" />
                      Keluar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  className="border-[#0F172A] text-[#0F172A] dark:border-white dark:text-white hover:bg-[#0F172A] hover:text-white dark:hover:bg-white dark:hover:text-[#0F172A]"
                  onClick={() => setLoginOpen(true)}
                >
                  <LogIn className="h-4 w-4 mr-1" />
                  Login
                </Button>
              )}

              {/* Mobile menu */}
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="xl:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[360px] overflow-y-auto">
                  <div className="flex flex-col gap-1 mt-6">
                    <Link href="#beranda" onClick={() => setMobileOpen(false)} className="px-3 py-2.5 font-semibold text-[#0F172A] dark:text-white">
                      Beranda
                    </Link>
                    {navMenus.map((menu) => (
                      <div key={menu.label}>
                        <Link
                          href={menu.href}
                          onClick={() => setMobileOpen(false)}
                          className="block px-3 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-orange-600"
                        >
                          {menu.label}
                        </Link>
                        {menu.children && (
                          <div className="ml-3 border-l-2 border-orange-100 dark:border-slate-700">
                            {menu.children.map((child) => (
                              <Link
                                key={child.label}
                                href={child.href}
                                onClick={() => setMobileOpen(false)}
                                className="block px-3 py-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-orange-600"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                    <div className="mt-4 flex flex-col gap-2 px-3">
                      <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white">
                        <Link href="#daftar" onClick={() => setMobileOpen(false)}>Gabung Anggota</Link>
                      </Button>
                      <Button asChild variant="outline" className="border-red-500 text-red-600">
                        <Link href="#lapor" onClick={() => setMobileOpen(false)}>
                          <AlertTriangle className="h-4 w-4 mr-1" /> Lapor Bencana
                        </Link>
                      </Button>
                      {user ? (
                        <>
                          <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-100 dark:bg-slate-800 mt-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white font-bold text-xs">
                              {user.name.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-semibold truncate">{user.name}</div>
                              <div className="text-[10px] text-slate-500 truncate">{user.role}</div>
                            </div>
                          </div>
                          <Button onClick={() => { setMobileOpen(false); setShowAdmin(true) }} className="bg-[#0F172A] hover:bg-[#1e293b] text-white">
                            <LayoutDashboard className="h-4 w-4 mr-1" /> Back Office
                          </Button>
                          <Button onClick={handleLogout} variant="outline" className="border-red-500 text-red-600">
                            <LogOut className="h-4 w-4 mr-1" /> Keluar
                          </Button>
                        </>
                      ) : (
                        <Button onClick={() => { setMobileOpen(false); setLoginOpen(true) }} variant="outline" className="border-[#0F172A] text-[#0F172A] dark:border-white dark:text-white">
                          <LogIn className="h-4 w-4 mr-1" /> Login Back Office
                        </Button>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
    </>
  )
}
