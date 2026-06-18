import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function daysFromNow(days: number) {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d
}

async function main() {
  console.log('🌱 Seeding KATANA RESCUE database...')

  // Clean
  await prisma.contactMessage.deleteMany()
  await prisma.donation.deleteMany()
  await prisma.disasterData.deleteMany()
  await prisma.loan.deleteMany()
  await prisma.inventory.deleteMany()
  await prisma.incidentReport.deleteMany()
  await prisma.operationLog.deleteMany()
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

  // ============ DIVISIONS ============
  const divisions = [
    { name: 'Water Rescue', slug: 'water-rescue', icon: 'Waves', color: 'cyan', description: 'Tim penanganan pencarian dan pertolongan korban di perairan, banjir, dan tenggelam.', coordinator: 'Andi Pratama', order: 1 },
    { name: 'Vertical Rescue', slug: 'vertical-rescue', icon: 'Mountain', color: 'amber', description: 'Tim penyelamatan ketinggian, tebing, gedung, dan jurang dengan teknik tali.', coordinator: 'Rudi Hartono', order: 2 },
    { name: 'Evakuasi Medis', slug: 'evakuasi-medis', icon: 'Ambulance', color: 'red', description: 'Tim evakuasi medis dan pertolongan pertama korban kecelakaan.', coordinator: 'Dedi Kurniawan', order: 3 },
    { name: 'Logistik', slug: 'logistik', icon: 'Package', color: 'orange', description: 'Tim pendukung distribusi perlengkapan, dapur umum, dan pengadaan logistik bencana.', coordinator: 'Siti Rahmawati', order: 4 },
    { name: 'Komunikasi dan Radio', slug: 'komunikasi-radio', icon: 'Radio', color: 'blue', description: 'Tim jaringan komunikasi radio HT dan koordinasi informasi lapangan.', coordinator: 'Bambang Sutrisno', order: 5 },
    { name: 'Drone SAR', slug: 'drone-sar', icon: 'Plane', color: 'purple', description: 'Tim pemetaan udara dan pencarian korban dengan teknologi drone.', coordinator: 'Yoga Pratama', order: 6 },
    { name: 'Kesiapsiagaan Bencana', slug: 'kesiapsiagaan-bencana', icon: 'ShieldAlert', color: 'green', description: 'Tim mitigasi, simulasi, dan kesiapsiagaan tanggap bencana wilayah.', coordinator: 'Nur Hasanah', order: 7 },
    { name: 'Humas dan Dokumentasi', slug: 'humas-dokumentasi', icon: 'Camera', color: 'pink', description: 'Tim hubungan masyarakat, publikasi, dan dokumentasi kegiatan SAR.', coordinator: 'Maya Sari', order: 8 },
  ]

  const divisionMap: Record<string, any> = {}
  for (const d of divisions) {
    divisionMap[d.slug] = await prisma.division.create({ data: d })
  }

  // ============ USERS ============
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@katanarescue.cikampek.id',
      passwordHash: '$2a$10$placeholderhashadmin',
      name: 'Administrator',
      role: 'SUPER_ADMIN',
      isActive: true,
    },
  })

  // ============ MEMBERS (50) ============
  const firstNames = ['Andi', 'Rudi', 'Dedi', 'Bambang', 'Yoga', 'Nur', 'Maya', 'Sari', 'Hendra', 'Agus', 'Wawan', 'Dian', 'Fajar', 'Rizki', 'Bayu', 'Eko', 'Joko', 'Tono', 'Ari', 'Dimas', 'Rina', 'Dewi', 'Lina', 'Putri', 'Indah', 'Sri', 'Wati', 'Yuni', 'Tari', 'Nisa', 'Bagus', 'Galih', 'Reza', 'Aldi', 'Rian', 'Sandi', 'Vino', 'Teguh', 'Yusuf', 'Imam', 'Lukman', 'Farid', 'Hamzah', 'Iqbal', 'Rahmat', 'Surya', 'Taufik', 'Umar', 'Vicky', 'Zaki']
  const lastNames = ['Pratama', 'Hartono', 'Kurniawan', 'Sutrisno', 'Saputra', 'Wijaya', 'Nugroho', 'Hidayat', 'Maulana', 'Permana', 'Santoso', 'Anggara', 'Ramadhan', 'Firmansyah', 'Setiawan', 'Pranata', 'Siregar', 'Halim', 'Utama', 'Gunawan']
  const villages = ['Cikampek Kota', 'Cikampek Selatan', 'Dawuan', 'Kuta Winangun', 'Limbangan', 'Pejaten', 'Purwasari', 'Rangkasbitung', 'Tambun', 'Wanasari']

  const memberStatuses = ['ACTIVE', 'ACTIVE', 'ACTIVE', 'ACTIVE', 'ACTIVE', 'ACTIVE', 'ACTIVE', 'ACTIVE', 'ACTIVE', 'ACTIVE', 'PENDING', 'PENDING', 'PENDING', 'INACTIVE', 'ACTIVE']
  const divisionSlugs = Object.keys(divisionMap)

  const members: any[] = []
  for (let i = 0; i < 50; i++) {
    const fn = firstNames[i % firstNames.length]
    const ln = lastNames[(i * 3) % lastNames.length]
    const fullName = `${fn} ${ln}`
    const memberNumber = `KR-${String(2024000 + i + 1).padStart(7, '0')}`
    const div = divisionMap[divisionSlugs[i % divisionSlugs.length]]
    const status = memberStatuses[i % memberStatuses.length]
    const gender = i % 3 === 0 ? 'PEREMPUAN' : 'LAKI_LAKI'

    const m = await prisma.member.create({
      data: {
        memberNumber,
        nik: `3215${String(Math.floor(Math.random() * 9999999999)).padStart(10, '0')}`,
        fullName,
        birthPlace: 'Karawang',
        birthDate: new Date(1985 + (i % 20), i % 12, (i % 27) + 1),
        gender,
        address: `Jl. Merdeka No.${i + 1}`,
        village: villages[i % villages.length],
        district: 'Cikampek',
        regency: 'Karawang',
        province: 'Jawa Barat',
        phone: `0812${String(Math.floor(Math.random() * 99999999)).padStart(8, '0')}`,
        whatsapp: `0812${String(Math.floor(Math.random() * 99999999)).padStart(8, '0')}`,
        email: `${fn.toLowerCase()}.${ln.toLowerCase()}@gmail.com`,
        education: ['SMA/SMK', 'D3', 'S1', 'SMA/SMK', 'D3'][i % 5],
        occupation: ['Swasta', 'Wiraswasta', 'PNS', 'Petani', 'Guru'][i % 5],
        skills: ['Tali-temali', 'P3K', 'Renang', 'Radio'][i % 4],
        status,
        joinDate: status === 'ACTIVE' ? daysFromNow(-(100 + i * 5)) : null,
        divisionId: div.id,
      },
    })
    members.push(m)
  }

  // Pengurus utama
  const pengurus = [
    { name: 'Andi Pratama', role: 'Ketua Umum', division: 'water-rescue' },
    { name: 'Rudi Hartono', role: 'Wakil Ketua', division: 'vertical-rescue' },
    { name: 'Dedi Kurniawan', role: 'Sekretaris', division: 'evakuasi-medis' },
    { name: 'Siti Rahmawati', role: 'Bendahara', division: 'logistik' },
  ]

  // ============ ACTIVITIES (20) ============
  const activityData = [
    { title: 'Evakuasi Korban Banjir Cikampek Selatan', category: 'RESCUE', location: 'Cikampek Selatan', days: -5, img: '/images/activity-flood.png', desc: 'Tim Water Rescue melakukan evakuasi 45 warga yang terjebak banjir dengan perahu karet.' },
    { title: 'Pelatihan Vertical Rescue Tebing Limbangan', category: 'PELATIHAN', location: 'Limbangan', days: -12, img: '/images/activity-training.png', desc: 'Pelatihan teknik evakuasi tebing diikuti 25 anggota divisi Vertical Rescue.' },
    { title: 'Bakti Sosial donor darah & pengobatan gratis', category: 'SOSIAL', location: 'Balai Desa Dawuan', days: -18, img: '/images/activity-social.png', desc: 'Kerjasama dengan PMI menggelar donor darah dan pengobatan gratis untuk 200 warga.' },
    { title: 'Simulasi Tanggap Bencana Gempa', category: 'SIMULASI', location: 'SDN Cikampek 03', days: -25, img: '/images/activity-training.png', desc: 'Simulasi gempa bumi di sekolah dasar melatih 300 siswa evakuasi mandiri.' },
    { title: 'Pencarian Korban Tenggelam Waduk', category: 'RESCUE', location: 'Waduk Bendingan', days: -30, img: '/images/activity-flood.png', desc: 'Operasi SAR pencarian korban tenggelam dengan tim Water Rescue dan Drone SAR.' },
    { title: 'Pelatihan P3K Dasar Anggota Baru', category: 'PELATIHAN', location: 'Markas Katana Rescue', days: -38, img: '/images/activity-training.png', desc: 'Materi pertolongan pertama untuk 15 calon anggota baru organisasi.' },
    { title: 'Penanggulangan Kebakaran Pasar Pejaten', category: 'BENCANA', location: 'Pasar Pejaten', days: -45, img: '/images/activity-flood.png', desc: 'Mendukung pemadam kebakaran dalam penanganan kebakaran pasar tradisional.' },
    { title: 'Distribusi Sembako Korban Banjir', category: 'SOSIAL', location: 'Purwasari', days: -52, img: '/images/activity-social.png', desc: 'Distribusi 150 paket sembako untuk warga terdampak banjir bandang.' },
    { title: 'Patroli Siaga Bencana Musim Hujan', category: 'BENCANA', location: 'Sungai Cikampek', days: -60, img: '/images/activity-training.png', desc: 'Patroli rutin pemantauan debit air sungai selama musim hujan.' },
    { title: 'Simulasi Evakuasi Massa Pabrik', category: 'SIMULASI', location: 'Kawasan Industri Cikampek', days: -68, img: '/images/activity-training.png', desc: 'Latihan evakuasi 500 karyawan pabrik bersama tim tanggap darurat.' },
    { title: 'Workshop Drone untuk Pemetaan Bencana', category: 'PELATIHAN', location: 'Markas Katana Rescue', days: -75, img: '/images/activity-training.png', desc: 'Pelatihan pengoperasian drone untuk pemetaan area terdampak bencana.' },
    { title: 'Evakuasi Korban Kecelakaan Jalan', category: 'RESCUE', location: 'Jl. Raya Cikampek', days: -82, img: '/images/activity-flood.png', desc: 'Tim Evakuasi Medis mengevakuasi 3 korban tabrakan truk dan mobil.' },
    { title: 'Bakti Sosial Cuci Kurban Idul Adha', category: 'SOSIAL', location: '5 Desa Cikampek', days: -90, img: '/images/activity-social.png', desc: 'Distribusi daging kurban ke 300 kepala keluarga kurang mampu.' },
    { title: 'Pelatihan Komunikasi Radio HT', category: 'PELATIHAN', location: 'Markas Katana Rescue', days: -98, img: '/images/activity-training.png', desc: 'Standardisasi penggunaan radio HT untuk komunikasi operasi SAR.' },
    { title: 'Penanganan Longsor Ruas Jalan Dawuan', category: 'BENCANA', location: 'Dawuan', days: -105, img: '/images/activity-flood.png', desc: 'Bersama BPBD membersihkan material longsor dan mengamankan titik rawan.' },
    { title: 'Gladi Resik HUT SAR Nasional', category: 'SIMULASI', location: 'Lapang Cikampek', days: -112, img: '/images/activity-training.png', desc: 'Latihan gabungan dengan instansi SAR lain menyambut HUT SAR Nasional.' },
    { title: 'Pencarian Pendaki Hilang Gunung', category: 'RESCUE', location: 'Gunung Sanggabuana', days: -120, img: '/images/activity-training.png', desc: 'Operasi pencarian 2 pendaki hilang selama 3 hari di kawasan Sanggabuana.' },
    { title: 'Sosialisasi Mitigasi Bencana ke Warga', category: 'SOSIAL', location: 'Balai Desa Wanasari', days: -128, img: '/images/activity-social.png', desc: 'Edukasi 150 warga tentang mitigasi banjir dan longsor musim hujan.' },
    { title: 'Pelatihan Renang Penyelamatan', category: 'PELATIHAN', location: 'Kolam Renang Cikampek', days: -135, img: '/images/activity-training.png', desc: 'Meningkatkan kemampuan renang penyelamatan anggota Water Rescue.' },
    { title: 'Kerja Bakti Bersih Markas & Lingkungan', category: 'SOSIAL', location: 'Markas Katana Rescue', days: -140, img: '/images/activity-social.png', desc: 'Kerja bakti membersihkan markas dan lingkungan sekitar bersama warga.' },
  ]

  const activityImgs = ['/images/activity-flood.png', '/images/activity-training.png', '/images/activity-social.png']
  for (let i = 0; i < activityData.length; i++) {
    const a = activityData[i]
    await prisma.activity.create({
      data: {
        title: a.title,
        slug: slugify(a.title) + '-' + i,
        category: a.category,
        description: a.desc,
        content: a.desc + ' Kegiatan ini dilaksanakan oleh Tim SAR Katana Rescue sebagai bagian dari komitmen pelayanan masyarakat Kecamatan Cikampek.',
        location: a.location,
        activityDate: daysFromNow(a.days),
        image: a.img || activityImgs[i % 3],
        divisionId: divisionMap[divisionSlugs[i % divisionSlugs.length]].id,
      },
    })
  }

  // ============ NEWS (10) ============
  const newsData = [
    { title: 'Katana Rescue Sukses Evakuasi 45 Warga Korban Banjir Cikampek', category: 'BENCANA', excerpt: 'Tim Water Rescue Katana Rescue mengevakuasi 45 warga yang terjebak banjir di Cikampek Selatan.', author: 'Humas Katana Rescue', featured: true },
    { title: 'Pelatihan Vertical Rescue Tingkatkan Kompetensi Anggota', category: 'ORGANISASI', excerpt: 'Sebanyak 25 anggota divisi Vertical Rescue mengikuti pelatihan teknik evakuasi ketinggian.', author: 'Dedi Kurniawan', featured: true },
    { title: 'BASARNAS Apresiasi Kinerja Katana Rescue Cikampek', category: 'NASIONAL', excerpt: 'BASARNAS memberikan apresiasi atas kontribusi Katana Rescue dalam operasi SAR wilayah.', author: 'Humas Katana Rescue', featured: false },
    { title: 'Tips Mitigasi Bencana Banjir Musim Hujan', category: 'EDUKASI', excerpt: 'Kenali tanda-tanda awal banjir dan langkah-langkah keselamatan yang harus dilakukan.', author: 'Nur Hasanah', featured: false },
    { title: 'Katana Rescue Gelar Bakti Sosial Pengobatan Gratis', category: 'DAERAH', excerpt: '200 warga Dawuan mendapatkan layanan pengobatan gratis dan donor darah.', author: 'Maya Sari', featured: false },
    { title: 'Drone SAR Katana Rescue Perluas Jangkauan Pencarian', category: 'ORGANISASI', excerpt: 'Penggunaan teknologi drone mempercepat pencarian korban di area sulit dijangkau.', author: 'Yoga Pratama', featured: true },
    { title: 'Simulasi Tanggap Bencana Gempa di SDN Cikampek', category: 'DAERAH', excerpt: '300 siswa SDN Cikampek 03 mengikuti simulasi evakuasi gempa bersama Katana Rescue.', author: 'Maya Sari', featured: false },
    { title: 'Kerjasama BPBD Karawang dengan Katana Rescue Diperkuat', category: 'DAERAH', excerpt: 'Penandatanganan MoU penguatan kemitraan penanggulangan bencana Kabupaten Karawang.', author: 'Humas Katana Rescue', featured: false },
    { title: 'Panduan Pertolongan Pertama Pada Kecelakaan', category: 'EDUKASI', excerpt: 'Pelajari langkah-langkah P3K dasar yang wajib diketahui setiap relawan SAR.', author: 'Dedi Kurniawan', featured: false },
    { title: 'Katana Rescue Rayakan HUT ke-7 dengan Rangkaian Kegiatan', category: 'ORGANISASI', excerpt: 'Serangkaian kegiatan bakti sosial dan gladi resik menyambut HUT ke-7 organisasi.', author: 'Humas Katana Rescue', featured: false },
  ]

  for (let i = 0; i < newsData.length; i++) {
    const n = newsData[i]
    await prisma.news.create({
      data: {
        title: n.title,
        slug: slugify(n.title) + '-' + i,
        category: n.category,
        excerpt: n.excerpt,
        content: n.excerpt + '\n\n' + 'Katana Rescue merupakan tim SAR dan relawan kemanusiaan yang berkomitmen memberikan pelayanan pencarian, pertolongan, evakuasi, serta penanggulangan bencana di wilayah Kecamatan Cikampek dan sekitarnya. Kegiatan ini bagian dari program penguatan kapasitas dan pelayanan masyarakat.',
        thumbnail: ['/images/activity-flood.png', '/images/activity-training.png', '/images/activity-social.png'][i % 3],
        author: n.author,
        featured: n.featured,
        published: true,
        views: Math.floor(Math.random() * 500) + 50,
        publishedAt: daysFromNow(-i * 3 - 1),
      },
    })
  }

  // ============ AGENDA (10) ============
  const agendaData = [
    { title: 'Pelatihan Water Rescue Tingkat Lanjut', category: 'PELATIHAN', location: 'Waduk Bendingan', days: 5, daysEnd: 5, desc: 'Pelatihan teknik penyelamatan di air untuk anggota divisi Water Rescue.' },
    { title: 'Simulasi Tanggap Bencana Longsor', category: 'SIMULASI', location: 'Limbangan', days: 8, daysEnd: 8, desc: 'Simulasi penanganan bencana tanah longsor bersama BPBD Karawang.' },
    { title: 'Bakti Sosial Pengobatan Gratis & Donor Darah', category: 'BAKTI_SOSIAL', location: 'Balai Desa Wanasari', days: 12, daysEnd: 12, desc: 'Layanan kesehatan gratis untuk masyarakat kurang mampu.' },
    { title: 'Rapat Koordinasi Bulanan Pengurus', category: 'RAPAT', location: 'Markas Katana Rescue', days: 15, daysEnd: 15, desc: 'Evaluasi program dan perencanaan kegiatan bulan depan.' },
    { title: 'Pelatihan P3K dan Bantuan Hidup Dasar', category: 'PELATIHAN', location: 'Markas Katana Rescue', days: 18, daysEnd: 19, desc: 'Sertifikasi P3K untuk seluruh anggota aktif.' },
    { title: 'Simulasi Evakuasi Korban Kecelakaan Industri', category: 'SIMULASI', location: 'Kawasan Industri Cikampek', days: 22, daysEnd: 22, desc: 'Latihan gabungan dengan tim tanggap darurat industri.' },
    { title: 'Bakti Sosial Distribusi Sembako', category: 'BAKTI_SOSIAL', location: 'Desa Purwasari', days: 26, daysEnd: 26, desc: 'Distribusi 200 paket sembako untuk warga kurang mampu.' },
    { title: 'Rapat Persiapan Musim Banjir', category: 'RAPAT', location: 'Markas Katana Rescue', days: 30, daysEnd: 30, desc: 'Koordinasi kesiapsiagaan menghadapi musim hujan.' },
    { title: 'Pelatihan Drone untuk Pemetaan Bencana', category: 'PELATIHAN', location: 'Lapang Cikampek', days: 35, daysEnd: 36, desc: 'Pelatihan pengoperasian drone pemetaan untuk divisi Drone SAR.' },
    { title: 'Simulasi Pencarian Korban Hilang', category: 'SIMULASI', location: 'Gunung Sanggabuana', days: 40, daysEnd: 41, desc: 'Latihan pencarian korban hilang di medan hutan dan pegunungan.' },
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

  // ============ TESTIMONIALS ============
  const testimonials = [
    { name: 'H. Sukirno', role: 'Kepala Desa', org: 'Desa Dawuan', message: 'Katana Rescue sangat membantu saat banjir tahun lalu. Evakuasi cepat dan profesional. Terima kasih atas dedikasinya.', rating: 5, order: 1 },
    { name: 'Drs. Ahmad Fauzi', role: 'Camat', org: 'Kecamatan Cikampek', message: 'Kemitraan dengan Katana Rescue memperkuat sistem penanggulangan bencana di wilayah kita. Sangat tanggap dan terkoordinasi.', rating: 5, order: 2 },
    { name: 'Sri Mulyani', role: 'Warga', org: 'Cikampek Selatan', message: 'Saya dan keluarga dievakuasi tim Katana Rescue saat rumah kami kebanjiran. Mereka sabar dan sangat membantu.', rating: 5, order: 3 },
    { name: 'dr. Bayu Anggara', role: 'Dokter', org: 'Puskesmas Cikampek', message: 'Kerjasama dalam bakti sosial pengobatan gratis berjalan lancar. Tim Katana Rescue sangat terorganisir.', rating: 5, order: 4 },
    { name: 'Budi Santoso', role: 'Kepala Sekolah', org: 'SDN Cikampek 03', message: 'Simulasi tanggap bencana sangat edukatif untuk siswa. Anak-anak jadi paham cara evakuasi yang benar.', rating: 5, order: 5 },
    { name: 'BPBD Karawang', role: 'Instansi Mitra', org: 'Badan Penanggulangan Bencana Daerah', message: 'Katana Rescue adalah mitra strategis dalam penanganan bencana di Kabupaten Karawang. Profesional dan siaga 24 jam.', rating: 5, order: 6 },
  ]

  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t })
  }

  // ============ PARTNERS ============
  const partners = [
    { name: 'BPBD Karawang', type: 'BPBD', website: '#', order: 1 },
    { name: 'PMI Cabang Karawang', type: 'PMI', website: '#', order: 2 },
    { name: 'BASARNAS', type: 'BASARNAS', website: '#', order: 3 },
    { name: 'TNI AD', type: 'TNI', website: '#', order: 4 },
    { name: 'POLRES Karawang', type: 'POLRI', website: '#', order: 5 },
    { name: 'Pemerintah Desa Cikampek', type: 'PEMERINTAH', website: '#', order: 6 },
    { name: 'Pemerintah Kecamatan Cikampek', type: 'PEMERINTAH', website: '#', order: 7 },
    { name: 'Damkar Karawang', type: 'PEMERINTAH', website: '#', order: 8 },
  ]

  for (const p of partners) {
    await prisma.partner.create({ data: p })
  }

  // ============ MISSIONS (SAR Operations) ============
  const missions = [
    { name: 'Evakuasi Banjir Cikampek Selatan', type: 'BENCANA', location: 'Cikampek Selatan', status: 'SELESAI', coordinator: 'Andi Pratama', start: -5, end: -4, desc: 'Evakuasi warga terdampak banjir bandang.' },
    { name: 'Pencarian Korban Tenggelam Waduk', type: 'PENCARIAN', location: 'Waduk Bendingan', status: 'SELESAI', coordinator: 'Yoga Pratama', start: -30, end: -29, desc: 'Pencarian korban tenggelam di waduk.' },
    { name: 'Pencarian Pendaki Hilang Sanggabuana', type: 'PENCARIAN', location: 'Gunung Sanggabuana', status: 'SELESAI', coordinator: 'Rudi Hartono', start: -120, end: -118, desc: 'Pencarian 2 pendaki hilang selama 3 hari.' },
    { name: 'Patroli Siaga Banjir Musim Hujan', type: 'EVAKUASI', location: 'Sungai Cikampek', status: 'BERJALAN', coordinator: 'Nur Hasanah', start: -60, end: 30, desc: 'Patroli rutin pemantauan debit air sungai.' },
    { name: 'Siaga Bencana Longsor Dawuan', type: 'BENCANA', location: 'Dawuan', status: 'SIAGA', coordinator: 'Bambang Sutrisno', start: 0, desc: 'Kesiapsiagaan titik rawan longsor.' },
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
        endDate: m.end ? daysFromNow(m.end) : null,
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
    // operation logs
    await prisma.operationLog.create({ data: { missionId: mission.id, note: 'Tim tiba di lokasi dan mulai asesmen situasi.', author: m.coordinator } })
    await prisma.operationLog.create({ data: { missionId: mission.id, note: 'Operasi pencarian dimulai dengan 2 tim personel.', author: m.coordinator } })
    if (m.status === 'SELESAI') {
      await prisma.operationLog.create({ data: { missionId: mission.id, note: 'Operasi selesai. Korban dievakuasi dengan aman.', author: m.coordinator } })
    }
  }

  // ============ INVENTORY ============
  const inventory = [
    { name: 'Perahu Karet Rescue 1', category: 'PERAHU', quantity: 1, available: 1, condition: 'BAIK' },
    { name: 'Perahu Karet Rescue 2', category: 'PERAHU', quantity: 1, available: 1, condition: 'BAIK' },
    { name: 'Tandu Lipat Standar', category: 'TANDU', quantity: 8, available: 6, condition: 'BAIK' },
    { name: 'HT Baofeng UV-5R', category: 'HT', quantity: 20, available: 18, condition: 'BAIK' },
    { name: 'HT Yaesu FT-60R', category: 'HT', quantity: 5, available: 4, condition: 'BAIK' },
    { name: 'DJI Mavic 3 Enterprise', category: 'DRONE', quantity: 2, available: 2, condition: 'BAIK' },
    { name: 'Pelampung Rescue', category: 'APD', quantity: 30, available: 25, condition: 'BAIK' },
    { name: 'Helm Safety', category: 'APD', quantity: 40, available: 35, condition: 'BAIK' },
    { name: 'Ambulance Katana 01', category: 'KENDARAAN', quantity: 1, available: 1, condition: 'BAIK' },
    { name: 'Mobil Rescue Double Cabin', category: 'KENDARAAN', quantity: 1, available: 1, condition: 'BAIK' },
    { name: 'Sepatu Boot Safety', category: 'APD', quantity: 35, available: 28, condition: 'BAIK' },
    { name: 'Tali Dinamis 50m', category: 'APD', quantity: 10, available: 9, condition: 'BAIK' },
  ]

  for (const inv of inventory) {
    await prisma.inventory.create({ data: inv })
  }

  // ============ DISASTER DATA ============
  const disasters = [
    { type: 'BANJIR', location: 'Cikampek Selatan', severity: 'SEDANG', affected: 245, status: 'TERKENDALI', date: -5 },
    { type: 'BANJIR', location: 'Purwasari', severity: 'RINGAN', affected: 80, status: 'SELESAI', date: -52 },
    { type: 'LONGSOR', location: 'Dawuan', severity: 'SEDANG', affected: 15, status: 'TERKENDALI', date: -105 },
    { type: 'KEBAKARAN', location: 'Pasar Pejaten', severity: 'BERAT', affected: 30, status: 'SELESAI', date: -45 },
    { type: 'ANGIN_KENCANG', location: 'Limbangan', severity: 'RINGAN', affected: 12, status: 'SELESAI', date: -70 },
    { type: 'BANJIR', location: 'Dawuan', severity: 'RINGAN', affected: 50, status: 'SELESAI', date: -130 },
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
        notes: `Penanganan bencana ${d.type.toLowerCase()} di ${d.location}.`,
      },
    })
  }

  // ============ DONATIONS ============
  const donations = [
    { donorName: 'PT Maju Bersama', donorEmail: 'contact@majubersama.co.id', amount: 5000000, message: 'Semoga bermanfaat untuk operasional SAR.', method: 'TRANSFER', status: 'VERIFIED' },
    { donorName: 'Hamba Allah', amount: 500000, message: 'Untuk bakti sosial.', method: 'TRANSFER', status: 'VERIFIED' },
    { donorName: 'Toko Sumber Rejeki', amount: 2000000, method: 'TRANSFER', status: 'VERIFIED' },
    { donorName: 'Budi', amount: 100000, method: 'EWALLET', status: 'PENDING' },
    { donorName: 'CV Karya Mandiri', amount: 3000000, method: 'TRANSFER', status: 'VERIFIED' },
    { donorName: 'Sri Wahyuni', amount: 250000, method: 'EWALLET', status: 'VERIFIED' },
  ]

  for (const d of donations) {
    await prisma.donation.create({ data: { ...d, createdAt: daysFromNow(-Math.floor(Math.random() * 30)) } })
  }

  // ============ INCIDENT REPORTS ============
  const incidents = [
    { type: 'BANJIR', reporterName: 'Warga', reporterPhone: '0812xxx', location: 'Cikampek Selatan', description: 'Banjir mulai genangi rumah warga.', status: 'DITINDAKLANJUTI' },
    { type: 'ORANG_HILANG', reporterName: 'Keluarga', reporterPhone: '0813xxx', location: 'Sanggabuana', description: 'Pendaki hilang sejak kemarin.', status: 'SELESAI' },
    { type: 'KEBAKARAN', reporterName: 'Warga', reporterPhone: '0814xxx', location: 'Pasar Pejaten', description: 'Kebakaran di kios pasar.', status: 'SELESAI' },
    { type: 'KECELAKAAN', reporterName: 'Petugas', location: 'Jl Raya Cikampek', description: 'Tabrakan truk dan mobil.', status: 'SELESAI' },
  ]

  for (const inc of incidents) {
    await prisma.incidentReport.create({ data: inc })
  }

  // ============ SITE SETTINGS ============
  const settings = [
    { key: 'site_name', value: 'KATANA RESCUE' },
    { key: 'site_tagline', value: 'Siaga. Tanggap. Menyelamatkan.' },
    { key: 'site_description', value: 'Portal Resmi Tim SAR dan Relawan Penanggulangan Bencana Kecamatan Cikampek' },
    { key: 'address', value: 'Jl. Raya Cikampek No. 1, Cikampek, Karawang, Jawa Barat 41373' },
    { key: 'phone', value: '+62 812-3456-7890' },
    { key: 'email', value: 'info@katanarescue.cikampek.id' },
    { key: 'whatsapp', value: '+62 812-3456-7890' },
    { key: 'instagram', value: 'https://instagram.com/katanarescue' },
    { key: 'facebook', value: 'https://facebook.com/katanarescue' },
    { key: 'youtube', value: 'https://youtube.com/@katanarescue' },
    { key: 'maps_lat', value: '-6.4217' },
    { key: 'maps_lng', value: '107.4606' },
  ]

  for (const s of settings) {
    await prisma.siteSetting.create({ data: s })
  }

  console.log('✅ Seed complete!')
  console.log(`   - ${divisions.length} divisions`)
  console.log(`   - ${members.length} members`)
  console.log(`   - ${activityData.length} activities`)
  console.log(`   - ${newsData.length} news`)
  console.log(`   - ${agendaData.length} agenda`)
  console.log(`   - ${testimonials.length} testimonials`)
  console.log(`   - ${partners.length} partners`)
  console.log(`   - ${missions.length} missions`)
  console.log(`   - ${inventory.length} inventory items`)
  console.log(`   - ${disasters.length} disaster records`)
  console.log(`   - Admin login: admin@katanarescue.cikampek.id`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
