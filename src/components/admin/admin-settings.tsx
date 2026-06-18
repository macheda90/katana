"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Loader2, Building, Phone, MapPin, Image as ImageIcon, Globe, Palette, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"

const SETTING_KEYS = [
  "site_name", "site_tagline", "site_description",
  "hero_headline", "hero_subheadline", "hero_description", "hero_cta1_text", "hero_cta1_link", "hero_cta2_text", "hero_cta2_link",
  "address", "phone", "email", "whatsapp", "emergency_hotline",
  "instagram", "facebook", "youtube", "twitter",
  "maps_lat", "maps_lng", "maps_embed",
  "footer_text", "footer_copyright",
  "primary_color", "logo_url", "favicon_url",
  "about_history", "about_visi", "about_misi",
  "meta_keywords", "meta_author",
] as const

type SettingKey = typeof SETTING_KEYS[number]

const defaultValues: Record<SettingKey, string> = {
  site_name: "KATANA RESCUE",
  site_tagline: "Siaga. Tanggap. Menyelamatkan.",
  site_description: "Portal Resmi Tim SAR dan Relawan Penanggulangan Bencana Kecamatan Cikampek",
  hero_headline: "KATANA RESCUE",
  hero_subheadline: "Siaga. Tanggap. Menyelamatkan.",
  hero_description: "Katana Rescue adalah tim SAR dan relawan kemanusiaan yang berkomitmen memberikan pelayanan pencarian, pertolongan, evakuasi, serta penanggulangan bencana di wilayah Kecamatan Cikampek dan sekitarnya.",
  hero_cta1_text: "Gabung Menjadi Anggota",
  hero_cta1_link: "#daftar",
  hero_cta2_text: "Hubungi Kami",
  hero_cta2_link: "#kontak",
  address: "Jl. Raya Cikampek No. 1, Cikampek, Karawang, Jawa Barat 41373",
  phone: "+62 812-3456-7890",
  email: "info@katanarescue.cikampek.id",
  whatsapp: "+62 812-3456-7890",
  emergency_hotline: "+62 812-3456-7890",
  instagram: "https://instagram.com/katanarescue",
  facebook: "https://facebook.com/katanarescue",
  youtube: "https://youtube.com/@katanarescue",
  twitter: "",
  maps_lat: "-6.4217",
  maps_lng: "107.4606",
  maps_embed: "https://www.openstreetmap.org/export/embed.html?bbox=107.4456%2C-6.4317%2C107.4756%2C-6.4117&layer=mapnik&marker=-6.4217%2C107.4606",
  footer_text: "Tim SAR dan relawan kemanusiaan yang berkomitmen memberikan pelayanan pencarian, pertolongan, evakuasi, serta penanggulangan bencana di Kecamatan Cikampek dan sekitarnya.",
  footer_copyright: `© ${new Date().getFullYear()} KATANA RESCUE. Portal Resmi Tim SAR dan Relawan Penanggulangan Bencana Kecamatan Cikampek.`,
  primary_color: "#FF6B00",
  logo_url: "/images/katana-logo.png",
  favicon_url: "/images/katana-logo.png",
  about_history: "Katana Rescue didirikan pada tahun 2018 oleh sekelompok relawan muda di Kecamatan Cikampek yang memiliki kepedulian tinggi terhadap keselamatan masyarakat.",
  about_visi: "Menjadi tim SAR dan relawan kemanusiaan terdepan, profesional, dan terpercaya dalam penanggulangan bencana di Kecamatan Cikampek dan sekitarnya.",
  about_misi: "Memberikan pelayanan pencarian, pertolongan, dan evakuasi yang cepat, tepat, dan profesional|Meningkatkan kapasitas anggota melalui pelatihan dan sertifikasi berkala|Membangun kemitraan strategis dengan pemerintah dan instansi terkait|Melaksanakan program kesiapsiagaan bencana dan edukasi masyarakat|Mengedepankan nilai kemanusiaan, profesionalisme, dan kepedulian sosial",
  meta_keywords: "Katana Rescue, SAR Cikampek, Tim SAR, Relawan Bencana, Penanggulangan Bencana, Search and Rescue, Cikampek, Karawang",
  meta_author: "Katana Rescue Cikampek",
}

export function AdminSettings() {
  const [values, setValues] = useState<Record<SettingKey, string>>(defaultValues)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        const merged = { ...defaultValues }
        for (const k of SETTING_KEYS) {
          if (data[k]) merged[k] = data[k]
        }
        setValues(merged)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      if (res.ok) {
        toast.success("Pengaturan berhasil disimpan! Perubahan akan tampil di halaman utama.")
      } else {
        toast.error("Gagal menyimpan pengaturan")
      }
    } catch {
      toast.error("Gagal menyimpan pengaturan")
    } finally {
      setSaving(false)
    }
  }

  const update = (key: SettingKey, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  if (loading) {
    return <div className="flex items-center justify-center h-96 text-slate-400">Memuat pengaturan...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-white">Pengaturan Website</h2>
          <p className="text-sm text-slate-400">Atur semua tampilan dan konten di halaman utama website</p>
        </div>
        <Button onClick={handleSave} disabled={saving} className="bg-orange-500 hover:bg-orange-600 text-white">
          {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
          Simpan Pengaturan
        </Button>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-slate-800/50">
          <TabsTrigger value="general" className="text-xs"><Building className="h-3.5 w-3.5 mr-1 md:mr-2" />Umum</TabsTrigger>
          <TabsTrigger value="hero" className="text-xs"><ImageIcon className="h-3.5 w-3.5 mr-1 md:mr-2" />Hero</TabsTrigger>
          <TabsTrigger value="contact" className="text-xs"><Phone className="h-3.5 w-3.5 mr-1 md:mr-2" />Kontak</TabsTrigger>
          <TabsTrigger value="about" className="text-xs"><Globe className="h-3.5 w-3.5 mr-1 md:mr-2" />Tentang</TabsTrigger>
          <TabsTrigger value="map" className="text-xs"><MapPin className="h-3.5 w-3.5 mr-1 md:mr-2" />Peta & SEO</TabsTrigger>
        </TabsList>

        {/* General */}
        <TabsContent value="general" className="space-y-4">
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader><CardTitle className="text-white text-base">Informasi Website</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Nama Website" value={values.site_name} onChange={(v) => update("site_name", v)} />
                <Field label="Tagline" value={values.site_tagline} onChange={(v) => update("site_tagline", v)} />
              </div>
              <Field textarea label="Deskripsi Website" value={values.site_description} onChange={(v) => update("site_description", v)} />
              <div className="grid sm:grid-cols-3 gap-4">
                <Field label="URL Logo" value={values.logo_url} onChange={(v) => update("logo_url", v)} />
                <Field label="URL Favicon" value={values.favicon_url} onChange={(v) => update("favicon_url", v)} />
                <Field label="Warna Utama (Hex)" value={values.primary_color} onChange={(v) => update("primary_color", v)} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader><CardTitle className="text-white text-base flex items-center gap-2"><Palette className="h-4 w-4 text-orange-400" />Footer</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Field textarea label="Teks Footer" value={values.footer_text} onChange={(v) => update("footer_text", v)} />
              <Field label="Copyright Footer" value={values.footer_copyright} onChange={(v) => update("footer_copyright", v)} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Hero */}
        <TabsContent value="hero" className="space-y-4">
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader><CardTitle className="text-white text-base">Konten Hero Section</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Field label="Headline Utama" value={values.hero_headline} onChange={(v) => update("hero_headline", v)} />
              <Field label="Sub-headline" value={values.hero_subheadline} onChange={(v) => update("hero_subheadline", v)} />
              <Field textarea label="Deskripsi" value={values.hero_description} onChange={(v) => update("hero_description", v)} />
              <div className="grid sm:grid-cols-2 gap-4 pt-2 border-t border-slate-700">
                <Field label="Teks Tombol CTA 1" value={values.hero_cta1_text} onChange={(v) => update("hero_cta1_text", v)} />
                <Field label="Link Tombol CTA 1" value={values.hero_cta1_link} onChange={(v) => update("hero_cta1_link", v)} />
                <Field label="Teks Tombol CTA 2" value={values.hero_cta2_text} onChange={(v) => update("hero_cta2_text", v)} />
                <Field label="Link Tombol CTA 2" value={values.hero_cta2_link} onChange={(v) => update("hero_cta2_link", v)} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact */}
        <TabsContent value="contact" className="space-y-4">
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader><CardTitle className="text-white text-base">Informasi Kontak</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Field textarea label="Alamat Lengkap" value={values.address} onChange={(v) => update("address", v)} />
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Telepon" value={values.phone} onChange={(v) => update("phone", v)} />
                <Field label="Email" value={values.email} onChange={(v) => update("email", v)} />
                <Field label="WhatsApp" value={values.whatsapp} onChange={(v) => update("whatsapp", v)} />
                <Field label="Hotline Darurat" value={values.emergency_hotline} onChange={(v) => update("emergency_hotline", v)} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader><CardTitle className="text-white text-base">Media Sosial</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Instagram URL" value={values.instagram} onChange={(v) => update("instagram", v)} />
                <Field label="Facebook URL" value={values.facebook} onChange={(v) => update("facebook", v)} />
                <Field label="YouTube URL" value={values.youtube} onChange={(v) => update("youtube", v)} />
                <Field label="Twitter/X URL" value={values.twitter} onChange={(v) => update("twitter", v)} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* About */}
        <TabsContent value="about" className="space-y-4">
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader><CardTitle className="text-white text-base">Konten Tentang Kami</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Field textarea label="Sejarah Organisasi" value={values.about_history} onChange={(v) => update("about_history", v)} />
              <Field textarea label="Visi" value={values.about_visi} onChange={(v) => update("about_visi", v)} />
              <div className="space-y-1.5">
                <Label className="text-slate-300">Misi (pisahkan dengan tanda |)</Label>
                <Textarea
                  value={values.about_misi}
                  onChange={(e) => update("about_misi", e.target.value)}
                  rows={5}
                  className="bg-slate-900/50 border-slate-700 text-white"
                  placeholder="Misi 1|Misi 2|Misi 3"
                />
                <p className="text-xs text-slate-500">Setiap baris misi dipisahkan dengan karakter |</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Map & SEO */}
        <TabsContent value="map" className="space-y-4">
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader><CardTitle className="text-white text-base">Peta & Lokasi Markas</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Latitude" value={values.maps_lat} onChange={(v) => update("maps_lat", v)} />
                <Field label="Longitude" value={values.maps_lng} onChange={(v) => update("maps_lng", v)} />
              </div>
              <Field textarea label="URL Embed Peta" value={values.maps_embed} onChange={(v) => update("maps_embed", v)} />
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader><CardTitle className="text-white text-base">SEO Meta</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Field label="Meta Keywords" value={values.meta_keywords} onChange={(v) => update("meta_keywords", v)} />
              <Field label="Meta Author" value={values.meta_author} onChange={(v) => update("meta_author", v)} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save bar at bottom */}
      <div className="sticky bottom-0 -mx-4 lg:-mx-6 px-4 lg:px-6 py-3 bg-slate-900/80 backdrop-blur border-t border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          Perubahan otomatis tersinkron ke halaman utama setelah disimpan
        </div>
        <Button onClick={handleSave} disabled={saving} className="bg-orange-500 hover:bg-orange-600 text-white">
          {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
          Simpan
        </Button>
      </div>
    </div>
  )
}

function Field({
  label, value, onChange, textarea,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  textarea?: boolean
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-slate-300 text-xs">{label}</Label>
      {textarea ? (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="bg-slate-900/50 border-slate-700 text-white text-sm"
        />
      ) : (
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-slate-900/50 border-slate-700 text-white text-sm"
        />
      )}
    </div>
  )
}
