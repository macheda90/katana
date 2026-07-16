import { Star, Quote } from "lucide-react"
import { SectionHeading } from "@/components/site/section-heading"

export function TestimonialsSection({ testimonials }: { testimonials: any[] }) {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white dark:from-[#0d1424] dark:to-[#0a0f1d]">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="Testimoni"
          title="Apa Kata Masyarakat & Mitra"
          description="Kepercayaan dan apresiasi dari masyarakat, instansi, dan mitra kerja Katana Rescue."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="relative bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-all"
            >
              <Quote className="absolute top-5 right-5 h-10 w-10 text-orange-100 dark:text-orange-950/40" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-orange-500 text-orange-500" />
                ))}
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 relative z-10">
                &ldquo;{t.message}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white font-bold shrink-0 overflow-hidden">
                  {t.avatar ? (
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="h-full w-full flex items-center justify-center">{t.name.charAt(0)}</span>
                  )}
                </div>
                <div>
                  <div className="font-bold text-[#0F172A] dark:text-white text-sm">{t.name}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {t.role}{t.org ? ` • ${t.org}` : ""}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
