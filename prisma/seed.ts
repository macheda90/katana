import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'

const prisma = new PrismaClient()

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function daysFromNow(days: number) {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d
}

function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.scryptSync(password, salt, 64).toString('hex')
  return `${salt}:${hash}`
}

async function main() {
  console.log('🧹 Membersihkan semua data...')

  // Clean ALL data
  await prisma.contactMessage.deleteMany()
  await prisma.donation.deleteMany()
  await prisma.disasterData.deleteMany()
  await prisma.loan.deleteMany()
  await prisma.inventory.deleteMany()
  await prisma.incidentReport.deleteMany()
  await prisma.operationLog.deleteMany()
  await prisma.positionAssignment.deleteMany()
  await prisma.position.deleteMany()
  await prisma.missionMember.deleteMany()
  await prisma.mission.deleteMany()
  await prisma.activityMember.deleteMany()
  await prisma.activity.deleteMany()
  await prisma.news.deleteMany()
  await prisma.agenda.deleteMany()
  await prisma.testimonial.deleteMany()
  await prisma.partner.deleteMany()
  await prisma.member.deleteMany()
  await prisma.division.deleteMany()
  await prisma.loginHistory.deleteMany()
  await prisma.auditLog.deleteMany()
  await prisma.user.deleteMany()
  await prisma.siteSetting.deleteMany()


  console.log('✅ Semua data dibersihkan!')

  // ============ USERS ============
  const users = [
    { email: 'admin@katanarescue.cikampek.id', name: 'Administrator', role: 'SUPER_ADMIN', password: 'admin123' },
    { email: 'pengelola@katanarescue.cikampek.id', name: 'Pengelola Web', role: 'ADMIN', password: 'pengelola123' },
    { email: 'pengurus@katanarescue.cikampek.id', name: 'Andi Pratama', role: 'PENGURUS', password: 'pengurus123' },
    { email: 'koordinator@katanarescue.cikampek.id', name: 'Rudi Hartono', role: 'KOORDINATOR_DIVISI', password: 'koord123' },
  ]
  for (const u of users) {
    await prisma.user.create({
      data: { email: u.email, name: u.name, role: u.role, passwordHash: hashPassword(u.password), isActive: true },
    })
  }

  // ============ DIVISI ============
  const divisions = [
    { name: 'Water Rescue', slug: 'water-rescue', icon: 'Waves', color: 'cyan', description: 'Tim penanganan pencarian dan pertolongan korban di perairan, banjir, dan tenggelam. Berpengalaman dalam operasi rescue di sungai, waduk, dan area banjir bandang.', coordinator: 'Andi Pratama', order: 1 },
    { name: 'Vertical Rescue', slug: 'vertical-rescue', icon: 'Mountain', color: 'amber', description: 'Tim penyelamatan ketinggian, tebing, gedung, dan jurang dengan teknik tali profesional. Dilengkapi sertifikasi vertical rescue nasional.', coordinator: 'Rudi Hartono', order: 2 },
    { name: 'Evakuasi Medis', slug: 'evakuasi-medis', icon: 'Ambulance', color: 'red', description: 'Tim evakuasi medis dan pertolongan pertama korban kecelakaan. Tenaga medis tersertifikasi BLS dan PHTLS.', coordinator: 'Dedi Kurniawan', order: 3 },
    { name: 'Logistik', slug: 'logistik', icon: 'Package', color: 'orange', description: 'Tim pendukung distribusi perlengkapan, dapur umum, dan pengadaan logistik bencana. Menjamin ketersediaan alat dan bahan operasional.', coordinator: 'Siti Rahmawati', order: 4 },
    { name: 'Komunikasi dan Radio', slug: 'komunikasi-radio', icon: 'Radio', color: 'blue', description: 'Tim jaringan komunikasi radio HT dan koordinasi informasi lapangan. Mempertahankan komunikasi tetap berjalan saat infrastruktur turun.', coordinator: 'Bambang Sutrisno', order: 5 },
    { name: 'Drone SAR', slug: 'drone-sar', icon: 'Plane', color: 'purple', description: 'Tim pemetaan udara dan pencarian korban dengan teknologi drone. Mampu memetakan area bencana dan menemukan korban dari udara.', coordinator: 'Yoga Pratama', order: 6 },
    { name: 'Kesiapsiagaan Bencana', slug: 'kesiapsiagaan-bencana', icon: 'ShieldAlert', color: 'green', description: 'Tim mitigasi, simulasi, dan kesiapsiagaan tanggap bencana wilayah. Melaksanakan edukasi dan sosialisasi ke masyarakat.', coordinator: 'Nur Hasanah', order: 7 },
    { name: 'Humas dan Dokumentasi', slug: 'humas-dokumentasi', icon: 'Camera', color: 'pink', description: 'Tim hubungan masyarakat, publikasi, dan dokumentasi kegiatan SAR. Mengelola informasi publik dan media sosial organisasi.', coordinator: 'Maya Sari', order: 8 },
  ]

  const divisionMap: Record<string, any> = {}
  for (const d of divisions) {
    divisionMap[d.slug] = await prisma.division.create({ data: d })
  }

  // ============ POSISI / JABATAN ============
  const positionData = [
    { title: 'Ketua Umum', order: 1 },
    { title: 'Wakil Ketua', order: 2 },
    { title: 'Sekretaris', order: 3 },
    { title: 'Bendahara', order: 4 },
    { title: 'Penasihat', order: 5 },
    { title: 'Koordinator Operasional', order: 6 },
    { title: 'Koordinator Keuangan', order: 7 },
    { title: 'Koordinator Dokumentasi & Humas', order: 8 },
  ]

  const positionMap: Record<string, any> = {}
  for (const p of positionData) {
    const created = await prisma.position.create({ data: p })
    positionMap[p.title] = created
  }

  // ============ ANGGOTA (realistic) ============
  const memberData = [
    // Pengurus utama
    { name: 'Andi Pratama', div: 'water-rescue', role: 'Ketua Umum', status: 'ACTIVE', join: -2555, village: 'Cikampek Kota', phone: '081200011001', gender: 'LAKI_LAKI', edu: 'S1', occ: 'Wiraswasta', skills: 'Water Rescue, Renang, P3K, Navigation', cert: 'BNSP SAR, P3K Bersertifikat', bio: 'Pendiri Katana Rescue sejak 2018. Memiliki pengalaman 15+ tahun di bidang SAR dan water rescue. Aktif melatih anggota baru dan memimpin operasi penyelamatan.' },
    { name: 'Rudi Hartono', div: 'vertical-rescue', role: 'Wakil Ketua', status: 'ACTIVE', join: -2500, village: 'Limbangan', phone: '081200011002', gender: 'LAKI_LAKI', edu: 'D3', occ: 'Karyawan Swasta', skills: 'Vertical Rescue, Climbing, Tali-temali', cert: 'Vertical Rescue Level 3, Rope Access', bio: 'Spesialis vertical rescue dengan pengalaman 12 tahun. Pernah memimpin evakuasi di tebing Sanggabuana dan gedung tinggi di kawasan industri.' },
    { name: 'Dedi Kurniawan', div: 'evakuasi-medis', role: 'Sekretaris', status: 'ACTIVE', join: -2480, village: 'Dawuan', phone: '081200011003', gender: 'LAKI_LAKI', edu: 'S1', occ: 'Perawat', skills: 'P3K, BLS, PHTLS, Evakuasi Medis', cert: 'BLS Provider, PHTLS, EMT Basic', bio: 'Perawat profesional dengan sertifikasi BLS dan PHTLS. Menangani evakuasi medis korban kecelakaan dan bencana sejak 2019.' },
    { name: 'Siti Rahmawati', div: 'logistik', role: 'Bendahara', status: 'ACTIVE', join: -2470, village: 'Cikampek Selatan', phone: '081200011004', gender: 'PEREMPUAN', edu: 'S1', occ: 'Accountant', skills: 'Manajemen Logistik, Akuntansi', cert: 'Manajemen Logistik Bencana', bio: 'Bendahara organisasi yang juga mengevaluasi manajemen logistik bencana. Memastikan setiap operasi terdukung perlengkapan memadai.' },

    // Koordinator divisi
    { name: 'Bambang Sutrisno', div: 'komunikasi-radio', role: 'Koordinator', status: 'ACTIVE', join: -2400, village: 'Pejaten', phone: '081200011005', gender: 'LAKI_LAKI', edu: 'SMA/SMK', occ: 'Teknisi Radio', skills: 'Radio Komunikasi, HT, Repeater, ORARI', cert: 'ORARI Tingkat Lanjut, IARU', bio: 'Ahli komunikasi radio dengan lisensi ORARI. Membangun jaringan komunikasi HT untuk koordinasi operasi SAR di area blank signal.' },
    { name: 'Yoga Pratama', div: 'drone-sar', role: 'Koordinator', status: 'ACTIVE', join: -2300, village: 'Purwasari', phone: '081200011006', gender: 'LAKI_LAKI', edu: 'S1', occ: 'Fotografer', skills: 'Drone, Fotogrametri, Pemetaan', cert: 'Drone Pilot License, CASR 107', bio: 'Pilot drone bersertifikat yang mengembangkan divisi Drone SAR. Memetakan area bencana dan mencari korban dari udara dengan teknologi thermal.' },
    { name: 'Nur Hasanah', div: 'kesiapsiagaan-bencana', role: 'Koordinator', status: 'ACTIVE', join: -2350, village: 'Wanasari', phone: '081200011007', gender: 'PEREMPUAN', edu: 'S1', occ: 'Guru', skills: 'Edukasi Bencana, Mitigasi, CBDRM', cert: 'CBDRM Facilitator, DRR Trainer', bio: 'Pendidik tanggap bencana yang aktif mensosialisasikan mitigasi ke sekolah dan desa. Memimpin program kesiapsiagaan bencana komunitas.' },
    { name: 'Maya Sari', div: 'humas-dokumentasi', role: 'Koordinator', status: 'ACTIVE', join: -2380, village: 'Cikampek Kota', phone: '081200011008', gender: 'PEREMPUAN', edu: 'S1', occ: 'Jurnalis', skills: 'Public Relations, Dokumentasi, Sosmed', cert: 'Public Relations Certified', bio: 'Jurnalis profesional yang menangani humas dan dokumentasi. Mengelola media sosial dan publikasi kegiatan SAR ke publik.' },

    // Anggota aktif divisi Water Rescue
    { name: 'Hendra Gunawan', div: 'water-rescue', status: 'ACTIVE', join: -1800, village: 'Cikampek Selatan', phone: '081200012001', gender: 'LAKI_LAKI', edu: 'SMA/SMK', occ: 'Nelayan', skills: 'Renang, Perahu, Water Rescue', cert: 'Water Rescue Basic', bio: 'Nelayan dengan kemampuan renang dan operasi perahu yang mumpuni. Anggota water rescue sejak 2020.' },
    { name: 'Agus Setiawan', div: 'water-rescue', status: 'ACTIVE', join: -1700, village: 'Dawuan', phone: '081200012002', gender: 'LAKI_LAKI', edu: 'SMA/SMK', occ: 'Buruh', skills: 'Renang, P3K', cert: 'Water Rescue Basic, P3K', bio: 'Anggota water rescue yang juga tersertifikasi P3K. Aktif dalam operasi evakuasi banjir musiman.' },
    { name: 'Wawan Hendrawan', div: 'water-rescue', status: 'ACTIVE', join: -1600, village: 'Cikampek Kota', phone: '081200012003', gender: 'LAKI_LAKI', edu: 'D3', occ: 'Karyawan Swasta', skills: 'Renang, Survival Air', cert: 'Water Rescue Intermediate', bio: 'Anggota water rescue dengan sertifikasi intermediate. Berpengalaman dalam pencarian korban tenggelam.' },
    { name: 'Rizki Ramadhan', div: 'water-rescue', status: 'PENDING', join: null, village: 'Purwasari', phone: '081200012004', gender: 'LAKI_LAKI', edu: 'SMA/SMK', occ: 'Mahasiswa', skills: 'Renang', cert: '', bio: 'Mahasiswa yang baru mendaftar sebagai anggota. Memiliki minat di bidang water rescue.' },

    // Anggota divisi Vertical Rescue
    { name: 'Bayu Pangestu', div: 'vertical-rescue', status: 'ACTIVE', join: -1500, village: 'Limbangan', phone: '081200013001', gender: 'LAKI_LAKI', edu: 'SMA/SMK', occ: 'Pemandu Gunung', skills: 'Climbing, Vertical Rescue, Survival', cert: 'Vertical Rescue Level 2', bio: 'Pemandu gunung berpengalaman yang ahli vertical rescue. Sering melakukan evakuasi di tebing dan ketinggian.' },
    { name: 'Eko Saputra', div: 'vertical-rescue', status: 'ACTIVE', join: -1400, village: 'Pejaten', phone: '081200013002', gender: 'LAKI_LAKI', edu: 'D3', occ: 'Teknisi Tower', skills: 'Rope Access, Climbing, Tali-temali', cert: 'Rope Access Level 1, Vertical Rescue', bio: 'Teknisi tower yang ahli rope access. Mengaplikasikan keahliannya untuk vertical rescue di gedung dan struktur tinggi.' },
    { name: 'Joko Susilo', div: 'vertical-rescue', status: 'ACTIVE', join: -1300, village: 'Cikampek Kota', phone: '081200013003', gender: 'LAKI_LAKI', edu: 'SMA/SMK', occ: 'Wiraswasta', skills: 'Climbing, Tali-temali', cert: 'Vertical Rescue Level 1', bio: 'Anggota vertical rescue dengan sertifikasi level 1. Aktif dalam latihan dan operasi penyelamatan ketinggian.' },

    // Anggota divisi Evakuasi Medis
    { name: 'Dian Permatasari', div: 'evakuasi-medis', status: 'ACTIVE', join: -1450, village: 'Cikampek Selatan', phone: '081200014001', gender: 'PEREMPUAN', edu: 'S1', occ: 'Perawat', skills: 'P3K, BLS, Triage', cert: 'BLS Provider, EMT', bio: 'Perawat IGD yang ahli pertolongan pertama dan triage. Anggota evakuasi medis sejak 2021.' },
    { name: 'Fajar Nugroho', div: 'evakuasi-medis', status: 'ACTIVE', join: -1350, village: 'Dawuan', phone: '081200014002', gender: 'LAKI_LAKI', edu: 'D3', occ: 'Paramedis', skills: 'P3K, BLS, Ambulance', cert: 'Paramedic, BLS Instructor', bio: 'Paramedis ambulans darurat dengan sertifikasi BLS Instructor. Melatih anggota lain dalam pertolongan pertama.' },
    { name: 'Putri Lestari', div: 'evakuasi-medis', status: 'ACTIVE', join: -1250, village: 'Wanasari', phone: '081200014003', gender: 'PEREMPUAN', edu: 'S1', occ: 'Bidan', skills: 'P3K, BLS, KIA', cert: 'BLS Provider, Midwife', bio: 'Bidan yang juga tersertifikasi BLS. Menangani pertolongan pertama dan evakuasi medis korban.' },

    // Anggota divisi Logistik
    { name: 'Ari Wibowo', div: 'logistik', status: 'ACTIVE', join: -1200, village: 'Purwasari', phone: '081200015001', gender: 'LAKI_LAKI', edu: 'SMA/SMK', occ: 'Logistik', skills: 'Manajemen Logistik, Dapur Umum', cert: 'Logistik Bencana', bio: 'Ahli logistik yang mengelola perlengkapan operasi dan dapur umum saat bencana. Memastikan distribusi aid tepat sasaran.' },
    { name: 'Dimas Anggara', div: 'logistik', status: 'ACTIVE', join: -1100, village: 'Cikampek Kota', phone: '081200015002', gender: 'LAKI_LAKI', edu: 'D3', occ: 'Gudang', skills: 'Inventaris, Logistik', cert: '', bio: 'Mengelola inventaris dan gudang perlengkapan SAR. Memastikan ketersediaan alat saat operasi.' },

    // Anggota divisi Komunikasi Radio
    { name: 'Tono Saputro', div: 'komunikasi-radio', status: 'ACTIVE', join: -1150, village: 'Limbangan', phone: '081200016001', gender: 'LAKI_LAKI', edu: 'SMA/SMK', occ: 'Teknisi Elektronik', skills: 'Radio, HT, Elektronik', cert: 'ORARI Tingkat Dasar', bio: 'Teknisi elektronik yang menangani perawatan dan operasi radio HT. Anggota divisi komunikasi sejak 2021.' },
    { name: 'Indah Kusumawati', div: 'komunikasi-radio', status: 'ACTIVE', join: -1050, village: 'Wanasari', phone: '081200016002', gender: 'PEREMPUAN', edu: 'D3', occ: 'Operator', skills: 'Radio, Komunikasi, Disposisi', cert: 'ORARI Tingkat Dasar', bio: 'Operator radio yang mengkoordinasi komunikasi operasi SAR. Memastikan informasi mengalir lancar di lapangan.' },

    // Anggota divisi Drone SAR
    { name: 'Reza Pratama', div: 'drone-sar', status: 'ACTIVE', join: -1000, village: 'Cikampek Selatan', phone: '081200017001', gender: 'LAKI_LAKI', edu: 'S1', occ: 'IT', skills: 'Drone, Fotogrametri, GIS', cert: 'Drone Pilot Basic', bio: 'IT profesional yang mengoperasikan drone untuk pemetaan dan pencarian. Ahli analisis citra udara.' },
    { name: 'Aldi Rahman', div: 'drone-sar', status: 'ACTIVE', join: -900, village: 'Pejaten', phone: '081200017002', gender: 'LAKI_LAKI', edu: 'D3', occ: 'Fotografer', skills: 'Drone, Kamera, Editing', cert: 'Drone Pilot Basic', bio: 'Fotografer udara yang mengoperasikan drone untuk dokumentasi dan pencarian korban.' },

    // Anggota divisi Kesiapsiagaan Bencana
    { name: 'Sri Wahyuni', div: 'kesiapsiagaan-bencana', status: 'ACTIVE', join: -1100, village: 'Dawuan', phone: '081200018001', gender: 'PEREMPUAN', edu: 'S1', occ: 'Guru', skills: 'Edukasi, Mitigasi, Sosialisasi', cert: 'CBDRM', bio: 'Guru yang aktif mengedukasi siswa dan masyarakat tentang mitigasi bencana. Fasilitator CBDRM.' },
    { name: 'Bagus Santoso', div: 'kesiapsiagaan-bencana', status: 'ACTIVE', join: -950, village: 'Cikampek Kota', phone: '081200018002', gender: 'LAKI_LAKI', edu: 'S1', occ: 'Mahasiswa', skills: 'Sosialisasi, Dokumentasi', cert: 'DRR Basic', bio: 'Mahasiswa yang aktif dalam program edukasi bencana ke sekolah dan komunitas.' },

    // Anggota divisi Humas
    { name: 'Lina Marlina', div: 'humas-dokumentasi', status: 'ACTIVE', join: -850, village: 'Cikampek Selatan', phone: '081200019001', gender: 'PEREMPUAN', edu: 'S1', occ: 'Content Creator', skills: 'Sosmed, Dokumentasi, Editing', cert: '', bio: 'Content creator yang mengelola media sosial Katana Rescue. Mendokumentasikan setiap kegiatan organisasi.' },
    { name: 'Galih Permana', div: 'humas-dokumentasi', status: 'ACTIVE', join: -800, village: 'Purwasari', phone: '081200019002', gender: 'LAKI_LAKI', edu: 'SMA/SMK', occ: 'Videographer', skills: 'Video, Editing, Fotografi', cert: '', bio: 'Videographer yang mendokumentasikan operasi SAR dan kegiatan organisasi dalam bentuk video.' },

    // Anggota pending (pendaftar baru)
    { name: 'Sandi Pratama', div: 'water-rescue', status: 'PENDING', join: null, village: 'Dawuan', phone: '081200020001', gender: 'LAKI_LAKI', edu: 'SMA/SMK', occ: 'Karyawan', skills: 'Renang', cert: '', bio: 'Pendaftar baru yang tertarik dengan water rescue. Memiliki kemampuan renang dasar.' },
    { name: 'Vino Bastian', div: 'vertical-rescue', status: 'PENDING', join: null, village: 'Limbangan', phone: '081200020002', gender: 'LAKI_LAKI', edu: 'D3', occ: 'Karyawan', skills: 'Climbing', cert: '', bio: 'Pendaftar baru dengan minat di vertical rescue. Pernah mengikuti pelatihan climbing dasar.' },
    { name: 'Tari Lestari', div: 'evakuasi-medis', status: 'PENDING', join: null, village: 'Cikampek Kota', phone: '081200020003', gender: 'PEREMPUAN', edu: 'S1', occ: 'Mahasiswa Keperawatan', skills: 'P3K', cert: '', bio: 'Mahasiswa keperawatan yang ingin bergabung dengan divisi evakuasi medis.' },
    { name: 'Teguh Santoso', div: 'komunikasi-radio', status: 'PENDING', join: null, village: 'Wanasari', phone: '081200020004', gender: 'LAKI_LAKI', edu: 'SMA/SMK', occ: 'Teknisi', skills: 'Elektronik', cert: '', bio: 'Teknisi elektronik yang tertarik dengan divisi komunikasi radio.' },

    // Anggota inactive
    { name: 'Yusuf Maulana', div: 'water-rescue', status: 'INACTIVE', join: -2000, village: 'Cikampek Kota', phone: '081200030001', gender: 'LAKI_LAKI', edu: 'SMA/SMK', occ: 'Pindah Tugas', skills: 'Renang, Water Rescue', cert: 'Water Rescue Basic', bio: 'Anggota water rescue yang sedang nonaktif karena pindah tugas ke luar kota.' },
  ]

  const members: any[] = []
  for (let i = 0; i < memberData.length; i++) {
    const m = memberData[i] as any
    const memberNumber = `KR-${String(2018001 + i + 1).padStart(7, '0')}`
    const div = divisionMap[m.div]
    // Use pravatar for realistic photos
    const photo = `https://i.pravatar.cc/300?img=${(i % 70) + 1}`
    const certFile = m.cert ? `https://katanarescue.cikampek.id/certs/${slugify(m.name)}-sertifikat.pdf` : null

    const member = await prisma.member.create({
      data: {
        memberNumber,
        nik: `3215${String(Math.floor(Math.random() * 9999999999)).padStart(10, '0')}`,
        fullName: m.name,
        birthPlace: ['Karawang', 'Bandung', 'Jakarta', 'Bekasi', 'Subang'][i % 5],
        birthDate: new Date(1985 + (i % 20), i % 12, (i % 27) + 1),
        gender: m.gender,
        address: `Jl. ${['Merdeka', 'Sudirman', 'Gatot Subroto', 'Diponegoro', 'Ahmad Yani'][i % 5]} No.${i + 1}, RT 01 RW 02`,
        village: m.village,
        district: 'Cikampek',
        regency: 'Karawang',
        province: 'Jawa Barat',
        phone: m.phone,
        whatsapp: m.phone,
        email: `${m.name.toLowerCase().replace(/[^a-z]+/g, '.')}@gmail.com`,
        education: m.edu,
        occupation: m.occ,
        skills: m.skills,
        certifications: m.cert || null,
        bio: m.bio,
        photo,
        certFile,
        status: m.status,
        joinDate: m.join ? daysFromNow(m.join) : null,
        divisionId: div.id,
      },
    })
    members.push(member)
  }

  // ============ KEGIATAN (realistic) ============
  const activityImgs = ['/images/activity-flood.png', '/images/activity-training.png', '/images/activity-social.png']
  const activityData = [
    { title: 'Evakuasi Korban Banjir Bandang Cikampek Selatan', category: 'RESCUE', location: 'Cikampek Selatan', days: -3, div: 'water-rescue', desc: 'Tim Water Rescue mengevakuasi 45 warga yang terjebak banjir bandang setinggi 1.5 meter. Operasi berlangsung 6 jam dengan 3 perahu karet.' },
    { title: 'Pelatihan Vertical Rescue Tebing Limbangan', category: 'PELATIHAN', location: 'Tebing Limbangan', days: -10, div: 'vertical-rescue', desc: 'Pelatihan teknik evakuasi tebing diikuti 18 anggota divisi Vertical Rescue. Materi: rigging, haul system, dan patient packaging.' },
    { title: 'Bakti Sosial Donor Darah & Pengobatan Gratis', category: 'SOSIAL', location: 'Balai Desa Dawuan', days: -15, div: 'evakuasi-medis', desc: 'Kerjasama dengan PMI Cabang Karawang menggelar donor darah dan pengobatan gratis untuk 250 warga kurang mampu.' },
    { title: 'Simulasi Tanggap Bencana Gempa di SDN Cikampek 03', category: 'SIMULASI', location: 'SDN Cikampek 03', days: -20, div: 'kesiapsiagaan-bencana', desc: 'Simulasi gempa bumi di sekolah dasar melatih 350 siswa evakuasi mandiri. Latihan drop-cover-hold dan rute evakuasi aman.' },
    { title: 'Pencarian Korban Tenggelam di Waduk Bendingan', category: 'RESCUE', location: 'Waduk Bendingan', days: -28, div: 'water-rescue', desc: 'Operasi SAR pencarian korban tenggelam dengan tim Water Rescue dan Drone SAR. Korban ditemukan kedalaman 8 meter setelah 4 jam pencarian.' },
    { title: 'Pelatihan P3K dan Bantuan Hidup Dasar Anggota Baru', category: 'PELATIHAN', location: 'Markas Katana Rescue', days: -35, div: 'evakuasi-medis', desc: 'Materi pertolongan pertama dan CPR untuk 20 anggota. Sertifikasi BLS diberikan kepada yang lulus ujian praktik.' },
    { title: 'Penanganan Kebakaran Pasar Pejaten', category: 'BENCANA', location: 'Pasar Pejaten', days: -42, div: 'kesiapsiagaan-bencana', desc: 'Mendukung Damkar Karawang dalam penanganan kebakaran 15 kios pasar. Tim membantu evakuasi dan pengamanan area.' },
    { title: 'Distribusi Sembako Korban Banjir Purwasari', category: 'SOSIAL', location: 'Purwasari', days: -50, div: 'logistik', desc: 'Distribusi 200 paket sembako untuk warga terdampak banjir. Dibantu tim logistik dan dapur umum menyediakan 500 porsi makanan.' },
    { title: 'Patroli Siaga Bencana Musim Hujan Sungai Cikampek', category: 'BENCANA', location: 'Sungai Cikampek', days: -58, div: 'kesiapsiagaan-bencana', desc: 'Patroli rutin pemantauan debit air sungai selama musim hujan. Dipasang 5 titik monitoring dengan sistem peringatan dini.' },
    { title: 'Simulasi Evakuasi Massa Pabrik Kawasan Industri', category: 'SIMULASI', location: 'Kawasan Industri Cikampek', days: -65, div: 'vertical-rescue', desc: 'Latihan evakuasi 800 karyawan pabrik bersama tim tanggap darurat industri. Skenario kebakaran dan evakuasi via tangga darurat.' },
    { title: 'Workshop Drone untuk Pemetaan Area Bencana', category: 'PELATIHAN', location: 'Markas Katana Rescue', days: -72, div: 'drone-sar', desc: 'Pelatihan pengoperasian drone DJI Mavic 3 Enterprise untuk pemetaan area terdampak bencana. Dipraktikkan pemetaan 3D dan thermal imaging.' },
    { title: 'Evakuasi Korban Kecelakaan Jalan Raya Cikampek', category: 'RESCUE', location: 'Jl. Raya Cikampek KM 47', days: -80, div: 'evakuasi-medis', desc: 'Tim Evakuasi Medis mengevakuasi 3 korban tabrakan truk dan mobil. Pertolongan pertama di TKP lalu rujuk ke RS Cikampek.' },
    { title: 'Bakti Sosial Pembagian Daging Kurban Idul Adha', category: 'SOSIAL', location: '5 Desa Cikampek', days: -90, div: 'logistik', desc: 'Distribusi 400 paket daging kurban ke 400 kepala keluarga kurang mampu di 5 desa wilayah Cikampek.' },
    { title: 'Pelatihan Komunikasi Radio HT dan ORARI', category: 'PELATIHAN', location: 'Markas Katana Rescue', days: -98, div: 'komunikasi-radio', desc: 'Standardisasi penggunaan radio HT dan pelatihan ORARI tingkat dasar. 15 anggota mengikuti ujian lisensi radio amator.' },
    { title: 'Penanganan Longsor Ruas Jalan Dawuan-Cikampek', category: 'BENCANA', location: 'Dawuan', days: -105, div: 'kesiapsiagaan-bencana', desc: 'Bersama BPBD Karawang membersihkan material longsor 50m³ dan mengamankan titik rawan. Jalan dibuka setelah 6 jam.' },
    { title: 'Pencarian Pendaki Hilang di Gunung Sanggabuana', category: 'RESCUE', location: 'Gunung Sanggabuana', days: -118, div: 'vertical-rescue', desc: 'Operasi pencarian 2 pendaki hilang selama 3 hari. Tim Vertical Rescue dan Drone SAR bekerja sama. Korban ditemukan selamat.' },
    { title: 'Sosialisasi Mitigasi Bencana ke Warga Desa Wanasari', category: 'SOSIAL', location: 'Balai Desa Wanasari', days: -125, div: 'kesiapsiagaan-bencana', desc: 'Edukasi 200 warga tentang mitigasi banjir dan longsor musim hujan. Pembentukan tim siaga bencana desa.' },
    { title: 'Pelatihan Renang Penyelamatan Water Rescue', category: 'PELATIHAN', location: 'Kolam Renang Cikampek', days: -132, div: 'water-rescue', desc: 'Meningkatkan kemampuan renang penyelamatan anggota Water Rescue. Materi: rescue swim, tow, dan self-rescue.' },
    { title: 'Kerja Bakti Bersih Markas & Lingkungan', category: 'SOSIAL', location: 'Markas Katana Rescue', days: -140, div: 'humas-dokumentasi', desc: 'Kerja bakti membersihkan markas dan lingkungan sekitar bersama warga. Sekaligus perawatan perlengkapan SAR.' },
    { title: 'Gladi Resik HUT SAR Nasional ke-69', category: 'SIMULASI', location: 'Lapang Cikampek', days: -145, div: 'kesiapsiagaan-bencana', desc: 'Latihan gabungan dengan instansi SAR lain menyambut HUT SAR Nasional. Skenario multi-casualty incident.' },
  ]

  for (let i = 0; i < activityData.length; i++) {
    const a = activityData[i]
    await prisma.activity.create({
      data: {
        title: a.title,
        slug: slugify(a.title) + '-' + i,
        category: a.category,
        description: a.desc,
        content: a.desc + ' Kegiatan ini dilaksanakan oleh Tim SAR Katana Rescue sebagai bagian dari komitmen pelayanan masyarakat Kecamatan Cikampek. Tim bekerja profesional dengan koordinasi instansi terkait dan mitra kerja.',
        location: a.location,
        activityDate: daysFromNow(a.days),
        image: activityImgs[i % 3],
        divisionId: divisionMap[a.div].id,
      },
    })
  }

  // ============ BERITA (realistic) ============
  const newsData = [
    { title: 'Katana Rescue Sukses Evakuasi 45 Warga Korban Banjir Bandang Cikampek Selatan', category: 'BENCANA', excerpt: 'Tim Water Rescue Katana Rescue mengevakuasi 45 warga yang terjebak banjir bandang setinggi 1.5 meter di Cikampek Selatan.', author: 'Maya Sari', featured: true },
    { title: 'Pelatihan Vertical Rescue Tingkatkan Kompetensi 18 Anggota', category: 'ORGANISASI', excerpt: 'Sebanyak 18 anggota divisi Vertical Rescue mengikuti pelatihan teknik evakuasi ketinggian di tebing Limbangan.', author: 'Humas Katana Rescue', featured: true },
    { title: 'BASARNAS Apresiasi Kinerja Katana Rescue Cikampek dalam Operasi SAR', category: 'NASIONAL', excerpt: 'Kepala BASARNAS memberikan apresiasi atas kontribusi Katana Rescue dalam operasi pencarian pendaki hilang di Sanggabuana.', author: 'Humas Katana Rescue', featured: false },
    { title: 'Tips Mitigasi Bencana Banjir yang Wajib Diketahui Saat Musim Hujan', category: 'EDUKASI', excerpt: 'Kenali tanda-tanda awal banjir, siapkan tas siaga bencana, dan ketahui rute evakuasi menuju tempat aman terdekat.', author: 'Nur Hasanah', featured: false },
    { title: 'Katana Rescue Gelar Bakti Sosial Pengobatan Gratis untuk 250 Warga', category: 'DAERAH', excerpt: '250 warga Dawuan mendapatkan layanan pengobatan gratis dan donor darah dalam bakti sosial bersama PMI Karawang.', author: 'Maya Sari', featured: false },
    { title: 'Teknologi Drone SAR Perluas Jangkauan Pencarian Korban di Area Sulit', category: 'ORGANISASI', excerpt: 'Penggunaan drone DJI Mavic 3 Enterprise dengan thermal imaging mempercepat pencarian korban di area hutan dan malam hari.', author: 'Yoga Pratama', featured: true },
    { title: 'Simulasi Tanggap Bencana Gempa Melatih 350 Siswa SDN Cikampek 03', category: 'DAERAH', excerpt: '350 siswa SDN Cikampek 03 mengikuti simulasi evakuasi gempa bersama Katana Rescue. Latihan drop-cover-hold dan rute evakuasi.', author: 'Maya Sari', featured: false },
    { title: 'BPBD Karawang dan Katana Rescue Perkuat Kemitraan Penanggulangan Bencana', category: 'DAERAH', excerpt: 'Penandatanganan MoU penguatan kemitraan penanggulangan bencana Kabupaten Karawang. Patroli bersama dan data sharing.', author: 'Humas Katana Rescue', featured: false },
    { title: 'Panduan Pertolongan Pertama Pada Kecelakaan untuk Relawan SAR', category: 'EDUKASI', excerpt: 'Pelajari langkah-langkah P3K dasar: hentikan pendarahan, cek pernapasan, stabilkan leher, dan panggil ambulans.', author: 'Dedi Kurniawan', featured: false },
    { title: 'Katana Rescue Rayakan HUT ke-7 dengan Rangkaian Kegiatan Kemanusiaan', category: 'ORGANISASI', excerpt: 'Serangkaian kegiatan bakti sosial, pelatihan, dan gladi resik menyambut HUT ke-7 Katana Rescue Cikampek.', author: 'Humas Katana Rescue', featured: false },
  ]

  for (let i = 0; i < newsData.length; i++) {
    const n = newsData[i]
    await prisma.news.create({
      data: {
        title: n.title,
        slug: slugify(n.title) + '-' + i,
        category: n.category,
        excerpt: n.excerpt,
        content: n.excerpt + '\n\n' + 'Katana Rescue merupakan tim SAR dan relawan kemanusiaan yang berkomitmen memberikan pelayanan pencarian, pertolongan, evakuasi, serta penanggulangan bencana di wilayah Kecamatan Cikampek dan sekitarnya. Kegiatan ini bagian dari program penguatan kapasitas dan pelayanan masyarakat. Tim bekerja sama dengan BPBD, PMI, BASARNAS, TNI, POLRI, dan pemerintah daerah dalam sistem penanggulangan bencana terpadu.',
        thumbnail: activityImgs[i % 3],
        author: n.author,
        featured: n.featured,
        published: true,
        views: Math.floor(Math.random() * 800) + 100,
        publishedAt: daysFromNow(-i * 4 - 1),
      },
    })
  }

  // ============ AGENDA ============
  const agendaData = [
    { title: 'Pelatihan Water Rescue Tingkat Lanjut', category: 'PELATIHAN', location: 'Waduk Bendingan', days: 5, daysEnd: 7, desc: 'Pelatihan teknik penyelamatan di air arus deras untuk 15 anggota divisi Water Rescue. Materi: swift water rescue dan rope rescue di air.' },
    { title: 'Simulasi Tanggap Bencana Longsor', category: 'SIMULASI', location: 'Limbangan', days: 10, daysEnd: 10, desc: 'Simulasi penanganan bencana tanah longsor bersama BPBD Karawang. Latihan pencarian korban dengan detector dan evakuasi.' },
    { title: 'Bakti Sosial Pengobatan Gratis & Donor Darah', category: 'BAKTI_SOSIAL', location: 'Balai Desa Wanasari', days: 14, daysEnd: 14, desc: 'Layanan kesehatan gratis untuk 300 warga kurang mampu. Kerjasama dengan Puskesmas dan PMI Cabang Karawang.' },
    { title: 'Rapat Koordinasi Bulanan Pengurus', category: 'RAPAT', location: 'Markas Katana Rescue', days: 18, daysEnd: 18, desc: 'Evaluasi program Oktober dan perencanaan kegiatan November. Pembahasan anggaran dan laporan divisi.' },
    { title: 'Pelatihan P3K dan Sertifikasi BLS', category: 'PELATIHAN', location: 'Markas Katana Rescue', days: 22, daysEnd: 23, desc: 'Sertifikasi Basic Life Support untuk seluruh anggota aktif. Instruktur dari EMT dan paramedis tersertifikasi.' },
    { title: 'Simulasi Evakuasi Korban Kecelakaan Industri', category: 'SIMULASI', location: 'Kawasan Industri Cikampek', days: 26, daysEnd: 26, desc: 'Latihan gabungan dengan tim tanggap darurat industri. Skenario kecelakaan kimia dan evakuasi massal.' },
    { title: 'Bakti Sosial Distribusi Sembako 250 Paket', category: 'BAKTI_SOSIAL', location: 'Desa Purwasari', days: 30, daysEnd: 30, desc: 'Distribusi 250 paket sembako untuk warga kurang mampu menjelang musim hujan. Dibantu tim logistik.' },
    { title: 'Rapat Persiapan Siaga Musim Banjir', category: 'RAPAT', location: 'Markas Katana Rescue', days: 35, daysEnd: 35, desc: 'Koordinasi kesiapsiagaan menghadapi musim hujan. Pengecekan perlengkapan, posko siaga, dan jadwal patroli.' },
    { title: 'Pelatihan Drone Pemetaan Bencana Tingkat Lanjut', category: 'PELATIHAN', location: 'Lapang Cikampek', days: 40, daysEnd: 41, desc: 'Pelatihan pengoperasian drone DJI Mavic 3 Enterprise untuk divisi Drone SAR. Praktik fotogrametri dan thermal imaging.' },
    { title: 'Simulasi Pencarian Korban Hilang di Hutan Sanggabuana', category: 'SIMULASI', location: 'Gunung Sanggabuana', days: 45, daysEnd: 46, desc: 'Latihan pencarian korban hilang di medan hutan dan pegunungan. Gabungan Vertical Rescue, Drone SAR, dan K-9.' },
  ]

  for (let i = 0; i < agendaData.length; i++) {
    const a = agendaData[i]
    await prisma.agenda.create({
      data: {
        title: a.title,
        slug: slugify(a.title) + '-' + i,
        category: a.category,
        description: a.desc,
        location: a.location,
        startDate: daysFromNow(a.days),
        endDate: a.daysEnd !== a.days ? daysFromNow(a.daysEnd) : null,
        status: 'UPCOMING',
      },
    })
  }

  // ============ TESTIMONI ============
  const testimonials = [
    { name: 'H. Sukirno', role: 'Kepala Desa Dawuan', org: 'Desa Dawuan', avatar: 'https://i.pravatar.cc/300?img=12', message: 'Katana Rescue sangat membantu saat banjir tahun lalu. Evakuasi cepat dan profesional. Tim datang dalam 30 menit setelah kami hubungi. Terima kasih atas dedikasinya.', rating: 5, order: 1 },
    { name: 'Drs. Ahmad Fauzi, M.Si', role: 'Camat', org: 'Kecamatan Cikampek', avatar: 'https://i.pravatar.cc/300?img=15', message: 'Kemitraan dengan Katana Rescue memperkuat sistem penanggulangan bencana di wilayah kita. Sangat tanggap, terkoordinasi, dan profesional. Harvest bagi pemerintah kecamatan.', rating: 5, order: 2 },
    { name: 'Sri Mulyani', role: 'Warga Terdampak', org: 'Cikampek Selatan', avatar: 'https://i.pravatar.cc/300?img=32', message: 'Saya dan 3 anak saya dievakuasi tim Katana Rescue saat rumah kami kebanjiran malam hari. Mereka sabar, cepat, dan sangat membantu. Semoga berbalas budi.', rating: 5, order: 3 },
    { name: 'dr. Bayu Anggara', role: 'Dokter', org: 'Puskesmas Cikampek 1', avatar: 'https://i.pravatar.cc/300?img=18', message: 'Kerjasama dalam bakti sosial pengobatan gratis berjalan lancar. Tim Katana Rescue sangat terorganisir dan membantu penanganan pasien. Lanjutkan kemitraan.', rating: 5, order: 4 },
    { name: 'Budi Santoso, S.Pd', role: 'Kepala Sekolah', org: 'SDN Cikampek 03', avatar: 'https://i.pravatar.cc/300?img=56', message: 'Simulasi tanggap bencana sangat edukatif untuk siswa. Anak-anak jadi paham cara evakuasi yang benar saat gempa. Terima kasih Katana Rescue.', rating: 5, order: 5 },
    { name: 'Ir. Hendra Wijaya', role: 'Kepala BPBD', org: 'Badan Penanggulangan Bencana Daerah Karawang', avatar: 'https://i.pravatar.cc/300?img=60', message: 'Katana Rescue adalah mitra strategis dalam penanganan bencana di Kabupaten Karawang. Profesional, siaga 24 jam, dan selalu siap membantu. Apresiasi setinggi-tingginya.', rating: 5, order: 6 },
  ]

  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t })
  }

  // ============ MITRA ============
  const partners = [
    { name: 'BPBD Karawang', type: 'BPBD', website: 'https://karawangkab.go.id', order: 1 },
    { name: 'PMI Cabang Karawang', type: 'PMI', website: 'https://pmi.or.id', order: 2 },
    { name: 'BASARNAS', type: 'BASARNAS', website: 'https://basarnas.go.id', order: 3 },
    { name: 'TNI Angkatan Darat', type: 'TNI', website: 'https://tni.mil.id', order: 4 },
    { name: 'POLRES Karawang', type: 'POLRI', website: 'https://polri.go.id', order: 5 },
    { name: 'Pemerintah Desa Cikampek Kota', type: 'PEMERINTAH', website: '#', order: 6 },
    { name: 'Pemerintah Kecamatan Cikampek', type: 'PEMERINTAH', website: '#', order: 7 },
    { name: 'Damkar Karawang', type: 'PEMERINTAH', website: '#', order: 8 },
  ]

  for (const p of partners) {
    await prisma.partner.create({ data: p })
  }

  // ============ POSISI ASSIGNMENTS (jabatan ke member aktif) ============
  // Map yang dipakai untuk sample seed
  const assign = async (title: string, memberName: string, ended: boolean = false) => {
    const pos = positionMap[title]
    if (!pos) return
    const mem = members.find((m) => m.fullName === memberName)
    if (!mem) return

    await prisma.positionAssignment.create({
      data: {
        positionId: pos.id,
        memberId: mem.id,
        isActive: !ended,
        endedAt: ended ? new Date() : null,
      },
    })
  }

  // Ketua Umum -> Andi Pratama (ACTIVE)
  await assign('Ketua Umum', 'Andi Pratama')
  await assign('Wakil Ketua', 'Rudi Hartono')
  await assign('Sekretaris', 'Dedi Kurniawan')
  await assign('Bendahara', 'Siti Rahmawati')
  await assign('Penasihat', 'Bambang Sutrisno')
  await assign('Koordinator Operasional', 'Yoga Pratama')
  await assign('Koordinator Keuangan', 'Maya Sari')
  await assign('Koordinator Dokumentasi & Humas', 'Nur Hasanah')

  // ============ MISI SAR ===========
  const missions = [
    { name: 'Evakuasi Banjir Bandang Cikampek Selatan', type: 'BENCANA', location: 'Cikampek Selatan, Karawang', status: 'SELESAI', coordinator: 'Andi Pratama', start: -3, end: -2, desc: 'Evakuasi 45 warga terdampak banjir bandang. 3 perahu karet dikerahkan, operasi 6 jam.' },
    { name: 'Pencarian Korban Tenggelam Waduk Bendingan', type: 'PENCARIAN', location: 'Waduk Bendingan', status: 'SELESAI', coordinator: 'Hendra Gunawan', start: -28, end: -28, desc: 'Pencarian korban tenggelam kedalaman 8m. Drone + tim water rescue. Korban ditemukan 4 jam.' },
    { name: 'Pencarian Pendaki Hilang Gunung Sanggabuana', type: 'PENCARIAN', location: 'Gunung Sanggabuana', status: 'SELESAI', coordinator: 'Rudi Hartono', start: -118, end: -116, desc: 'Pencarian 2 pendaki hilang 3 hari. Gabungan Vertical Rescue + Drone SAR. Korban selamat.' },
    { name: 'Patroli Siaga Banjir Musim Hujan 2026', type: 'EVAKUASI', location: 'Sungai Cikampek', status: 'BERJALAN', coordinator: 'Nur Hasanah', start: -58, end: 60, desc: 'Patroli rutin pemantauan debit air sungai. 5 titik monitoring dengan sistem peringatan dini.' },
    { name: 'Siaga Longsor Dawuan-Cikampek', type: 'BENCANA', location: 'Dawuan', status: 'SIAGA', coordinator: 'Bambang Sutrisno', start: 0, desc: 'Kesiapsiagaan titik rawan longsor di ruas Dawuan-Cikampek. Monitoring tanah dan tebing.' },
    { name: 'Evakuasi Korban Kecelakaan Jalan Raya', type: 'MEDIS', location: 'Jl. Raya Cikampek KM 47', status: 'SELESAI', coordinator: 'Dedi Kurniawan', start: -80, end: -80, desc: 'Evakuasi 3 korban tabrakan truk-mobil. P3K di TKP, rujuk ke RS Cikampek.' },
  ]

  for (const m of missions) {
    const mission = await prisma.mission.create({
      data: {
        name: m.name,
        type: m.type,
        location: m.location,
        status: m.status,
        coordinator: m.coordinator,
        startDate: daysFromNow(m.start),
        endDate: m.end !== undefined ? daysFromNow(m.end) : null,
        description: m.desc,
      },
    })
    // add members
    const teamSize = Math.min(5, members.length)
    for (let i = 0; i < teamSize; i++) {
      const mem = members[(m.name.length + i) % members.length]
      await prisma.missionMember.create({
        data: {
          missionId: mission.id,
          memberId: mem.id,
          role: i === 0 ? 'KOORDINATOR' : 'PERSONEL',
          status: m.status === 'BERJALAN' ? 'BERTUGAS' : 'SIAGA',
        },
      })
    }
    await prisma.operationLog.create({ data: { missionId: mission.id, note: 'Tim tiba di lokasi dan mulai asesmen situasi.', author: m.coordinator } })
    await prisma.operationLog.create({ data: { missionId: mission.id, note: 'Operasi dimulai dengan 2 tim personel.', author: m.coordinator } })
    if (m.status === 'SELESAI') {
      await prisma.operationLog.create({ data: { missionId: mission.id, note: 'Operasi selesai. Semua korban dievakuasi dengan aman.', author: m.coordinator } })
    }
  }

  // ============ INVENTARIS ============
  const inventory = [
    { name: 'Perahu Karet Rescue 1 (Zodiac)', category: 'PERAHU', serial: 'PRH-001-2020', quantity: 1, available: 1, condition: 'BAIK', location: 'Gudang Markas' },
    { name: 'Perahu Karet Rescue 2 (Zodiac)', category: 'PERAHU', serial: 'PRH-002-2021', quantity: 1, available: 1, condition: 'BAIK', location: 'Gudang Markas' },
    { name: 'Motor Tempel Perahu 15 HP', category: 'PERAHU', serial: 'MT-001-2020', quantity: 2, available: 2, condition: 'BAIK', location: 'Gudang Markas' },
    { name: 'Tandu Lipat Standar SAR', category: 'TANDU', serial: 'TND-001', quantity: 8, available: 6, condition: 'BAIK', location: 'Gudang Markas' },
    { name: 'Tandu Basket Spine Board', category: 'TANDU', serial: 'TND-002', quantity: 4, available: 4, condition: 'BAIK', location: 'Ambulans' },
    { name: 'HT Baofeng UV-5R', category: 'HT', serial: 'HT-BF-001', quantity: 20, available: 18, condition: 'BAIK', location: 'Gudang Komunikasi' },
    { name: 'HT Yaesu FT-60R', category: 'HT', serial: 'HT-YS-001', quantity: 5, available: 4, condition: 'BAIK', location: 'Gudang Komunikasi' },
    { name: 'Repeater Radio VHF', category: 'HT', serial: 'RP-001-2022', quantity: 1, available: 1, condition: 'BAIK', location: 'Markas Tower' },
    { name: 'DJI Mavic 3 Enterprise', category: 'DRONE', serial: 'DR-M3E-001', quantity: 2, available: 2, condition: 'BAIK', location: 'Gudang Drone' },
    { name: 'DJI Mavic 3 Thermal', category: 'DRONE', serial: 'DR-M3T-001', quantity: 1, available: 1, condition: 'BAIK', location: 'Gudang Drone' },
    { name: 'Pelampung Rescue Type II', category: 'APD', serial: 'PLP-001', quantity: 30, available: 25, condition: 'BAIK', location: 'Gudang APD' },
    { name: 'Helm Safety SAR', category: 'APD', serial: 'HLM-001', quantity: 40, available: 35, condition: 'BAIK', location: 'Gudang APD' },
    { name: 'Sepatu Boot Safety', category: 'APD', serial: 'SPT-001', quantity: 35, available: 28, condition: 'BAIK', location: 'Gudang APD' },
    { name: 'Tali Dinamis 11mm x 50m', category: 'APD', serial: 'TL-D-001', quantity: 10, available: 9, condition: 'BAIK', location: 'Gudang Vertical' },
    { name: 'Harness Full Body', category: 'APD', serial: 'HRN-001', quantity: 15, available: 13, condition: 'BAIK', location: 'Gudang Vertical' },
    { name: 'Ambulance Katana 01 (Toyota Hiace)', category: 'KENDARAAN', serial: 'AMB-001-2019', quantity: 1, available: 1, condition: 'BAIK', location: 'Garasi Markas' },
    { name: 'Mobil Rescue Double Cabin (Toyota Hilux)', category: 'KENDARAAN', serial: 'MBL-001-2021', quantity: 1, available: 1, condition: 'BAIK', location: 'Garasi Markas' },
    { name: 'Motor Trail Rescue', category: 'KENDARAAN', serial: 'MTR-001-2022', quantity: 2, available: 2, condition: 'BAIK', location: 'Garasi Markas' },
  ]

  for (const inv of inventory) {
    await prisma.inventory.create({ data: inv })
  }

  // ============ DATA BENCANA ============
  const disasters = [
    { type: 'BANJIR', location: 'Cikampek Selatan', severity: 'SEDANG', affected: 245, status: 'TERKENDALI', date: -3, notes: 'Banjir bandang setinggi 1.5m. 45 warga dievakuasi. Penyebab: hujan ekstrem 3 hari berturut.' },
    { type: 'BANJIR', location: 'Purwasari', severity: 'RINGAN', affected: 80, status: 'SELESAI', date: -50, notes: 'Banjir genangan setinggi 0.5m. 200 paket sembako didistribusikan.' },
    { type: 'LONGSOR', location: 'Dawuan-Cikampek KM 45', severity: 'SEDANG', affected: 15, status: 'TERKENDALI', date: -105, notes: 'Longsor material 50m³ menutup jalan. Dibersihkan 6 jam bersama BPBD.' },
    { type: 'KEBAKARAN', location: 'Pasar Pejaten', severity: 'BERAT', affected: 30, status: 'SELESAI', date: -42, notes: 'Kebakaran 15 kios. Damkar Karawang menangani, Katana Rescue bantu evakuasi.' },
    { type: 'ANGIN_KENCANG', location: 'Limbangan', severity: 'RINGAN', affected: 12, status: 'SELESAI', date: -70, notes: 'Angin puting beliung merusak 8 rumah. Tim assesmen kerusakan dikerahkan.' },
    { type: 'BANJIR', location: 'Dawuan', severity: 'RINGAN', affected: 50, status: 'SELESAI', date: -130, notes: 'Banjir genangan jalanan. Tidak ada korban jiwa.' },
  ]

  for (const d of disasters) {
    await prisma.disasterData.create({
      data: {
        type: d.type,
        location: d.location,
        severity: d.severity,
        affected: d.affected,
        status: d.status,
        date: daysFromNow(d.date),
        notes: d.notes,
      },
    })
  }

  // ============ DONASI ============
  const donations = [
    { donorName: 'PT Maju Bersama Sejahtera', donorEmail: 'csr@majubersama.co.id', amount: 5000000, message: 'Donasi untuk operasional SAR dan bakti sosial. Semoga bermanfaat.', method: 'TRANSFER', status: 'VERIFIED' },
    { donorName: 'CV Karya Mandiri', donorEmail: 'admin@karyamandiri.com', amount: 3000000, message: 'Dukungan untuk tim rescue.', method: 'TRANSFER', status: 'VERIFIED' },
    { donorName: 'Hamba Allah', amount: 500000, message: 'Untuk bakti sosial sembako.', method: 'TRANSFER', status: 'VERIFIED' },
    { donorName: 'Toko Sumber Rejeki', amount: 2000000, method: 'TRANSFER', status: 'VERIFIED' },
    { donorName: 'Sri Wahyuni', donorEmail: 'sri.w@gmail.com', amount: 250000, message: 'Semoga berbalas budi.', method: 'EWALLET', status: 'VERIFIED' },
    { donorName: 'Budi Hartono', amount: 150000, method: 'EWALLET', status: 'PENDING' },
    { donorName: 'PT Bumi Konstruksi', donorEmail: 'finance@bumikonstruksi.co.id', amount: 10000000, message: 'CSR untuk penanggulangan bencana musim hujan.', method: 'TRANSFER', status: 'PENDING' },
  ]

  for (const d of donations) {
    await prisma.donation.create({ data: { ...d, createdAt: daysFromNow(-Math.floor(Math.random() * 30)) } })
  }

  // ============ PESAN KONTAK ============
  const contacts = [
    { name: 'Pak Joko Susilo', email: 'joko.susilo@gmail.com', phone: '081310001111', subject: 'Tanya pendaftaran anggota', message: 'Halo, saya ingin bertanya tentang prosedur pendaftaran anggota Katana Rescue. Apakah ada syarat usia maksimal? Saya berusia 35 tahun, apakah masih bisa mendaftar?', status: 'BARU' },
    { name: 'Bu Rina Astuti', email: 'rina.astuti@yahoo.com', phone: '081310002222', subject: 'Undiran kerjasama bakti sosial', message: 'Selamat siang, saya mewakili PKK Desa Wanasari ingin mengajak kerjasama untuk bakti sosial pengobatan gratis di desa kami. Mohon informasi prosedurnya.', status: 'BARU' },
    { name: 'PT Sumber Makmur', email: 'contact@sumbermakmur.co.id', phone: '021-5550111', subject: 'Penawaran donasi korporat', message: 'Kami dari PT Sumber Makmur ingin menawarkan donasi rutin bulanan untuk Katana Rescue. Mohon jadwal meeting untuk diskusi lebih lanjut.', status: 'DIBACA' },
  ]

  for (const c of contacts) {
    await prisma.contactMessage.create({ data: c })
  }

  // ============ LAPORAN KEJADIAN ============
  const incidents = [
    { type: 'BANJIR', reporterName: 'Warga Cikampek Selatan', reporterPhone: '081320001111', location: 'RT 03 RW 05 Cikampek Selatan', description: 'Banjir mulai genangi rumah warga setinggi 30cm dan terus naik. Sekitar 15 rumah terdampak.', status: 'DITINDAKLANJUTI' },
    { type: 'ORANG_HILANG', reporterName: 'Keluarga Korban', reporterPhone: '081320002222', location: 'Kawasan Hutan Sanggabuana', description: 'Pendaki laki-laki usia 28 tahun hilang sejak kemarin sore. Terakhir dikontak di pos 2.', status: 'SELESAI' },
    { type: 'KECELAKAAN', reporterName: 'Saksi Mata', reporterPhone: '081320003333', location: 'Jl. Raya Cikampek KM 47', description: 'Tabrakan truk tangki dan mobil sedan. 3 korban luka, jalan macet total.', status: 'SELESAI' },
    { type: 'BANJIR', reporterName: 'Warga Dawuan', reporterPhone: '081320004444', location: 'Dawuan Timur', description: 'Sungai meluap menggenangi jalan utama. Tinggi air 40cm.', status: 'BARU' },
  ]

  for (const inc of incidents) {
    await prisma.incidentReport.create({ data: inc })
  }

  // ============ SITE SETTINGS ============
  const settings = [
    { key: 'site_name', value: 'KATANA RESCUE' },
    { key: 'site_tagline', value: 'Siaga. Tanggap. Menyelamatkan.' },
    { key: 'site_description', value: 'Portal Resmi Tim SAR dan Relawan Penanggulangan Bencana Kecamatan Cikampek' },
    { key: 'address', value: 'Jl. Raya Cikampek No. 1, Cikampek Kota, Kecamatan Cikampek, Kabupaten Karawang, Jawa Barat 41373' },
    { key: 'phone', value: '+62 838-4540-8400' },
    { key: 'email', value: 'info@katanarescue.cikampek.id' },
    { key: 'whatsapp', value: '+62 838-4540-8400' },
    { key: 'emergency_hotline', value: '+62 838-4540-8400' },
    { key: 'instagram', value: 'https://instagram.com/katanarescue' },
    { key: 'facebook', value: 'https://facebook.com/katanarescue' },
    { key: 'youtube', value: 'https://youtube.com/@katanarescue' },
    { key: 'maps_lat', value: '-6.4217' },
    { key: 'maps_lng', value: '107.4606' },
    { key: 'maps_embed', value: 'https://www.openstreetmap.org/export/embed.html?bbox=107.4456%2C-6.4317%2C107.4756%2C-6.4117&layer=mapnik&marker=-6.4217%2C107.4606' },
  ]

  for (const s of settings) {
    await prisma.siteSetting.create({ data: s })
  }

  console.log('✅ Seed data realistis selesai!')
  console.log(`   - ${users.length} users (4 role)`)
  console.log(`   - ${divisions.length} divisi`)
  console.log(`   - ${memberData.length} anggota (dengan foto, bio, sertifikat)`)
  console.log(`   - ${activityData.length} kegiatan`)
  console.log(`   - ${newsData.length} berita`)
  console.log(`   - ${agendaData.length} agenda`)
  console.log(`   - ${testimonials.length} testimoni`)
  console.log(`   - ${partners.length} mitra`)
  console.log(`   - ${missions.length} misi SAR`)

  console.log(`   - ${inventory.length} inventaris`)
  console.log(`   - ${disasters.length} data bencana`)
  console.log(`   - ${donations.length} donasi`)
  console.log(`   - ${contacts.length} pesan kontak`)
  console.log(`   - ${incidents.length} laporan kejadian`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
