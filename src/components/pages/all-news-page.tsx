"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, User, Eye, Loader2, Filter, Newspaper } from "lucide-react"
import { useView } from "@/lib/view-store"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import { formatDateId } from "@/lib/format"

const categoryColors: Record<string, string> = {
  ORGANISASI: "bg-blue-100 text-blue-700",
  BENCANA: "bg-red-100 text-red-700",
  NASIONAL: "bg-purple-100 text-purple-700",
  DAERAH: "bg-emerald-100 text-emerald-700",
  EDUKASI: "bg-amber-100 text-amber-700",
}

export function AllNewsPage() {
  const { goHome } = useView()
  const [news, setNews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState("all")
  const [selected, setSelected] = useState<any>(null)

  useEffect(() => {
    fetch(`/api/news?limit=0${category !== "all" ? `&category=${category}` : ""}`)
      .then((r) => r.json())
      .then((data) => { setNews(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [category])

  const [featured, ...rest] = news

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
            <Newspaper className="h-3.5 w-3.5 text-orange-300" />
            <span className="text-xs font-semibold text-orange-300 uppercase tracking-wider">Semua Berita</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">Informasi & Kabar Terkini</h1>
          <p className="text-base text-slate-300 max-w-2xl">
            Berita organisasi, bencana, edukasi, dan informasi terbaru seputar aktivitas Katana Rescue.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Filter */}
          <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
            <p className="text-sm text-slate-600">
              {loading ? "Memuat..." : `Menampilkan ${news.length} berita`}
            </p>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-slate-400" />
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-48 bg-white border-slate-200">
                  <SelectValue placeholder="Filter Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kategori</SelectItem>
                  <SelectItem value="ORGANISASI">Organisasi</SelectItem>
                  <SelectItem value="BENCANA">Bencana</SelectItem>
                  <SelectItem value="NASIONAL">Nasional</SelectItem>
                  <SelectItem value="DAERAH">Daerah</SelectItem>
                  <SelectItem value="EDUKASI">Edukasi</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64 text-slate-400">
              <Loader2 className="h-8 w-8 animate-spin mr-2" />Memuat berita...
            </div>
          ) : news.length === 0 ? (
            <div className="flex items-center justify-center h-64 text-slate-400">
              Tidak ada berita ditemukan
            </div>
          ) : (
            <>
              {/* Featured */}
              {featured && (
                <div
                  onClick={() => setSelected(featured)}
                  className="group relative rounded-2xl overflow-hidden shadow-lg mb-8 cursor-pointer block min-h-[400px]"
                >
                  <Image
                    src={featured.thumbnail || "/images/hero-rescue.png"}
                    alt={featured.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 100vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <Badge className={`${categoryColors[featured.category]} border-0 mb-3`}>
                      {featured.category}
                    </Badge>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 line-clamp-2 group-hover:text-orange-400 transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-sm text-slate-300 line-clamp-2 mb-4 max-w-3xl">{featured.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" />{featured.author}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{formatDateId(featured.publishedAt, "long")}</span>
                      <span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5" />{featured.views} views</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((n) => (
                  <article
                    key={n.id}
                    onClick={() => setSelected(n)}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-all cursor-pointer"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={n.thumbnail || "/images/activity-training.png"}
                        alt={n.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className={`${categoryColors[n.category]} border-0`}>
                          {n.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-[#0F172A] mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                        {n.title}
                      </h3>
                      <p className="text-sm text-slate-500 line-clamp-2 mb-3">{n.excerpt}</p>
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{formatDateId(n.publishedAt, "long")}</span>
                        <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{n.views}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* News Detail Dialog */}
      {selected && (
        <Dialog open onOpenChange={() => setSelected(null)}>
          <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center gap-2 mb-2">
                <Badge className={`${categoryColors[selected.category]} border-0`}>{selected.category}</Badge>
                <span className="text-xs text-slate-500 flex items-center gap-1"><Calendar className="h-3 w-3" />{formatDateId(selected.publishedAt, "long")}</span>
              </div>
              <DialogTitle className="text-xl text-[#0F172A]">{selected.title}</DialogTitle>
            </DialogHeader>
            {selected.thumbnail && (
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-4">
                <Image src={selected.thumbnail} alt={selected.title} fill className="object-cover" sizes="100vw" />
              </div>
            )}
            <p className="text-sm text-slate-500 mb-3 flex items-center gap-1"><User className="h-3.5 w-3.5" />{selected.author}</p>
            <div className="prose prose-sm max-w-none">
              <p className="text-slate-700 leading-relaxed whitespace-pre-line">{selected.content || selected.excerpt}</p>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
