import Link from "next/link"
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react"
import { SectionHeading } from "@/components/site/section-heading"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatTimeId } from "@/lib/format"

const categoryConfig: Record<string, { label: string; color: string }> = {
  PELATIHAN: { label: "Pelatihan SAR", color: "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400" },
  SIMULASI: { label: "Simulasi Bencana", color: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400" },
  BAKTI_SOSIAL: { label: "Bakti Sosial", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400" },
  RAPAT: { label: "Rapat Organisasi", color: "bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400" },
}

export function AgendaSection({ agenda }: { agenda: any[] }) {
  return (
    <section id="agenda" className="py-20 bg-white dark:bg-[#0a0f1d]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-950/30 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
              <span className="text-xs font-semibold text-orange-600 uppercase tracking-wider">Agenda Mendatang</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#0F172A] dark:text-white mb-3">
              Jadwal Kegiatan & Acara
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400">
              Pelatihan SAR, simulasi bencana, bakti sosial, dan rapat organisasi yang akan datang.
            </p>
          </div>
          <Button asChild variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50">
            <Link href="#agenda">
              Kalender Lengkap <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {agenda.slice(0, 6).map((a) => {
            const cat = categoryConfig[a.category] || { label: a.category, color: "bg-slate-100 text-slate-700" }
            const d = new Date(a.startDate)
            const month = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"][d.getUTCMonth()]
            return (
              <div
                key={a.id}
                className="group flex gap-4 bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 hover:shadow-lg hover:border-orange-200 dark:hover:border-orange-800 transition-all"
              >
                {/* Date block */}
                <div className="shrink-0 w-16 text-center">
                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-t-xl py-1.5 px-2">
                    <div className="text-[10px] font-bold uppercase">{month}</div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-b-xl py-2 border-x border-b border-slate-100 dark:border-slate-700">
                    <div className="text-2xl font-extrabold text-[#0F172A] dark:text-white leading-none">{d.getUTCDate()}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{d.getUTCFullYear()}</div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <Badge className={`${cat.color} border-0 text-[10px] mb-2`}>{cat.label}</Badge>
                  <h3 className="font-bold text-[#0F172A] dark:text-white text-sm mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                    {a.title}
                  </h3>
                  <div className="space-y-1 text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3 w-3" />
                      {formatTimeId(a.startDate)} WIB
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate">{a.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
