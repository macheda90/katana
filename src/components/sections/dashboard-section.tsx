"use client"

import { useEffect, useState } from "react"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell, LineChart, Line,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Clock, Calendar, Newspaper, TrendingUp, Activity, AlertCircle, CheckCircle2, Heart } from "lucide-react"
import { SectionHeading } from "@/components/site/section-heading"

const PIE_COLORS = ["#FF6B00", "#3b82f6", "#10b981", "#f59e0b", "#ef4444"]

export function DashboardSection() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then(setData)
      .catch(() => {})
  }, [])

  if (!data) {
    return (
      <section className="py-20 bg-[#0F172A]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-24 rounded-2xl bg-slate-800 animate-pulse" />
            ))}
          </div>
          <div className="grid lg:grid-cols-2 gap-6 mt-6">
            <div className="h-72 rounded-2xl bg-slate-800 animate-pulse" />
            <div className="h-72 rounded-2xl bg-slate-800 animate-pulse" />
          </div>
        </div>
      </section>
    )
  }

  const { stats, charts } = data

  const widgets = [
    { icon: Users, label: "Total Anggota", value: stats.totalMembers, color: "text-orange-400", bg: "bg-orange-500/10" },
    { icon: Clock, label: "Pending Approval", value: stats.pendingMembers, color: "text-amber-400", bg: "bg-amber-500/10" },
    { icon: Activity, label: "Kegiatan Bulan Ini", value: stats.totalMissions, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { icon: Calendar, label: "Agenda Mendatang", value: stats.totalAgenda, color: "text-blue-400", bg: "bg-blue-500/10" },
    { icon: Newspaper, label: "Berita Terbaru", value: stats.totalNews, color: "text-purple-400", bg: "bg-purple-500/10" },
    { icon: TrendingUp, label: "Donasi Terverifikasi", value: stats.totalDonations, color: "text-pink-400", bg: "bg-pink-500/10" },
  ]

  return (
    <section id="dashboard" className="py-20 bg-[#0F172A] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
      <div className="container mx-auto px-4 relative">
        <SectionHeading
          eyebrow="Dashboard Admin"
          title="Pantau Operasional Organisasi"
          description="Dashboard real-time untuk admin memantau anggota, kegiatan, misi SAR, donasi, dan statistik organisasi."
          light
        />

        {/* Widgets */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {widgets.map((w) => (
            <div key={w.label} className="bg-slate-800/50 backdrop-blur rounded-2xl p-5 border border-slate-700/50">
              <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${w.bg} mb-3`}>
                <w.icon className={`h-5 w-5 ${w.color}`} />
              </div>
              <div className="text-3xl font-extrabold text-white mb-0.5">{w.value}</div>
              <div className="text-xs text-slate-400">{w.label}</div>
            </div>
          ))}
        </div>

        {/* Charts grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Member Growth */}
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2 text-base">
                <Users className="h-4 w-4 text-orange-400" />
                Pertumbuhan Anggota
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={charts.memberGrowth}>
                  <defs>
                    <linearGradient id="colorMember" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF6B00" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#FF6B00" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, color: "#fff" }}
                  />
                  <Area type="monotone" dataKey="count" stroke="#FF6B00" strokeWidth={2} fill="url(#colorMember)" name="Anggota Baru" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Activity by Category */}
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2 text-base">
                <Activity className="h-4 w-4 text-orange-400" />
                Kegiatan per Kategori
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={charts.activityByCategory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="category" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, color: "#fff" }}
                  />
                  <Bar dataKey="count" fill="#FF6B00" radius={[6, 6, 0, 0]} name="Jumlah" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Mission by Type */}
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2 text-base">
                <AlertCircle className="h-4 w-4 text-orange-400" />
                Misi SAR per Jenis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={charts.missionByType}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={40}
                    dataKey="count"
                    nameKey="type"
                    label={(entry: any) => `${entry.type}: ${entry.count}`}
                    labelLine={false}
                    style={{ fontSize: 11, fill: "#cbd5e1" }}
                  >
                    {charts.missionByType.map((_: any, i: number) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, color: "#fff" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Donations */}
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2 text-base">
                <TrendingUp className="h-4 w-4 text-orange-400" />
                Donasi 6 Bulan Terakhir
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={charts.donationByMonth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}jt`} />
                  <Tooltip
                    contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, color: "#fff" }}
                    formatter={(v: number) => [`Rp ${v.toLocaleString("id-ID")}`, "Donasi"]}
                  />
                  <Line type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={2.5} dot={{ fill: "#10b981", r: 4 }} name="Donasi" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Bottom info bar */}
        <div className="mt-8 grid sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-slate-700/50">
            <CheckCircle2 className="h-8 w-8 text-emerald-400 shrink-0" />
            <div>
              <div className="text-xl font-bold text-white">{stats.missionsCompleted} Misi</div>
              <div className="text-xs text-slate-400">Selesai dengan sukses</div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-slate-700/50">
            <Users className="h-8 w-8 text-orange-400 shrink-0" />
            <div>
              <div className="text-xl font-bold text-white">{stats.activeVolunteers} Relawan</div>
              <div className="text-xs text-slate-400">Aktif bertugas</div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-slate-700/50">
            <Heart className="h-8 w-8 text-pink-400 shrink-0" />
            <div>
              <div className="text-xl font-bold text-white">{stats.totalSocial} Kegiatan</div>
              <div className="text-xs text-slate-400">Sosial dilaksanakan</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
