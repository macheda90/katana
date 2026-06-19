"use client"

import { useEffect, useState } from "react"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell, LineChart, Line,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Clock, Activity, Calendar, Newspaper, TrendingUp, CheckCircle2, Heart, MessageSquare, AlertCircle, Package } from "lucide-react"

const PIE_COLORS = ["#FF6B00", "#3b82f6", "#10b981", "#f59e0b", "#ef4444"]

export function AdminDashboard() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then(setData)
      .catch(() => {})
  }, [])

  if (!data) {
    return <div className="flex items-center justify-center h-96 text-slate-400">Memuat dashboard...</div>
  }

  const { stats, charts } = data

  const widgets = [
    { icon: Users, label: "Total Anggota", value: stats.totalMembers, color: "text-orange-600", bg: "bg-orange-50" },
    { icon: Clock, label: "Pending Approval", value: stats.pendingMembers, color: "text-amber-600", bg: "bg-amber-50" },
    { icon: Activity, label: "Misi SAR", value: stats.totalMissions, color: "text-emerald-600", bg: "bg-emerald-50" },
    { icon: Calendar, label: "Agenda Mendatang", value: stats.totalAgenda, color: "text-blue-600", bg: "bg-blue-50" },
    { icon: Newspaper, label: "Berita", value: stats.totalNews, color: "text-purple-600", bg: "bg-purple-50" },
    { icon: TrendingUp, label: "Donasi", value: stats.totalDonations, color: "text-pink-600", bg: "bg-pink-50" },
    { icon: CheckCircle2, label: "Misi Selesai", value: stats.missionsCompleted, color: "text-cyan-600", bg: "bg-cyan-50" },
    { icon: Heart, label: "Kegiatan Sosial", value: stats.totalSocial, color: "text-rose-600", bg: "bg-rose-50" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-1">Dashboard</h2>
        <p className="text-sm text-slate-500">Ringkasan operasional organisasi Katana Rescue</p>
      </div>

      {/* Widgets */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {widgets.map((w) => (
          <Card key={w.label} className="border-slate-200 shadow-sm">
            <CardContent className="p-5">
              <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${w.bg} mb-3`}>
                <w.icon className={`h-5 w-5 ${w.color}`} />
              </div>
              <div className="text-3xl font-extrabold text-slate-900 mb-0.5">{w.value}</div>
              <div className="text-xs text-slate-500">{w.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader><CardTitle className="text-slate-900 text-base flex items-center gap-2"><Users className="h-4 w-4 text-orange-500" />Pertumbuhan Anggota</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={charts.memberGrowth}>
                <defs><linearGradient id="c1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#FF6B00" stopOpacity={0.3} /><stop offset="95%" stopColor="#FF6B00" stopOpacity={0} /></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} allowDecimals={false} />
                <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, color: "#0f172a", fontSize: 12 }} />
                <Area type="monotone" dataKey="count" stroke="#FF6B00" strokeWidth={2} fill="url(#c1)" name="Anggota Baru" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader><CardTitle className="text-slate-900 text-base flex items-center gap-2"><Activity className="h-4 w-4 text-orange-500" />Kegiatan per Kategori</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={charts.activityByCategory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="category" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} allowDecimals={false} />
                <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, color: "#0f172a", fontSize: 12 }} />
                <Bar dataKey="count" fill="#FF6B00" radius={[6, 6, 0, 0]} name="Jumlah" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader><CardTitle className="text-slate-900 text-base flex items-center gap-2"><AlertCircle className="h-4 w-4 text-orange-500" />Misi SAR per Jenis</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={charts.missionByType} cx="50%" cy="50%" outerRadius={80} innerRadius={40} dataKey="count" nameKey="type" label={(e: any) => `${e.type}: ${e.count}`} labelLine={false} style={{ fontSize: 11, fill: "#475569" }}>
                  {charts.missionByType.map((_: any, i: number) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, color: "#0f172a", fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader><CardTitle className="text-slate-900 text-base flex items-center gap-2"><TrendingUp className="h-4 w-4 text-orange-500" />Donasi 6 Bulan</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={charts.donationByMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}jt`} />
                <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, color: "#0f172a", fontSize: 12 }} formatter={(v: number) => [`Rp ${v.toLocaleString("id-ID")}`, "Donasi"]} />
                <Line type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={2.5} dot={{ fill: "#10b981", r: 4 }} name="Donasi" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
