import Link from "next/link"
import { HeartPulse, ShieldAlert, Droplets, Flame, Compass, ArrowRight } from "lucide-react"
import { SectionHeading } from "@/components/site/section-heading"
import { Card, CardContent } from "@/components/ui/card"

const materials = [
  {
    icon: HeartPulse,
    title: "Pertolongan Pertama",
    desc: "Pelajari langkah-langkah pertolongan pertama pada kecelakaan (P3K) dasar yang dapat menyelamatkan nyawa.",
    color: "from-red-500 to-red-600",
    items: ["CPR & Bantuan Hidup", "Penanganan Pendarahan", "Fraktur & Patah Tulang", "Syok & Pingsan"],
  },
  {
    icon: ShieldAlert,
    title: "Mitigasi Bencana",
    desc: "Persiapan dan langkah-langkah mitigasi untuk menghadapi berbagai jenis bencana alam.",
    color: "from-orange-500 to-orange-600",
    items: ["Kesiapsiagaan Gempa", "Sistem Peringatan Dini", "Rencana Evakuasi", "Tas Siaga Bencana"],
  },
  {
    icon: Droplets,
    title: "Water Rescue",
    desc: "Teknik dasar penyelamatan di air dan keselamatan berenang untuk masyarakat umum.",
    color: "from-blue-500 to-blue-600",
    items: ["Keselamatan Air", "Penyelamatan Tenggelam", "Pelampung Darurat", "Arus & Banjir"],
  },
  {
    icon: Flame,
    title: "Fire Rescue",
    desc: "Penanganan awal kebakaran dan teknik evakuasi saat terjadi kebakaran.",
    color: "from-amber-500 to-amber-600",
    items: ["Penggunaan APAR", "Evakuasi Kebakaran", "Pencegahan Kebakaran", "Pertolongan Korban"],
  },
  {
    icon: Compass,
    title: "Survival",
    desc: "Keterampilan bertahan hidup di alam terbuka dan situasi darurat.",
    color: "from-emerald-500 to-emerald-600",
    items: ["Navigasi & Orientasi", "Mencari Air & Makanan", "Membuat Shelter", "Sinyal Darurat"],
  },
  {
    icon: HeartPulse,
    title: "Kesiapsiagaan Komunitas",
    desc: "Membangun komunitas siaga bencana yang tangguh dan mandiri.",
    color: "from-purple-500 to-purple-600",
    items: ["Satlinmas Desa", "Sistem Komando", "Komunikasi Darurat", "Posko Pengungsian"],
  },
]

export function EdukasiSection() {
  return (
    <section id="edukasi" className="py-20 bg-slate-50 dark:bg-[#0d1424]">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="Edukasi Kebencanaan"
          title="Materi Edukasi & Pengetahuan SAR"
          description="Pelajari keterampilan penyelamatan dan mitigasi bencana yang dapat Anda gunakan untuk melindungi diri dan orang lain."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((m) => (
            <Card key={m.title} className="group hover:shadow-xl transition-all duration-300 border-slate-100 dark:border-slate-800 overflow-hidden">
              <CardContent className="p-6">
                <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${m.color} mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <m.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#0F172A] dark:text-white mb-2">{m.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">{m.desc}</p>
                <ul className="space-y-1.5 mb-4">
                  {m.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="#edukasi" className="inline-flex items-center gap-1 text-sm font-semibold text-orange-600 hover:gap-2 transition-all">
                  Pelajari Selengkapnya <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
