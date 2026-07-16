import Link from "next/link"
import { Shield, Phone, Mail, MapPin, Facebook, Instagram, Youtube, Clock, AlertTriangle } from "lucide-react"

const quickLinks = [
  { label: "Tentang Kami", href: "#about" },
  { label: "Kegiatan", href: "#kegiatan" },
  { label: "Berita", href: "#berita" },
  { label: "Agenda", href: "#agenda" },
  { label: "Divisi", href: "#divisi" },
  { label: "Kontak", href: "#kontak" },
]

const programLinks = [
  { label: "Pendaftaran Anggota", href: "#daftar" },
  { label: "Portal Relawan", href: "#daftar" },
  { label: "Edukasi Kebencanaan", href: "#edukasi" },
  { label: "Lapor Bencana", href: "#lapor" },
  { label: "Dokumentasi", href: "#kegiatan" },
]

export function Footer({ settings }: { settings: Record<string, string> }) {
  const phone = settings.phone || "+62 838-4540-8400"
  const email = settings.email || "info@katanarescue.id"
  const address = settings.address || "Jl. Raya Cikampek No. 1, Cikampek, Karawang, Jawa Barat 41373"
  const footerText = settings.footer_text || "Tim SAR dan relawan kemanusiaan yang berkomitmen..."
  const copyright = settings.footer_copyright || `© ${new Date().getFullYear()} KATANA RESCUE.`
  const instagram = settings.instagram || "#"
  const facebook = settings.facebook || "#"
  const youtube = settings.youtube || "#"

  return (
    <footer className="bg-[#0F172A] text-slate-300 mt-auto">
      <div className="bg-gradient-to-r from-orange-600 to-orange-500">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-white">
            <AlertTriangle className="h-6 w-6 shrink-0" />
            <div>
              <p className="font-bold text-sm">DARURAT SAR? Hubungi 24 Jam</p>
              <p className="text-xs text-orange-100">Tim siaga merespons setiap saat</p>
            </div>
          </div>
          <a href={`tel:${phone.replace(/\s/g, "")}`} className="flex items-center gap-2 bg-white text-orange-600 font-bold px-5 py-2.5 rounded-lg hover:bg-orange-50 transition-colors">
            <Phone className="h-4 w-4" />
            {phone}
          </a>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Link href="#beranda" className="flex items-center gap-2.5 mb-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-orange-600">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xl font-extrabold tracking-tight text-white">
                  KATANA<span className="text-orange-500">RESCUE</span>
                </span>
                <span className="text-[10px] text-slate-400">SAR Cikampek</span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">{footerText}</p>
            <div className="flex items-center gap-2">
              {facebook && (
                <Link href={facebook} aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 hover:bg-orange-600 transition-colors">
                  <Facebook className="h-4 w-4 text-white" />
                </Link>
              )}
              {instagram && (
                <Link href={instagram} aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 hover:bg-orange-600 transition-colors">
                  <Instagram className="h-4 w-4 text-white" />
                </Link>
              )}
              {youtube && (
                <Link href={youtube} aria-label="Youtube" className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 hover:bg-orange-600 transition-colors">
                  <Youtube className="h-4 w-4 text-white" />
                </Link>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Menu Utama</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-orange-500 transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Program</h3>
            <ul className="space-y-2.5">
              {programLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-orange-500 transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Kontak</h3>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <MapPin className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-400">{address}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-400">{phone}</span>
              </li>
              <li className="flex gap-3">
                <Mail className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-400">{email}</span>
              </li>
              <li className="flex gap-3">
                <Clock className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-400">Siaga 24 Jam / 7 Hari</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">{copyright}</p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <Link href="#" className="hover:text-orange-500">Kebijakan Privasi</Link>
            <Link href="#" className="hover:text-orange-500">Syarat & Ketentuan</Link>
            <Link href="#" className="hover:text-orange-500">AD/ART</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
