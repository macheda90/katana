"use client"

import { useEffect, useState, useMemo } from "react"
import { useAuth } from "@/lib/auth-store"
import { LoginDialog } from "@/components/admin/login-dialog"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { DataManager } from "@/components/admin/admin-data-manager"
import { AdminSettings } from "@/components/admin/admin-settings"
import { adminSections, canAccessSection, SETTINGS_ROLES } from "@/lib/admin-config"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Shield, LayoutDashboard, Users, Newspaper, Activity, Calendar,
  Crosshair, Package, Heart, MessageSquare, AlertTriangle, CloudAlert,
  Star, Building2, Layers, LogOut, Menu, X, ChevronRight, ArrowLeft, Settings,
} from "lucide-react"
import { cn } from "@/lib/utils"

const allNavItems = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard, roles: ['SUPER_ADMIN', 'ADMIN', 'PENGURUS', 'KOORDINATOR_DIVISI'] },
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
  { key: "settings", label: "Pengaturan", icon: Settings, roles: ['SUPER_ADMIN', 'ADMIN'] },
]

export function AdminPortal() {
  const { user, showAdmin, setShowAdmin, checkAuth, logout } = useAuth()
  const [activeSection, setActiveSection] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [checked, setChecked] = useState(false)
  const [pendingCounts, setPendingCounts] = useState({ members: 0, donations: 0, contacts: 0, incidents: 0 })

  useEffect(() => {
    checkAuth().finally(() => setChecked(true))
  }, [checkAuth])

  // Fetch pending counts for badges
  useEffect(() => {
    if (!user || !showAdmin) return
    const fetchCounts = async () => {
      try {
        const [members, donations, contacts, incidents] = await Promise.all([
          fetch('/api/admin/members?status=PENDING').then(r => r.ok ? r.json() : []),
          fetch('/api/admin/donations?status=PENDING').then(r => r.ok ? r.json() : []),
          fetch('/api/admin/contacts?status=BARU').then(r => r.ok ? r.json() : []),
          fetch('/api/admin/incidents?status=BARU').then(r => r.ok ? r.json() : []),
        ])
        setPendingCounts({
          members: members.length,
          donations: donations.length,
          contacts: contacts.length,
          incidents: incidents.length,
        })
      } catch {}
    }
    fetchCounts()
    const interval = setInterval(fetchCounts, 30000)
    return () => clearInterval(interval)
  }, [user, showAdmin, activeSection])

  const totalPending = pendingCounts.members + pendingCounts.donations + pendingCounts.contacts + pendingCounts.incidents

  // Filter nav items based on role
  const navItems = useMemo(() => {
    if (!user) return []
    return allNavItems.filter((item) => {
      if (item.roles) return item.roles.includes(user.role)
      const section = adminSections[item.key]
      return section ? canAccessSection(section, user.role) : false
    })
  }, [user])

  // Derive a safe active section based on role (no setState in effect)
  const safeActiveSection = useMemo(() => {
    if (!user) return "dashboard"
    if (activeSection === "dashboard") return "dashboard"
    if (activeSection === "settings") {
      return SETTINGS_ROLES.includes(user.role) ? "settings" : "dashboard"
    }
    const section = adminSections[activeSection]
    if (section && !canAccessSection(section, user.role)) return "dashboard"
    return activeSection
  }, [user, activeSection])

  if (!checked) return null

  if (!user || !showAdmin) return null

  const effectiveSection = safeActiveSection

  const handleExit = () => {
    setShowAdmin(false)
    setSidebarOpen(false)
  }

  const handleLogout = async () => {
    await logout()
    setActiveSection("dashboard")
    setSidebarOpen(false)
  }

  const currentNav = navItems.find((n) => n.key === effectiveSection)
  const currentSection = effectiveSection !== "dashboard" && effectiveSection !== "settings" ? adminSections[effectiveSection] : null

  return (
    <div className="fixed inset-0 z-[100] bg-[#0F172A] flex">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0a0f1d] border-r border-slate-800 flex flex-col transition-transform duration-300",
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
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

        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => { setActiveSection(item.key); setSidebarOpen(false) }}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                effectiveSection === item.key
                  ? "bg-orange-500 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span className="flex-1 text-left">{item.label}</span>
              {pendingCounts[item.key as keyof typeof pendingCounts] > 0 && (
                <Badge className="bg-red-500 text-white text-[10px] px-1.5 py-0 min-w-[20px] justify-center">
                  {pendingCounts[item.key as keyof typeof pendingCounts]}
                </Badge>
              )}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-slate-800">
          <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-800/50 mb-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white font-bold text-sm">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-white truncate">{user.name}</div>
              <Badge className="bg-orange-500/20 text-orange-400 border-0 text-[10px] mt-0.5">{user.role}</Badge>
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

      <div className="flex-1 flex flex-col overflow-hidden">
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
            {totalPending > 0 && (
              <button
                onClick={() => setActiveSection("members")}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-semibold hover:bg-red-500/30 transition-colors"
                title={`${pendingCounts.members} anggota, ${pendingCounts.donations} donasi, ${pendingCounts.contacts} pesan, ${pendingCounts.incidents} laporan menunggu`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" />
                {totalPending} Perlu Tindakan
              </button>
            )}
            <Badge className="bg-emerald-500/20 text-emerald-400 border-0">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse" />
              Online
            </Badge>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-[#0F172A]">
          {effectiveSection === "dashboard" ? (
            <AdminDashboard />
          ) : effectiveSection === "settings" ? (
            <AdminSettings />
          ) : currentSection ? (
            <DataManager section={currentSection} sectionKey={effectiveSection} userRole={user.role} />
          ) : null}
        </main>
      </div>
    </div>
  )
}
