import { Building2, Shield, Heart, Plane, Landmark, Users, Siren, Flame } from "lucide-react"
import { SectionHeading } from "@/components/site/section-heading"

const partnerIcons: Record<string, typeof Building2> = {
  BPBD: Shield,
  PMI: Heart,
  BASARNAS: Plane,
  TNI: Shield,
  POLRI: Siren,
  PEMERINTAH: Landmark,
}

export function PartnersSection({ partners }: { partners: any[] }) {
  return (
    <section className="py-16 bg-white dark:bg-[#0a0f1d] border-y border-slate-100 dark:border-slate-800">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="Mitra Kerja"
          title="Bekerja Sama dengan Instansi Terpercaya"
          description="Kemitraan strategis dengan instansi pemerintah dan organisasi SAR dalam sistem penanggulangan bencana terpadu."
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {partners.map((p) => {
            const Icon = partnerIcons[p.type] || Building2
            return (
              <div
                key={p.id}
                className="group flex flex-col items-center justify-center gap-2 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-orange-300 dark:hover:border-orange-700 hover:bg-orange-50 dark:hover:bg-orange-950/20 transition-all"
              >
                <Icon className="h-8 w-8 text-slate-400 group-hover:text-orange-500 transition-colors" />
                <span className="text-[11px] font-semibold text-center text-slate-600 dark:text-slate-400 group-hover:text-orange-600 transition-colors leading-tight">
                  {p.name}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
