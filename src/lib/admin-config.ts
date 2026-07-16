export interface FieldConfig {
  name: string
  label: string
  type: 'text' | 'textarea' | 'number' | 'date' | 'select' | 'boolean' | 'file' | 'image'
  options?: { value: string; label: string }[]
  required?: boolean
  placeholder?: string
  full?: boolean // span full width
}

export interface SectionConfig {
  title: string
  singular: string
  fields: FieldConfig[]
  listColumns: { key: string; label: string }[]
  searchFields?: string[]
  roles: string[]
  canCreate?: string[]
  canEdit?: string[]
  canDelete?: string[]
}

export const ALL_ADMIN_ROLES = ['SUPER_ADMIN', 'ADMIN', 'PENGURUS', 'KOORDINATOR_DIVISI']
export const FULL_ACCESS_ROLES = ['SUPER_ADMIN', 'ADMIN']
export const SETTINGS_ROLES = ['SUPER_ADMIN', 'ADMIN']

const R = {
  all: ['SUPER_ADMIN', 'ADMIN', 'PENGURUS', 'KOORDINATOR_DIVISI'],
  full: ['SUPER_ADMIN', 'ADMIN'],
  fullPengurus: ['SUPER_ADMIN', 'ADMIN', 'PENGURUS'],
  koorOnly: ['KOORDINATOR_DIVISI'],
}

export const adminSections: Record<string, SectionConfig> = {
  members: {
    title: 'Anggota',
    singular: 'Anggota',
    searchFields: ['fullName', 'memberNumber', 'email', 'phone'],
    listColumns: [
      { key: 'photo', label: 'Foto' },
      { key: 'memberNumber', label: 'No. Anggota' },
      { key: 'fullName', label: 'Nama' },
      { key: 'phone', label: 'HP' },
      { key: 'division', label: 'Divisi' },
      { key: 'status', label: 'Status' },
    ],
    roles: R.all,
    canCreate: R.full,
    canEdit: R.all,
    canDelete: R.full,
    fields: [
      { name: 'photo', label: 'Foto Anggota', type: 'file', placeholder: 'Pilih file foto anggota (Upload)' },
      { name: 'fullName', label: 'Nama Lengkap', type: 'text', required: true },
      { name: 'memberNumber', label: 'Nomor Anggota', type: 'text', required: true },
      { name: 'nik', label: 'NIK', type: 'text' },
      { name: 'phone', label: 'Nomor HP', type: 'text' },
      { name: 'whatsapp', label: 'WhatsApp', type: 'text' },
      { name: 'email', label: 'Email', type: 'text' },
      {
        name: 'gender', label: 'Jenis Kelamin', type: 'select', options: [
          { value: 'LAKI_LAKI', label: 'Laki-laki' },
          { value: 'PEREMPUAN', label: 'Perempuan' },
        ]
      },
      { name: 'birthPlace', label: 'Tempat Lahir', type: 'text' },
      { name: 'birthDate', label: 'Tanggal Lahir', type: 'date' },
      { name: 'address', label: 'Alamat', type: 'textarea' },
      { name: 'village', label: 'Desa', type: 'text' },
      { name: 'education', label: 'Pendidikan', type: 'text' },
      { name: 'occupation', label: 'Pekerjaan', type: 'text' },
      { name: 'skills', label: 'Keahlian', type: 'text', placeholder: 'Renang, P3K, Tali-temali' },
      { name: 'bio', label: 'Bio / Profil Singkat', type: 'textarea', full: true, placeholder: 'Deskripsi singkat tentang anggota' },
      { name: 'certifications', label: 'Sertifikasi', type: 'text', placeholder: 'BNSP SAR, P3K, dll' },
      { name: 'certFile', label: 'File Sertifikat', type: 'file', placeholder: 'URL file sertifikat (PDF)' },
      {
        name: 'status', label: 'Status', type: 'select', required: true, options: [
          { value: 'PENDING', label: 'Pending' },
          { value: 'ACTIVE', label: 'Aktif' },
          { value: 'INACTIVE', label: 'Tidak Aktif' },
          { value: 'REJECTED', label: 'Ditolak' },
        ]
      },
      { name: 'joinDate', label: 'Tanggal Gabung', type: 'date' },
    ],
  },
  news: {
    title: 'Berita',
    singular: 'Berita',
    searchFields: ['title', 'author'],
    listColumns: [
      { key: 'thumbnail', label: 'Gambar' },
      { key: 'title', label: 'Judul' },
      { key: 'category', label: 'Kategori' },
      { key: 'author', label: 'Penulis' },
      { key: 'publishedAt', label: 'Tanggal' },
    ],
    roles: R.fullPengurus,
    canCreate: R.fullPengurus,
    canEdit: R.fullPengurus,
    canDelete: R.full,
    fields: [
      { name: 'title', label: 'Judul', type: 'text', required: true },
      {
        name: 'category', label: 'Kategori', type: 'select', required: true, options: [
          { value: 'ORGANISASI', label: 'Organisasi' },
          { value: 'BENCANA', label: 'Bencana' },
          { value: 'NASIONAL', label: 'Nasional' },
          { value: 'DAERAH', label: 'Daerah' },
          { value: 'EDUKASI', label: 'Edukasi' },
        ]
      },
      { name: 'excerpt', label: 'Ringkasan', type: 'textarea' },
      { name: 'content', label: 'Konten', type: 'textarea' },
      { name: 'thumbnail', label: 'Thumbnail', type: 'file', placeholder: 'Pilih file gambar (Upload)' },
      { name: 'author', label: 'Penulis', type: 'text' },
      { name: 'featured', label: 'Featured', type: 'boolean' },
      { name: 'published', label: 'Publish', type: 'boolean' },
    ],
  },
  activities: {
    title: 'Kegiatan',
    singular: 'Kegiatan',
    searchFields: ['title', 'location'],
    listColumns: [
      { key: 'image', label: 'Gambar' },
      { key: 'title', label: 'Judul' },
      { key: 'category', label: 'Kategori' },
      { key: 'location', label: 'Lokasi' },
      { key: 'activityDate', label: 'Tanggal' },
    ],
    roles: R.all,
    canCreate: R.fullPengurus,
    canEdit: R.all,
    canDelete: R.full,
    fields: [
      { name: 'title', label: 'Judul', type: 'text', required: true },
      {
        name: 'category', label: 'Kategori', type: 'select', required: true, options: [
          { value: 'RESCUE', label: 'Rescue' },
          { value: 'SOSIAL', label: 'Sosial' },
          { value: 'PELATIHAN', label: 'Pelatihan' },
          { value: 'SIMULASI', label: 'Simulasi' },
          { value: 'BENCANA', label: 'Bencana' },
        ]
      },
      { name: 'description', label: 'Deskripsi', type: 'textarea' },
      { name: 'content', label: 'Konten', type: 'textarea' },
      { name: 'location', label: 'Lokasi', type: 'text' },
      { name: 'activityDate', label: 'Tanggal Kegiatan', type: 'date', required: true },
      { name: 'image', label: 'Gambar (Upload)', type: 'file' },
    ],
  },
  agenda: {
    title: 'Agenda',
    singular: 'Agenda',
    searchFields: ['title', 'location'],
    listColumns: [
      { key: 'title', label: 'Judul' },
      { key: 'category', label: 'Kategori' },
      { key: 'startDate', label: 'Mulai' },
      { key: 'status', label: 'Status' },
    ],
    roles: R.fullPengurus,
    canCreate: R.fullPengurus,
    canEdit: R.fullPengurus,
    canDelete: R.full,
    fields: [
      { name: 'title', label: 'Judul', type: 'text', required: true },
      {
        name: 'category', label: 'Kategori', type: 'select', required: true, options: [
          { value: 'PELATIHAN', label: 'Pelatihan' },
          { value: 'SIMULASI', label: 'Simulasi' },
          { value: 'BAKTI_SOSIAL', label: 'Bakti Sosial' },
          { value: 'RAPAT', label: 'Rapat' },
        ]
      },
      { name: 'description', label: 'Deskripsi', type: 'textarea' },
      { name: 'location', label: 'Lokasi', type: 'text' },
      { name: 'startDate', label: 'Tanggal Mulai', type: 'date', required: true },
      { name: 'endDate', label: 'Tanggal Selesai', type: 'date' },
      {
        name: 'status', label: 'Status', type: 'select', options: [
          { value: 'UPCOMING', label: 'Mendatang' },
          { value: 'ONGOING', label: 'Berlangsung' },
          { value: 'DONE', label: 'Selesai' },
          { value: 'CANCELLED', label: 'Dibatalkan' },
        ]
      },
    ],
  },
  missions: {
    title: 'Misi SAR',
    singular: 'Misi SAR',
    searchFields: ['name', 'location', 'coordinator'],
    listColumns: [
      { key: 'name', label: 'Nama Misi' },
      { key: 'type', label: 'Jenis' },
      { key: 'status', label: 'Status' },
      { key: 'startDate', label: 'Mulai' },
    ],
    roles: R.all,
    canCreate: R.fullPengurus,
    canEdit: R.all,
    canDelete: R.full,
    fields: [
      { name: 'name', label: 'Nama Misi', type: 'text', required: true },
      {
        name: 'type', label: 'Jenis', type: 'select', required: true, options: [
          { value: 'PENCARIAN', label: 'Pencarian' },
          { value: 'EVAKUASI', label: 'Evakuasi' },
          { value: 'BENCANA', label: 'Bencana' },
          { value: 'MEDIS', label: 'Medis' },
        ]
      },
      { name: 'location', label: 'Lokasi', type: 'text' },
      {
        name: 'status', label: 'Status', type: 'select', options: [
          { value: 'SIAGA', label: 'Siaga' },
          { value: 'BERJALAN', label: 'Berjalan' },
          { value: 'SELESAI', label: 'Selesai' },
          { value: 'DIBATALKAN', label: 'Dibatalkan' },
        ]
      },
      { name: 'coordinator', label: 'Koordinator', type: 'text' },
      { name: 'startDate', label: 'Tanggal Mulai', type: 'date', required: true },
      { name: 'endDate', label: 'Tanggal Selesai', type: 'date' },
      { name: 'description', label: 'Deskripsi', type: 'textarea' },
    ],
  },
  inventory: {
    title: 'Inventaris',
    singular: 'Inventaris',
    searchFields: ['name', 'serial'],
    listColumns: [
      { key: 'image', label: 'Gambar' },
      { key: 'name', label: 'Nama' },
      { key: 'category', label: 'Kategori' },
      { key: 'quantity', label: 'Jumlah' },
      { key: 'condition', label: 'Kondisi' },
    ],
    roles: R.fullPengurus,
    canCreate: R.full,
    canEdit: R.fullPengurus,
    canDelete: R.full,
    fields: [
      { name: 'name', label: 'Nama Peralatan', type: 'text', required: true },
      {
        name: 'category', label: 'Kategori', type: 'select', required: true, options: [
          { value: 'PERAHU', label: 'Perahu' },
          { value: 'TANDU', label: 'Tandu' },
          { value: 'HT', label: 'HT' },
          { value: 'DRONE', label: 'Drone' },
          { value: 'APD', label: 'APD' },
          { value: 'KENDARAAN', label: 'Kendaraan' },
        ]
      },
      { name: 'serial', label: 'Serial Number', type: 'text' },
      {
        name: 'condition', label: 'Kondisi', type: 'select', options: [
          { value: 'BAIK', label: 'Baik' },
          { value: 'RUSAK_RINGAN', label: 'Rusak Ringan' },
          { value: 'RUSAK_BERAT', label: 'Rusak Berat' },
        ]
      },
      { name: 'quantity', label: 'Jumlah', type: 'number', required: true },
      { name: 'available', label: 'Tersedia', type: 'number' },
      { name: 'location', label: 'Lokasi Penyimpanan', type: 'text' },
      { name: 'image', label: 'Gambar (Upload)', type: 'file', placeholder: 'Pilih file gambar (Upload)' },
    ],
  },
  donations: {
    title: 'Donasi',
    singular: 'Donasi',
    searchFields: ['donorName', 'donorEmail'],
    listColumns: [
      { key: 'donorName', label: 'Donatur' },
      { key: 'amount', label: 'Nominal' },
      { key: 'method', label: 'Metode' },
      { key: 'status', label: 'Status' },
    ],
    roles: R.full,
    canCreate: R.full,
    canEdit: R.full,
    canDelete: R.full,
    fields: [
      { name: 'donorName', label: 'Nama Donatur', type: 'text', required: true },
      { name: 'donorEmail', label: 'Email', type: 'text' },
      { name: 'amount', label: 'Nominal (Rp)', type: 'number', required: true },
      {
        name: 'method', label: 'Metode', type: 'select', options: [
          { value: 'TRANSFER', label: 'Transfer Bank' },
          { value: 'EWALLET', label: 'E-Wallet' },
          { value: 'CASH', label: 'Tunai' },
        ]
      },
      {
        name: 'status', label: 'Status', type: 'select', options: [
          { value: 'PENDING', label: 'Pending' },
          { value: 'VERIFIED', label: 'Terverifikasi' },
          { value: 'FAILED', label: 'Gagal' },
        ]
      },
      { name: 'message', label: 'Pesan', type: 'textarea' },
    ],
  },
  contacts: {
    title: 'Pesan Kontak',
    singular: 'Pesan',
    searchFields: ['name', 'email', 'subject'],
    listColumns: [
      { key: 'name', label: 'Nama' },
      { key: 'subject', label: 'Subjek' },
      { key: 'status', label: 'Status' },
      { key: 'createdAt', label: 'Tanggal' },
    ],
    roles: R.fullPengurus,
    canCreate: [],
    canEdit: R.fullPengurus,
    canDelete: R.full,
    fields: [
      { name: 'name', label: 'Nama', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'text', required: true },
      { name: 'phone', label: 'HP', type: 'text' },
      { name: 'subject', label: 'Subjek', type: 'text', required: true },
      { name: 'message', label: 'Pesan', type: 'textarea', required: true },
      {
        name: 'status', label: 'Status', type: 'select', options: [
          { value: 'BARU', label: 'Baru' },
          { value: 'DIBACA', label: 'Dibaca' },
          { value: 'DIBALAS', label: 'Dibalas' },
        ]
      },
    ],
  },
  incidents: {
    title: 'Laporan Kejadian',
    singular: 'Laporan',
    searchFields: ['type', 'location', 'description'],
    listColumns: [
      { key: 'type', label: 'Jenis' },
      { key: 'location', label: 'Lokasi' },
      { key: 'status', label: 'Status' },
      { key: 'createdAt', label: 'Tanggal' },
    ],
    roles: R.all,
    canCreate: [],
    canEdit: R.all,
    canDelete: R.full,
    fields: [
      {
        name: 'type', label: 'Jenis Kejadian', type: 'select', required: true, options: [
          { value: 'ORANG_HILANG', label: 'Orang Hilang' },
          { value: 'BANJIR', label: 'Banjir' },
          { value: 'KEBAKARAN', label: 'Kebakaran' },
          { value: 'KECELAKAAN', label: 'Kecelakaan' },
          { value: 'LAINNYA', label: 'Lainnya' },
        ]
      },
      { name: 'reporterName', label: 'Nama Pelapor', type: 'text' },
      { name: 'reporterPhone', label: 'HP Pelapor', type: 'text' },
      { name: 'location', label: 'Lokasi', type: 'text', required: true },
      { name: 'description', label: 'Deskripsi', type: 'textarea', required: true },
      {
        name: 'status', label: 'Status', type: 'select', options: [
          { value: 'BARU', label: 'Baru' },
          { value: 'DITINJAU', label: 'Ditinjau' },
          { value: 'DITINDAKLANJUTI', label: 'Ditindaklanjuti' },
          { value: 'SELESAI', label: 'Selesai' },
        ]
      },
    ],
  },
  disasters: {
    title: 'Data Bencana',
    singular: 'Data Bencana',
    searchFields: ['type', 'location'],
    listColumns: [
      { key: 'type', label: 'Jenis' },
      { key: 'location', label: 'Lokasi' },
      { key: 'severity', label: 'Skala' },
      { key: 'status', label: 'Status' },
    ],
    roles: R.fullPengurus,
    canCreate: R.full,
    canEdit: R.fullPengurus,
    canDelete: R.full,
    fields: [
      {
        name: 'type', label: 'Jenis Bencana', type: 'select', required: true, options: [
          { value: 'BANJIR', label: 'Banjir' },
          { value: 'LONGSOR', label: 'Longsor' },
          { value: 'ANGIN_KENCANG', label: 'Angin Kencang' },
          { value: 'KEBAKARAN', label: 'Kebakaran' },
        ]
      },
      { name: 'location', label: 'Lokasi', type: 'text' },
      { name: 'date', label: 'Tanggal', type: 'date', required: true },
      {
        name: 'severity', label: 'Skala', type: 'select', options: [
          { value: 'RINGAN', label: 'Ringan' },
          { value: 'SEDANG', label: 'Sedang' },
          { value: 'BERAT', label: 'Berat' },
        ]
      },
      { name: 'affected', label: 'Jumlah Terdampak', type: 'number' },
      {
        name: 'status', label: 'Status', type: 'select', options: [
          { value: 'AKTIF', label: 'Aktif' },
          { value: 'TERKENDALI', label: 'Terkendali' },
          { value: 'SELESAI', label: 'Selesai' },
        ]
      },
      { name: 'notes', label: 'Catatan', type: 'textarea' },
    ],
  },
  testimonials: {
    title: 'Testimoni',
    singular: 'Testimoni',
    searchFields: ['name', 'org'],
    listColumns: [
      { key: 'avatar', label: 'Foto' },
      { key: 'name', label: 'Nama' },
      { key: 'role', label: 'Peran' },
      { key: 'rating', label: 'Rating' },
    ],
    roles: R.fullPengurus,
    canCreate: R.fullPengurus,
    canEdit: R.fullPengurus,
    canDelete: R.full,
    fields: [
      { name: 'name', label: 'Nama', type: 'text', required: true },
      { name: 'role', label: 'Peran', type: 'text' },
      { name: 'org', label: 'Organisasi', type: 'text' },
      { name: 'message', label: 'Pesan', type: 'textarea', required: true },
      { name: 'avatar', label: 'URL Foto (Avatar)', type: 'image', placeholder: 'URL avatar' },
      { name: 'rating', label: 'Rating (1-5)', type: 'number' },
      { name: 'order', label: 'Urutan', type: 'number' },
    ],
  },
  partners: {
    title: 'Mitra',
    singular: 'Mitra',
    searchFields: ['name', 'type'],
    listColumns: [
      { key: 'name', label: 'Nama' },
      { key: 'type', label: 'Tipe' },
    ],
    roles: R.fullPengurus,
    canCreate: R.fullPengurus,
    canEdit: R.fullPengurus,
    canDelete: R.full,
    fields: [
      { name: 'name', label: 'Nama Mitra', type: 'text', required: true },
      {
        name: 'type', label: 'Tipe', type: 'select', options: [
          { value: 'BPBD', label: 'BPBD' },
          { value: 'PMI', label: 'PMI' },
          { value: 'BASARNAS', label: 'BASARNAS' },
          { value: 'TNI', label: 'TNI' },
          { value: 'POLRI', label: 'POLRI' },
          { value: 'PEMERINTAH', label: 'Pemerintah' },
        ]
      },
      { name: 'logo', label: 'URL Logo', type: 'text' },
      { name: 'website', label: 'Website', type: 'text' },
      { name: 'order', label: 'Urutan', type: 'number' },
    ],
  },
  divisions: {
    title: 'Divisi',
    singular: 'Divisi',
    searchFields: ['name', 'coordinator'],
    listColumns: [
      { key: 'name', label: 'Nama' },
      { key: 'coordinator', label: 'Koordinator' },
      { key: 'order', label: 'Urutan' },
    ],
    roles: R.full,
    canCreate: R.full,
    canEdit: R.full,
    canDelete: R.full,
    fields: [
      { name: 'name', label: 'Nama Divisi', type: 'text', required: true },
      { name: 'slug', label: 'Slug', type: 'text', required: true },
      { name: 'description', label: 'Deskripsi', type: 'textarea' },
      { name: 'icon', label: 'Icon (Lucide name)', type: 'text' },
      { name: 'color', label: 'Warna', type: 'text' },
      { name: 'coordinator', label: 'Koordinator', type: 'text' },
      { name: 'order', label: 'Urutan', type: 'number' },
    ],
  },


  positions: {
    title: 'Jabatan',
    singular: 'Jabatan',
    searchFields: ['title'],
    listColumns: [
      { key: 'title', label: 'Nama Jabatan' },
      { key: 'order', label: 'Urutan' },
    ],
    roles: R.full,
    canCreate: R.full,
    canEdit: R.full,
    canDelete: R.full,
    fields: [
      { name: 'title', label: 'Nama Jabatan', type: 'text', required: true },
      { name: 'order', label: 'Urutan', type: 'number' },
    ],
  },

  pengurus: {
    title: 'Pengurus',
    singular: 'Pengurus',
    roles: ['SUPER_ADMIN', 'ADMIN', 'PENGURUS'],
    canCreate: ['SUPER_ADMIN', 'ADMIN', 'PENGURUS'],
    canEdit: ['SUPER_ADMIN', 'ADMIN', 'PENGURUS'],
    canDelete: ['SUPER_ADMIN', 'ADMIN', 'PENGURUS'],
    searchFields: ['member.fullName', 'position.title'],
    listColumns: [
      { key: 'avatar', label: 'Foto' },
      { key: 'memberName', label: 'Anggota' },
      { key: 'positionTitle', label: 'Jabatan' },
      { key: 'isActive', label: 'Aktif' },
      { key: 'startedAt', label: 'Mulai' },
      { key: 'endedAt', label: 'Selesai' },
    ],
    fields: [
      { name: 'memberId', label: 'Anggota', type: 'select', required: true },
      { name: 'positionId', label: 'Jabatan', type: 'select', required: true },
      { name: 'isActive', label: 'Aktif', type: 'boolean', required: true },
      { name: 'startedAt', label: 'Tanggal Mulai', type: 'date' },
      { name: 'endedAt', label: 'Tanggal Selesai', type: 'date' },
    ],
  },
}



// Check if a role can access a section
export function canAccessSection(section: SectionConfig, role: string): boolean {
  return section.roles.includes(role)
}

// Check if a role can perform an action on a section
export function canPerformAction(section: SectionConfig, role: string, action: 'create' | 'edit' | 'delete'): boolean {
  const allowed = action === 'create' ? section.canCreate : action === 'edit' ? section.canEdit : section.canDelete
  return allowed?.includes(role) ?? false
}
