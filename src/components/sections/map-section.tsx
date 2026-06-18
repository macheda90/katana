import { MapPin, Phone, Navigation } from "lucide-react"
import { SectionHeading } from "@/components/site/section-heading"
import { Button } from "@/components/ui/button"

export function MapSection() {
  return (
    <section id="markas" className="py-20 bg-slate-50 dark:bg-[#0d1424]">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="Peta Markas"
          title="Lokasi Markas Katana Rescue"
          description="Kunjungi markas pusat Tim SAR Katana Rescue di Kecamatan Cikampek, Kabupaten Karawang, Jawa Barat."
        />

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map */}
          <div className="lg:col-span-2 rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 h-[400px] lg:h-[450px]">
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=107.4456%2C-6.4317%2C107.4756%2C-6.4117&layer=mapnik&marker=-6.4217%2C107.4606"
              className="w-full h-full border-0"
              loading="lazy"
              title="Peta Lokasi Markas Katana Rescue Cikampek"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col gap-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-bold text-[#0F172A] dark:text-white">Alamat Markas</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Jl. Raya Cikampek No. 1<br />
                Kelurahan Cikampek Kota<br />
                Kecamatan Cikampek<br />
                Kabupaten Karawang<br />
                Jawa Barat 41373
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-bold text-[#0F172A] dark:text-white">Kontak Darurat</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
                Tim siaga 24 jam merespons keadaan darurat:
              </p>
              <a href="tel:+6281234567890" className="block text-lg font-bold text-orange-600 mb-2">
                +62 812-3456-7890
              </a>
              <p className="text-xs text-slate-500">info@katanarescue.cikampek.id</p>
            </div>

            <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white h-12">
              <a
                href="https://www.openstreetmap.org/?mlat=-6.4217&mlon=107.4606#map=15/-6.4217/107.4606"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Navigation className="h-4 w-4 mr-2" />
                Buka di Peta
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
