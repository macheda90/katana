"use client"

import Image from "next/image"
import Link from "next/link"
import { Calendar, User, ArrowRight, Eye } from "lucide-react"
import { SectionHeading } from "@/components/site/section-heading"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useView } from "@/lib/view-store"
import { formatDateId } from "@/lib/format"

const categoryColors: Record<string, string> = {
  ORGANISASI: "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
  BENCANA: "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400",
  NASIONAL: "bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400",
  DAERAH: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
  EDUKASI: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
}

export function NewsSection({ news }: { news: any[] }) {
  const { setView } = useView()
  if (!news || news.length === 0) return null
  const [featured, ...rest] = news

  return (
    <section id="berita" className="py-20 bg-slate-50 dark:bg-[#0d1424]">
      {/* Prevent Next.js next/image runtime error when external thumbnail URL is missing/unconfigured */}
      {/* next.config.ts adds vercel blob remotePatterns; this is extra safety fallback. */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-950/30 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
              <span className="text-xs font-semibold text-orange-600 uppercase tracking-wider">Berita Terbaru</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#0F172A] dark:text-white mb-3">
              Informasi & Kabar Terkini
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400">
              Berita organisasi, bencana, edukasi, dan informasi terbaru seputar aktivitas Katana Rescue.
            </p>
          </div>
          <Button
            onClick={() => setView('all-news')}
            variant="outline"
            className="border-orange-500 text-orange-600 hover:bg-orange-50"
          >
            Semua Berita <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Featured */}
          <Link href="#berita" className="group relative rounded-2xl overflow-hidden shadow-lg block min-h-[400px]">
            <Image
              src={featured.thumbnail || "/images/hero-rescue.png"}
              alt={featured.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 1024px) 100vw, 50vw"
              onError={(e) => {
                const img = e.currentTarget
                if (img) img.src = '/images/hero-rescue.png'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <Badge className={`${categoryColors[featured.category]} border-0 mb-3`}>
                {featured.category}
              </Badge>
              <h3 className="text-2xl font-bold text-white mb-2 line-clamp-2 group-hover:text-orange-400 transition-colors">
                {featured.title}
              </h3>
              <p className="text-sm text-slate-300 line-clamp-2 mb-3">{featured.excerpt}</p>
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" />{featured.author}</span>
                <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{formatDateId(featured.publishedAt, "long")}</span>
                <span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5" />{featured.views}</span>
              </div>
            </div>
          </Link>

          {/* List */}
          <div className="grid gap-4">
            {rest.slice(0, 4).map((n) => (
              <Link
                key={n.id}
                href="#berita"
                className="group flex gap-4 bg-white dark:bg-slate-900 rounded-xl p-3 border border-slate-100 dark:border-slate-800 hover:shadow-md transition-all"
              >
                <div className="relative w-28 h-24 sm:w-36 sm:h-28 shrink-0 rounded-lg overflow-hidden">
                  <Image
                    src={n.thumbnail || "/images/activity-training.png"}
                    alt={n.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="150px"
                    onError={(e) => {
                      const img = e.currentTarget
                      if (img) img.src = '/images/activity-training.png'
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0 py-1">
                  <Badge className={`${categoryColors[n.category]} border-0 text-[10px] mb-1.5`}>
                    {n.category}
                  </Badge>
                  <h3 className="font-bold text-[#0F172A] dark:text-white text-sm line-clamp-2 group-hover:text-orange-600 transition-colors mb-1">
                    {n.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-1.5">{n.excerpt}</p>
                  <div className="flex items-center gap-3 text-[10px] text-slate-400">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{formatDateId(n.publishedAt, "long")}</span>
                    <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{n.views}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
