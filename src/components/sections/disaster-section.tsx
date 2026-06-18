import { db } from "@/lib/db"
import { Droplets, Flame, Wind, Mountain, TrendingDown, MapPin, Calendar } from "lucide-react"
import { SectionHeading } from "@/components/site/section-heading"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const disasterConfig: Record<string, { icon: typeof Droplets; label: string; color: string; bg: string }> = {
  BANJIR: { icon: Droplets, label: "Banjir", color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-950/40" },
  LONGSOR: { icon: Mountain, label: "Longsor", color: "text-amber-600", bg: "bg-amber-100 dark:bg-amber-950/40" },
  ANGIN_KENCANG: { icon: Wind, label: "Angin Kencang", color: "text-cyan-600", bg: "bg-cyan-100 dark:bg-cyan-950/40" },
  KEBAKARAN: { icon: Flame, label: "Kebakaran", color: "text-red-600", bg: "bg-red-100 dark:bg-red-950/40" },
}

const severityConfig: Record<string, string> = {
  RINGAN: "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400",
  SEDANG: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
  BERAT: "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400",
}

export async function DisasterSection() {
  const disasters = await db.disasterData.findMany({
    orderBy: { date: "desc" },
    take: 8,
  })

  // Count by type
  const allDisasters = await db.disasterData.findMany()
  const typeCounts: Record<string, number> = {}
  for (const d of allDisasters) {
    typeCounts[d.type] = (typeCounts[d.type] || 0) + 1
  }
  const totalAffected = allDisasters.reduce((s, d) => s + d.affected, 0)
  const activeCount = allDisasters.filter((d) => d.status === "AKTIF" || d.status === "TERKENDALI").length

  return (
    <section id="pusat-data" className="py-20 bg-slate-50 dark:bg-[#0d1424]">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="Pusat Data Bencana"
          title="Data & Statistik Bencana Wilayah"
          description="Pemantauan dan dokumentasi kejadian bencana di wilayah Kecamatan Cikampek dan sekitarnya."
        />

        {/* Summary stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {Object.entries(disasterConfig).map(([type, cfg]) => {
            const count = typeCounts[type] || 0
            return (
              <Card key={type} className="border-0 shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${cfg.bg}`}>
                      <cfg.icon className={`h-5 w-5 ${cfg.color}`} />
                    </div>
                    <span className="text-3xl font-extrabold text-[#0F172A] dark:text-white">{count}</span>
                  </div>
                  <div className="text-sm font-semibold text-slate-600 dark:text-slate-300">{cfg.label}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Impact stats */}
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-5 text-white">
            <TrendingDown className="h-8 w-8 mb-2" />
            <div className="text-3xl font-extrabold">{totalAffected}</div>
            <div className="text-sm text-red-100">Total Jiwa Terdampak</div>
          </div>
          <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-5 text-white">
            <MapPin className="h-8 w-8 mb-2" />
            <div className="text-3xl font-extrabold">{activeCount}</div>
            <div className="text-sm text-amber-100">Titik Bencana Aktif</div>
          </div>
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-5 text-white">
            <Calendar className="h-8 w-8 mb-2" />
            <div className="text-3xl font-extrabold">{allDisasters.length}</div>
            <div className="text-sm text-emerald-100">Total Kejadian Tercatat</div>
          </div>
        </div>

        {/* Recent disasters list */}
        <Card className="border-0 shadow-md">
          <CardContent className="p-0">
            <div className="p-5 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-[#0F172A] dark:text-white">Riwayat Kejadian Bencana Terbaru</h3>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {disasters.map((d) => {
                const cfg = disasterConfig[d.type] || disasterConfig.LAINNYA
                return (
                  <div key={d.id} className="flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${cfg.bg} shrink-0`}>
                      <cfg.icon className={`h-5 w-5 ${cfg.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-semibold text-sm text-[#0F172A] dark:text-white">{cfg.label}</span>
                        <Badge className={`${severityConfig[d.severity]} border-0 text-[10px]`}>{d.severity}</Badge>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{d.location}</span>
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(d.date).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</span>
                        <span>{d.affected} terdampak</span>
                      </div>
                    </div>
                    <Badge variant="outline" className={
                      d.status === "AKTIF" ? "border-red-300 text-red-600" :
                      d.status === "TERKENDALI" ? "border-amber-300 text-amber-600" :
                      "border-emerald-300 text-emerald-600"
                    }>
                      {d.status}
                    </Badge>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
