# KATANA RESCUE

### Portal Resmi Tim SAR dan Relawan Penanggulangan Bencana Kecamatan Cikampek

> **Siaga. Tanggap. Menyelamatkan.**

Website portal resmi Tim SAR Katana Rescue yang berpusat di Kecamatan Cikampek, Kabupaten Karawang, Jawa Barat. Dibangun dengan teknologi modern untuk mendukung operasi pencarian, pertolongan, evakuasi, dan penanggulangan bencana.

---

## Fitur Utama

### Website Publik
- **Hero Section** — Visual SAR dengan AI-generated image, headline, dan CTA
- **Statistik Organisasi** — Jumlah anggota, pengurus, misi SAR, kegiatan sosial, relawan aktif
- **Tentang Kami** — Sejarah, Visi, Misi, dan Nilai organisasi
- **8 Divisi Spesialisasi** — Water Rescue, Vertical Rescue, Evakuasi Medis, Logistik, Komunikasi & Radio, Drone SAR, Kesiapsiagaan Bencana, Humas & Dokumentasi
- **Kegiatan Terbaru** — Card kegiatan dengan foto, lokasi, tanggal, deskripsi
- **Berita Terbaru** — Featured news + list berita dengan kategori
- **Agenda Mendatang** — Kalender pelatihan, simulasi, bakti sosial, rapat
- **Struktur Organisasi** — Pengurus utama & koordinator divisi
- **Pusat Data Bencana** — Statistik & riwayat bencana wilayah
- **Edukasi Kebencanaan** — Materi P3K, mitigasi, water/fire rescue, survival
- **Dashboard Admin** — Widget statistik + grafik (pertumbuhan anggota, kegiatan, misi, donasi)
- **Testimoni** — Dari masyarakat dan instansi mitra
- **Mitra Kerja** — BPBD, PMI, BASARNAS, TNI, POLRI, Pemerintah
- **Peta Markas** — Integrasi peta OpenStreetMap

### Sistem Interaktif
- **Pendaftaran Anggota** — Form multi-tab (Data Pribadi, Kontak, Pendukung) dengan alur approval
- **Pelaporan Kejadian** — Form lapor bencana/orang hilang/kecelakaan
- **Donasi Online** — Form donasi dengan pilihan nominal & metode pembayaran
- **Kontak** — Form pesan dengan info kontak lengkap

### Backend & Database
- **15+ Model Prisma** — Users, Members, Divisions, Activities, News, Agenda, Missions, Inventory, Donations, dll
- **12 API Routes** — Stats, News, Activities, Agenda, Divisions, Register, Contact, Donations, Incidents, Testimonials, Partners, Settings
- **RBAC Architecture** — SUPER_ADMIN, ADMIN, PENGURUS, KOORDINATOR_DIVISI, ANGGOTA, RELAWAN
- **Audit Log & Login History** — Model keamanan tersedia

### SEO & PWA
- Metadata lengkap (title, description, keywords, OpenGraph, Twitter Cards)
- JSON-LD Schema.org (NGO type)
- Sitemap.xml & robots.txt dinamis
- PWA Manifest dengan theme color orange
- Bahasa Indonesia (lang="id")

---

## Tech Stack

| Kategori | Teknologi |
|----------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 + shadcn/ui (New York) |
| Database | Prisma ORM (SQLite) |
| Charts | Recharts |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |
| Notifications | Sonner |
| Fonts | Geist Sans & Mono |

---

## Tema Warna

| Warna | Hex | Penggunaan |
|-------|-----|------------|
| Orange | `#FF6B00` | Primary, CTA, aksen |
| Dark Navy | `#0F172A` | Background hero, footer |
| White | `#FFFFFF` | Background utama, teks |

---

## Struktur Folder

```
src/
├── app/
│   ├── api/                  # API Routes
│   │   ├── stats/           # Statistik & grafik dashboard
│   │   ├── news/            # Berita
│   │   ├── activities/      # Kegiatan
│   │   ├── agenda/          # Agenda
│   │   ├── divisions/       # Divisi
│   │   ├── testimonials/    # Testimoni
│   │   ├── partners/        # Mitra
│   │   ├── register/        # Pendaftaran anggota (POST)
│   │   ├── contact/         # Form kontak (POST)
│   │   ├── donations/       # Donasi (POST/GET)
│   │   ├── incidents/       # Lapor kejadian (POST/GET)
│   │   └── settings/        # Pengaturan situs
│   ├── globals.css          # Theme & global styles
│   ├── layout.tsx           # Root layout + SEO metadata
│   ├── page.tsx             # Homepage (semua section)
│   ├── sitemap.ts           # Dynamic sitemap
│   └── robots.ts            # Robots.txt
├── components/
│   ├── sections/            # Homepage sections
│   │   ├── hero-section.tsx
│   │   ├── stats-section.tsx
│   │   ├── about-section.tsx
│   │   ├── divisions-section.tsx
│   │   ├── activities-section.tsx
│   │   ├── news-section.tsx
│   │   ├── agenda-section.tsx
│   │   ├── struktur-section.tsx
│   │   ├── disaster-section.tsx
│   │   ├── edukasi-section.tsx
│   │   ├── dashboard-section.tsx
│   │   ├── register-section.tsx
│   │   ├── lapor-section.tsx
│   │   ├── donasi-section.tsx
│   │   ├── testimonials-section.tsx
│   │   ├── partners-section.tsx
│   │   ├── map-section.tsx
│   │   └── contact-section.tsx
│   ├── site/                # Layout components
│   │   ├── navbar.tsx
│   │   ├── footer.tsx
│   │   └── section-heading.tsx
│   └── ui/                  # shadcn/ui components
├── lib/
│   ├── db.ts                # Prisma client
│   └── utils.ts             # Utilities
└── hooks/                   # Custom hooks

prisma/
├── schema.prisma            # Database schema (15+ models)
└── seed.ts                  # Seed data script

public/
├── images/                  # AI-generated images
│   ├── hero-rescue.png
│   ├── katana-logo.png
│   ├── activity-training.png
│   ├── activity-flood.png
│   └── activity-social.png
└── manifest.json            # PWA manifest
```

---

## Database Schema (ERD)

### Core Models
- **User** — Akun autentikasi dengan role RBAC
- **Member** — Data anggota (50 anggota dummy)
- **Division** — 8 divisi spesialisasi

### Content Models
- **Activity** — Kegiatan rescue/sosial/pelatihan/simulasi/bencana
- **News** — Berita dengan kategori & featured
- **Agenda** — Jadwal kegiatan mendatang
- **Testimonial** — Testimoni masyarakat & mitra
- **Partner** — Mitra kerja (BPBD, PMI, dll)

### SAR Operations
- **Mission** — Misi SAR dengan status & koordinator
- **MissionMember** — Personel terlibat dalam misi
- **OperationLog** — Catatan operasi
- **IncidentReport** — Laporan kejadian dari masyarakat
- **Inventory** — Inventaris peralatan (perahu, HT, drone, APD)
- **Loan** — Peminjaman alat dengan workflow approval
- **DisasterData** — Data bencana wilayah

### Engagement
- **Donation** — Donasi online
- **ContactMessage** — Pesan dari form kontak
- **SiteSetting** — Pengaturan website dinamis

### Security
- **LoginHistory** — Riwayat login
- **AuditLog** — Log aktivitas pengguna

---

## Menjalankan Project

### Prasyarat
- Node.js 18+ / Bun
- SQLite (sudah terkonfigurasi)

### Instalasi
```bash
bun install
```

### Setup Database
```bash
bun run db:push     # Push schema ke database
bun run db:generate # Generate Prisma client
bun run prisma/seed.ts  # Jalankan seed data
```

### Development
```bash
bun run dev         # Start dev server di port 3000
```

### Lint
```bash
bun run lint        # ESLint check
```

---

## API Endpoints

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/stats` | Statistik & data grafik dashboard |
| GET | `/api/news` | List berita (?limit=&category=&featured=) |
| GET | `/api/activities` | List kegiatan (?limit=&category=) |
| GET | `/api/agenda` | List agenda (?limit=&upcoming=) |
| GET | `/api/divisions` | List divisi dengan jumlah anggota |
| GET | `/api/testimonials` | List testimoni |
| GET | `/api/partners` | List mitra kerja |
| GET | `/api/settings` | Pengaturan situs |
| GET | `/api/donations` | List donasi terverifikasi |
| POST | `/api/register` | Pendaftaran anggota baru |
| POST | `/api/contact` | Kirim pesan kontak |
| POST | `/api/donations` | Submit donasi |
| POST | `/api/incidents` | Lapor kejadian/bencana |

---

## Data Seed

Data dummy yang disertakan:
- **8 Divisi** dengan koordinator
- **50 Anggota** (38 aktif, 10 pending, 2 inactive)
- **20 Kegiatan** (rescue, sosial, pelatihan, simulasi, bencana)
- **10 Berita** dengan kategori & featured
- **10 Agenda** mendatang
- **6 Testimoni** dari masyarakat & instansi
- **8 Mitra** (BPBD, PMI, BASARNAS, TNI, POLRI, dll)
- **5 Misi SAR** dengan operation logs
- **12 Inventaris** (perahu, HT, drone, APD, kendaraan)
- **6 Data Bencana** (banjir, longsor, kebakaran, angin)
- **6 Donasi** contoh
- **4 Laporan Kejadian** contoh

---

## Role System (RBAC)

| Role | Hak Akses |
|------|-----------|
| SUPER_ADMIN | Akses penuh seluruh sistem |
| ADMIN | Mengelola seluruh website |
| PENGURUS | Mengelola organisasi |
| KOORDINATOR_DIVISI | Mengelola anggota divisinya |
| ANGGOTA | Akses portal anggota |
| RELAWAN | Akses terbatas |

---

## SEO Features

- ✅ Metadata lengkap (title, description, keywords)
- ✅ OpenGraph & Twitter Cards
- ✅ JSON-LD Schema.org (NGO type)
- ✅ Dynamic Sitemap (`/sitemap.xml`)
- ✅ Robots.txt (`/robots.txt`)
- ✅ PWA Manifest (`/manifest.json`)
- ✅ Bahasa Indonesia (`lang="id"`)
- ✅ Semantic HTML (header, main, section, footer)
- ✅ Responsive mobile-first design
- ✅ Theme color orange (#FF6B00)

---

## Lisensi

© 2024 KATANA RESCUE. Portal Resmi Tim SAR dan Relawan Penanggulangan Bencana Kecamatan Cikampek. Hak Cipta Dilindungi.
