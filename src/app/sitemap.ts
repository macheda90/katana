import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://katanarescue.cikampek.id"
  const lastModified = new Date()

  const sections = [
    "", "#about", "#divisi", "#kegiatan", "#berita", "#agenda",
    "#struktur", "#edukasi", "#dashboard", "#daftar", "#lapor",
    "#donasi", "#markas", "#kontak",
  ]

  return sections.map((section) => ({
    url: `${baseUrl}/${section}`,
    lastModified,
    changeFrequency: section === "" ? "daily" : "weekly",
    priority: section === "" ? 1.0 : 0.8,
  }))
}
