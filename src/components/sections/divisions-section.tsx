import {
  Waves, Mountain, Ambulance, Package, Radio, Plane, ShieldAlert, Camera,
  type LucideIcon,
} from "lucide-react"
import { SectionHeading } from "@/components/site/section-heading"

const iconMap: Record<string, LucideIcon> = {
  Waves, Mountain, Ambulance, Package, Radio, Plane, ShieldAlert, Camera,
}

const colorMap: Record<string, string> = {
  cyan: "from-cyan-500 to-cyan-600",
  amber: "from-amber-500 to-amber-600",
  red: "from-red-500 to-red-600",
  orange: "from-orange-500 to-orange-600",
  blue: "from-blue-500 to-blue-600",
  purple: "from-purple-500 to-purple-600",
  green: "from-emerald-500 to-emerald-600",
  pink: "from-pink-500 to-pink-600",
}

export function DivisionsSection({ divisions }: { divisions: any[] }) {
  return (
    <section id="divisi" className="py-20 bg-slate-50 dark:bg-[#0d1424]">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="Divisi"
          title="Divisi Spesialisasi Tim SAR"
          description="Setiap divisi memiliki kompetensi dan peran khusus dalam operasi pencarian, pertolongan, dan penanggulangan bencana."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {divisions.map((div) => {
            const Icon = iconMap[div.icon] || ShieldAlert
            const gradient = colorMap[div.color] || "from-orange-500 to-orange-600"
            return (
              <div
                key={div.id}
                className="group bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#0F172A] dark:text-white mb-1">{div.name}</h3>
                <p className="text-xs text-orange-600 font-semibold mb-3">Koordinator: {div.coordinator}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4 line-clamp-3">
                  {div.description}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-xs text-slate-400">Anggota Aktif</span>
                  <span className="text-lg font-extrabold text-orange-600">{div._count?.members ?? 0}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
