"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/lib/auth-store"
import { LoginDialog } from "@/components/admin/login-dialog"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { DataManager } from "@/components/admin/admin-data-manager"
import { adminSections } from "@/lib/admin-config"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Shield, LayoutDashboard, Users, Newspaper, Activity, Calendar,
  Crosshair, Package, Heart, MessageSquare, AlertTriangle, CloudAlert,
  Star, Building2, Layers, LogOut, Menu, X, ChevronRight, ArrowLeft,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "members", label: "Anggota", icon: Users },
  { key: "news", label: "Berita", icon: Newspaper },
  { key: "activities", label: "Kegiatan", icon: Activity },
  { key: "agenda", label: "Agenda", icon: Calendar },
  { key: "missions", label: "Misi SAR", icon: Crosshair },
  { key: "inventory", label: "Inventaris", icon: Package },
  { key: "donations", label: "Donasi", icon: Heart },
  { key: "contacts", label: "Pesan Kontak", icon: MessageSquare },
  { key: "incidents", label: "Laporan", icon: AlertTriangle },
  { key: "disasters", label: "Data Bencana", icon: CloudAlert },
  { key: "testimonials", label: "Testimoni", icon: Star },
  { key: "partners", label: "Mitra", icon: Building2 },
  { key: "divisions", label: "Divisi", icon: Layers },
]

export function AdminPortal() {
  const { user, showAdmin, setShowAdmin, checkAuth, logout } = useAuth()
  const [activeSection, setActiveSection] = useState("dashboard")
  const [loginOpen, setLoginOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    checkAuth().finally(() => setChecked(true))
  }, [checkAuth])

  if (!checked) return null

  // Don't render anything if not logged in or admin not requested
  if (!user || !showAdmin) return null

  const handleExit = () => {
    setShowAdmin(false)
    setSidebarOpen(false)
  }

  const handleLogout = async () => {
    await logout()
    setActiveSection("dashboard")
    setSidebarOpen(false)
  }

  const currentNav = navItems.find((n) => n.key === activeSection)
  const currentSection = activeSection !== "dashboard" ? adminSections[activeSection] : null

  return (
    <div className="fixed inset-0 z-[100] bg-[#0F172A] flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0a0f1d] border-r border-slate-800 flex flex-col transition-transform duration-300",
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-orange-600">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div className="leading-none">
              <div className="text-sm font-extrabold text-white">KATANA<span className="text-orange-500">RESCUE</span></div>
              <div className="text-[10px] text-slate-500">Back Office</div>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="lg:hidden text-slate-400" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => { setActiveSection(item.key); setSidebarOpen(false) }}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                activeSection === item.key
                  ? "bg-orange-500 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span className="flex-1 text-left">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* User */}
        <div className="p-3 border-t border-slate-800">
          <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-800/50 mb-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white font-bold text-sm">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-white truncate">{user.name}</div>
              <div className="text-xs text-slate-500 truncate">{user.role}</div>
            </div>
          </div>
          <Button onClick={handleExit} variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 mb-2">
            <ArrowLeft className="h-4 w-4 mr-2" />Kembali ke Situs
          </Button>
          <Button onClick={handleLogout} variant="outline" className="w-full border-red-900 text-red-400 hover:bg-red-950/40">
            <LogOut className="h-4 w-4 mr-2" />Keluar
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between gap-3 px-4 lg:px-6 py-3 border-b border-slate-800 bg-[#0a0f1d]">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="lg:hidden text-slate-400" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-slate-500 hidden sm:inline">Admin</span>
              <ChevronRight className="hidden sm:inline h-3 w-3 text-slate-600" />
              <span className="font-semibold text-white">{currentNav?.label}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-emerald-500/20 text-emerald-400 border-0">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse" />
              Online
            </Badge>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-[#0F172A]">
          {activeSection === "dashboard" ? (
            <AdminDashboard />
          ) : currentSection ? (
            <DataManager section={currentSection} sectionKey={activeSection} />
          ) : null}
        </main>
      </div>
    </div>
  )
}
