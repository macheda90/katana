"use client"

import { Crown, User, FileText, DollarSign, ArrowRight } from "lucide-react"
import { SectionHeading } from "@/components/site/section-heading"
import { Button } from "@/components/ui/button"
import { useView } from "@/lib/view-store"

const pengurus = [
  { name: "Andi Pratama", role: "Ketua Umum", icon: Crown, color: "from-orange-500 to-orange-600", desc: "Memimpin dan mengarahkan seluruh program organisasi" },
  { name: "Rudi Hartono", role: "Wakil Ketua", icon: User, color: "from-blue-600 to-blue-700", desc: "Mendampingi ketua dan mengkoordinasi divisi operasional" },
  { name: "Dedi Kurniawan", role: "Sekretaris", icon: FileText, color: "from-emerald-500 to-emerald-600", desc: "Mengelola administrasi dan dokumentasi organisasi" },
  { name: "Siti Rahmawati", role: "Bendahara", icon: DollarSign, color: "from-amber-500 to-amber-600", desc: "Mengelola keuangan dan transparansi dana organisasi" },
]

export function StrukturSection() {
  const { setView } = useView()
  return (
    <section id="struktur" className="py-20 bg-white dark:bg-[#0a0f1d]">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="Struktur Organisasi"
          title="Kepengurusan Katana Rescue"
          description="Susunan pengurus harian yang memimpin dan mengelola operasional organisasi Katana Rescue Cikampek."
        />

        {/* Pengurus Utama */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {pengurus.map((p) => (
            <div
              key={p.name}
              className="group relative bg-white dark:bg-slate-900 rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all duration-300"
            >
              <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${p.color} mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                <p.icon className="h-8 w-8 text-white" />
              </div>
              <div className="inline-block px-3 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2">
                {p.role}
              </div>
              <h3 className="font-bold text-[#0F172A] dark:text-white mb-1">{p.name}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Koordinator Divisi */}
        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 md:p-8 border border-slate-100 dark:border-slate-800">
          <h3 className="text-xl font-bold text-[#0F172A] dark:text-white mb-6 text-center">Koordinator Divisi</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {[
              { name: "Andi Pratama", div: "Water Rescue" },
              { name: "Rudi Hartono", div: "Vertical Rescue" },
              { name: "Dedi Kurniawan", div: "Evakuasi Medis" },
              { name: "Siti Rahmawati", div: "Logistik" },
              { name: "Bambang Sutrisno", div: "Komunikasi & Radio" },
              { name: "Yoga Pratama", div: "Drone SAR" },
              { name: "Nur Hasanah", div: "Kesiapsiagaan Bencana" },
              { name: "Maya Sari", div: "Humas & Dokumentasi" },
            ].map((k, i) => (
              <div key={i} className="flex items-center gap-3 bg-white dark:bg-slate-900 rounded-xl p-3 border border-slate-100 dark:border-slate-800">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white font-bold text-sm shrink-0">
                  {k.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-sm text-[#0F172A] dark:text-white truncate">{k.name}</div>
                  <div className="text-xs text-slate-500 truncate">{k.div}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Selengkapnya Button */}
          <div className="text-center pt-4 border-t border-slate-200 dark:border-slate-700">
            <Button
              onClick={() => setView('all-struktur')}
              variant="outline"
              className="border-orange-500 text-orange-600 hover:bg-orange-50"
            >
              Selengkapnya <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
