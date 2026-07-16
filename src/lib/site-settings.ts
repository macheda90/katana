import { db } from '@/lib/db'

export async function getSiteSettings(): Promise<Record<string, string>> {
  try {
    const settings = await db.siteSetting.findMany()
    const map: Record<string, string> = {}
    for (const s of settings) map[s.key] = s.value

    const defaults: Record<string, string> = {
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
      email: "info@katanarescue.id",
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

    return { ...defaults, ...map }
  } catch {
    return {
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
      email: "info@katanarescue.id",
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
      footer_copyright: `© ${new Date().getFullYear()} KATANA RESCUE.`,
      primary_color: "#FF6B00",
      logo_url: "/images/katana-logo.png",
      favicon_url: "/images/katana-logo.png",
      about_history: "",
      about_visi: "",
      about_misi: "",
      meta_keywords: "",
      meta_author: "",
    }
  }
}
