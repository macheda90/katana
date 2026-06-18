import { Target, Eye, Heart, Award, Users2, ShieldCheck } from "lucide-react"
import { SectionHeading } from "@/components/site/section-heading"

export function AboutSection({ settings }: { settings: Record<string, string> }) {
  const visi = settings.about_visi || "Menjadi tim SAR dan relawan kemanusiaan terdepan, profesional, dan terpercaya dalam penanggulangan bencana di Kecamatan Cikampek dan sekitarnya."
  const misi = (settings.about_misi || "Memberikan pelayanan pencarian, pertolongan, dan evakuasi yang cepat, tepat, dan profesional.|Meningkatkan kapasitas anggota melalui pelatihan dan sertifikasi berkala|Membangun kemitraan strategis dengan pemerintah dan instansi terkait|Melaksanakan program kesiapsiagaan bencana dan edukasi masyarakat|Mengedepankan nilai kemanusiaan, profesionalisme, dan kepedulian sosial").split("|")
  const history = settings.about_history || "Katana Rescue didirikan pada tahun 2018 oleh sekelompok relawan muda di Kecamatan Cikampek yang memiliki kepedulian tinggi terhadap keselamatan masyarakat. Bermula dari kegiatan pencarian dan pertolongan korban banjir musiman, organisasi terus berkembang."

const nilai = [
  { icon: Heart, title: "Kemanusiaan", desc: "Mengutamakan keselamatan dan kesejahteraan sesama." },
  { icon: Award, title: "Profesionalisme", desc: "Bekerja dengan kompetensi dan standar tertinggi." },
  { icon: ShieldCheck, title: "Integritas", desc: "Jujur, amanah, dan bertanggung jawab." },
  { icon: Users2, title: "Kerja Sama", desc: "Kolaborasi tim dan mitra dalam setiap tugas." },
]

  return (
    <section id="about" className="py-20 bg-white dark:bg-[#0a0f1d]">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="Tentang Kami"
          title="Mengenal Katana Rescue Lebih Dekat"
          description="Organisasi SAR dan relawan kemanusiaan yang berdedikasi melayani masyarakat Kecamatan Cikampek sejak tahun 2018."
        />

        {/* Sejarah */}
        <div className="grid lg:grid-cols-2 gap-10 items-center mb-20">
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/activity-training.png"
                alt="Pelatihan Tim SAR Katana Rescue"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-orange-500 text-white rounded-2xl p-6 shadow-xl hidden md:block">
              <div className="text-4xl font-extrabold">7+</div>
              <div className="text-sm font-medium">Tahun Mengabdi</div>
            </div>
          </div>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-950/30 mb-4">
              <span className="text-xs font-semibold text-orange-600 uppercase tracking-wider">Sejarah Organisasi</span>
            </div>
            <h3 className="text-2xl font-bold text-[#0F172A] dark:text-white mb-4">
              Berakar dari Kepedulian, Tumbuh dengan Profesionalisme
            </h3>
            <div className="space-y-3 text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>{history}</p>
              <p>
                Saat ini Katana Rescue memiliki 8 divisi spesialisasi dengan lebih dari 50 anggota aktif yang siaga 24 jam merespons keadaan darurat. Kami bermitra dengan BPBD, PMI, BASARNAS, TNI, POLRI, dan pemerintah daerah dalam sistem penanggulangan bencana terpadu.
              </p>
            </div>
          </div>
        </div>

        {/* Visi Misi */}
        <div className="grid lg:grid-cols-2 gap-6 mb-16">
          <div className="bg-gradient-to-br from-[#0F172A] to-[#1e293b] rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full blur-2xl" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500">
                  <Eye className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Visi</h3>
              </div>
              <p className="text-slate-300 leading-relaxed text-lg">{visi}</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 dark:bg-orange-950/40">
                <Target className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-[#0F172A] dark:text-white">Misi</h3>
            </div>
            <ul className="space-y-3">
              {misi.map((m, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500 text-white text-xs font-bold mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Nilai */}
        <div>
          <h3 className="text-center text-2xl font-bold text-[#0F172A] dark:text-white mb-8">Nilai Organisasi</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {nilai.map((n) => (
              <div key={n.title} className="text-center p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 hover:border-orange-300 dark:hover:border-orange-700 transition-colors">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 mb-4 shadow-lg">
                  <n.icon className="h-7 w-7 text-white" />
                </div>
                <h4 className="font-bold text-[#0F172A] dark:text-white mb-2">{n.title}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{n.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
