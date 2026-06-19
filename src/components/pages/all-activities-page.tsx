"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, MapPin, Loader2, Filter } from "lucide-react"
import { useView } from "@/lib/view-store"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { SectionHeading } from "@/components/site/section-heading"

const categoryColors: Record<string, string> = {
  RESCUE: "bg-red-100 text-red-700",
  SOSIAL: "bg-emerald-100 text-emerald-700",
  PELATIHAN: "bg-blue-100 text-blue-700",
  SIMULASI: "bg-amber-100 text-amber-700",
  BENCANA: "bg-orange-100 text-orange-700",
}

const categoryLabels: Record<string, string> = {
  RESCUE: "Rescue",
  SOSIAL: "Sosial",
  PELATIHAN: "Pelatihan",
  SIMULASI: "Simulasi",
  BENCANA: "Bencana",
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
}

export function AllActivitiesPage() {
  const { goHome } = useView()
  const [activities, setActivities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState("all")

  useEffect(() => {
    fetch(`/api/activities?limit=0${category !== "all" ? `&category=${category}` : ""}`)
      .then((r) => r.json())
      .then((data) => { setActivities(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [category])

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#0F172A] to-[#1e293b] py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative">
          <Button
            onClick={goHome}
            variant="outline"
            className="mb-6 border-white/30 text-white hover:bg-white/10 bg-white/5 backdrop-blur-sm"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />Kembali ke Beranda
          </Button>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 mb-4">
            <span className="text-xs font-semibold text-orange-300 uppercase tracking-wider">Semua Kegiatan</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">Aktivitas & Operasi SAR</h1>
          <p className="text-base text-slate-300 max-w-2xl">
            Dokumentasi lengkap kegiatan rescue, sosial, pelatihan, simulasi, dan penanggulangan bencana tim Katana Rescue.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Filter */}
          <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
            <p className="text-sm text-slate-600">
              {loading ? "Memuat..." : `Menampilkan ${activities.length} kegiatan`}
            </p>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-slate-400" />
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-48 bg-white border-slate-200">
                  <SelectValue placeholder="Filter Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kategori</SelectItem>
                  <SelectItem value="RESCUE">Rescue</SelectItem>
                  <SelectItem value="SOSIAL">Sosial</SelectItem>
                  <SelectItem value="PELATIHAN">Pelatihan</SelectItem>
                  <SelectItem value="SIMULASI">Simulasi</SelectItem>
                  <SelectItem value="BENCANA">Bencana</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="flex items-center justify-center h-64 text-slate-400">
              <Loader2 className="h-8 w-8 animate-spin mr-2" />Memuat kegiatan...
            </div>
          ) : activities.length === 0 ? (
            <div className="flex items-center justify-center h-64 text-slate-400">
              Tidak ada kegiatan ditemukan
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities.map((a) => (
                <article
                  key={a.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={a.image || "/images/activity-training.png"}
                      alt={a.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className={`${categoryColors[a.category]} border-0 font-semibold`}>
                        {categoryLabels[a.category] || a.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(a.activityDate)}
                      </span>
                      <span className="flex items-center gap-1 truncate">
                        <MapPin className="h-3.5 w-3.5" />
                        {a.location}
                      </span>
                    </div>
                    <h3 className="font-bold text-[#0F172A] mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                      {a.title}
                    </h3>
                    <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                      {a.description}
                    </p>
                    {a.division && (
                      <div className="mt-3 pt-3 border-t border-slate-100">
                        <span className="text-xs text-slate-400">Divisi: </span>
                        <span className="text-xs font-medium text-orange-600">{a.division.name}</span>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
