"use client"

import Image from "next/image"
import Link from "next/link"
import { MapPin, Calendar, ArrowRight } from "lucide-react"
import { SectionHeading } from "@/components/site/section-heading"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useView } from "@/lib/view-store"
import { formatDateId } from "@/lib/format"

const categoryColors: Record<string, string> = {
  RESCUE: "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400",
  SOSIAL: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
  PELATIHAN: "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
  SIMULASI: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
  BENCANA: "bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400",
}

const categoryLabels: Record<string, string> = {
  RESCUE: "Rescue",
  SOSIAL: "Sosial",
  PELATIHAN: "Pelatihan",
  SIMULASI: "Simulasi",
  BENCANA: "Bencana",
}

export function ActivitiesSection({ activities }: { activities: any[] }) {
  const { setView } = useView()
  return (
    <section id="kegiatan" className="py-20 bg-white dark:bg-[#0a0f1d]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-950/30 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
              <span className="text-xs font-semibold text-orange-600 uppercase tracking-wider">Kegiatan Terbaru</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#0F172A] dark:text-white mb-3">
              Kegiatan dan Aktivitas Anggota
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400">
              Dokumentasi kegiatan rescue, sosial, pelatihan, simulasi, dan penanggulangan bencana tim Katana Rescue.
            </p>
          </div>
          <Button
            onClick={() => setView('all-activities')}
            variant="outline"
            className="border-orange-500 text-orange-600 hover:bg-orange-50"
          >
            Semua Kegiatan <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.slice(0, 6).map((a) => (
            <Link
              key={a.id}
              href={`/activities/${a.slug}`}
              className="group block bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all duration-300"
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
                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDateId(a.activityDate)}
                  </span>
                  <span className="flex items-center gap-1 truncate">
                    <MapPin className="h-3.5 w-3.5" />
                    {a.location}
                  </span>
                </div>
                <h3 className="font-bold text-[#0F172A] dark:text-white mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                  {a.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {a.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </section>
  )
}
