import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Shield, Users, Award, Activity, HeartHandshake, Phone } from "lucide-react"

export function HeroSection({ stats, settings }: { stats: any; settings: Record<string, string> }) {
  const cta1Text = settings.hero_cta1_text || "Gabung Menjadi Anggota"
  const cta1Link = settings.hero_cta1_link || "#daftar"
  const cta2Text = settings.hero_cta2_text || "Hubungi Kami"
  const cta2Link = settings.hero_cta2_link || "#kontak"

  return (
    <section id="beranda" className="relative min-h-[600px] lg:min-h-[680px] flex items-center overflow-hidden bg-[#0F172A]">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-rescue.png"
          alt="Tim SAR Katana Rescue melakukan evakuasi"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/85 to-[#0F172A]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" />
      </div>

      <div className="absolute top-20 right-10 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/15 border border-orange-500/30 backdrop-blur-sm mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            <span className="text-xs font-semibold text-orange-300 tracking-wide">PORTAL RESMI TIM SAR CIKAMPEK</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-4 tracking-tight">
            {settings.hero_headline?.split(" ").map((word, i, arr) =>
              i === arr.length - 1 ? <span key={i} className="text-orange-500">{word}</span> : <span key={i}>{word} </span>
            ) || <>KATANA <span className="text-orange-500">RESCUE</span></>}
          </h1>

          <p className="text-xl sm:text-2xl font-bold text-orange-400 mb-6 tracking-wide">
            {settings.hero_subheadline || "Siaga. Tanggap. Menyelamatkan."}
          </p>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl">
            {settings.hero_description}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-12">
            <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white text-base h-12 px-8">
              <Link href={cta1Link}>
                <Users className="h-5 w-5 mr-2" />
                {cta1Text}
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 text-base h-12 px-8 bg-white/5 backdrop-blur-sm">
              <Link href={cta2Link}>
                <Phone className="h-5 w-5 mr-2" />
                {cta2Text}
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl">
            {[
              { icon: Users, label: "Anggota", value: stats?.totalMembers ?? "50+" },
              { icon: Activity, label: "Misi SAR", value: stats?.totalMissions ?? "5" },
              { icon: HeartHandshake, label: "Kegiatan Sosial", value: stats?.totalSocial ?? "20" },
              { icon: Award, label: "Pengurus", value: stats?.totalPengurus ?? "8" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/20 border border-orange-500/30">
                  <item.icon className="h-5 w-5 text-orange-400" />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-white leading-none">{item.value}</div>
                  <div className="text-xs text-slate-400">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 80" className="w-full h-[40px]" preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white" className="dark:fill-[#0a0f1d]" />
        </svg>
      </div>
    </section>
  )
}
