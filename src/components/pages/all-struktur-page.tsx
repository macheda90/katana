"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Crown, User, FileText, DollarSign, Shield } from "lucide-react"
import { useView } from "@/lib/view-store"

const pengurus = [
  { name: "Andi Pratama", role: "Ketua Umum", icon: Crown, color: "from-orange-500 to-orange-600", desc: "Memimpin dan mengarahkan seluruh program organisasi Katana Rescue Cikampek" },
  { name: "Rudi Hartono", role: "Wakil Ketua", icon: User, color: "from-blue-600 to-blue-700", desc: "Mendampingi ketua dan mengkoordinasi divisi operasional" },
  { name: "Dedi Kurniawan", role: "Sekretaris", icon: FileText, color: "from-emerald-500 to-emerald-600", desc: "Mengelola administrasi dan dokumentasi organisasi" },
  { name: "Siti Rahmawati", role: "Bendahara", icon: DollarSign, color: "from-amber-500 to-amber-600", desc: "Mengelola keuangan dan transparansi dana organisasi" },
]

const divisiList = [
  { name: "Water Rescue", coordinator: "Andi Pratama", desc: "Tim penanganan pencarian dan pertolongan korban di perairan, banjir, dan tenggelam." },
  { name: "Vertical Rescue", coordinator: "Rudi Hartono", desc: "Tim penyelamatan ketinggian, tebing, gedung, dan jurang dengan teknik tali profesional." },
  { name: "Evakuasi Medis", coordinator: "Dedi Kurniawan", desc: "Tim evakuasi medis dan pertolongan pertama korban kecelakaan dengan tenaga medis tersertifikasi." },
  { name: "Logistik", coordinator: "Siti Rahmawati", desc: "Tim pendukung distribusi perlengkapan, dapur umum, dan pengadaan logistik bencana." },
  { name: "Komunikasi dan Radio", coordinator: "Bambang Sutrisno", desc: "Tim jaringan komunikasi radio HT dan koordinasi informasi lapangan." },
  { name: "Drone SAR", coordinator: "Yoga Pratama", desc: "Tim pemetaan udara dan pencarian korban dengan teknologi drone." },
  { name: "Kesiapsiagaan Bencana", coordinator: "Nur Hasanah", desc: "Tim mitigasi, simulasi, dan kesiapsiagaan tanggap bencana wilayah." },
  { name: "Humas dan Dokumentasi", coordinator: "Maya Sari", desc: "Tim hubungan masyarakat, publikasi, dan dokumentasi kegiatan SAR." },
]

export function AllStrukturPage({ members, divisions }: { members: any[]; divisions: any[] }) {
  const { goHome } = useView()

  // Group members by division
  const membersByDivision = divisions.map((div) => ({
    division: div,
    members: members.filter((m) => m.divisionId === div.id && m.status === "ACTIVE"),
  }))

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#0F172A] to-[#1e293b] py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative">
          <Button
            onClick={goHome}
            variant="outline"
            className="mb-6 border-white/30 text-white hover:bg-white/10 bg-white/5 backdrop-blur-sm"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />Kembali ke Beranda
          </Button>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 mb-4">
            <Shield className="h-3.5 w-3.5 text-orange-300" />
            <span className="text-xs font-semibold text-orange-300 uppercase tracking-wider">Struktur Organisasi</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">Kepengurusan Katana Rescue</h1>
          <p className="text-base text-slate-300 max-w-2xl">
            Susunan pengurus harian dan koordinator divisi yang memimpin operasional organisasi Katana Rescue Cikampek.
          </p>
        </div>
      </section>

      {/* Pengurus Utama
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-[#0F172A] mb-2">Pengurus Harian</h2>
            <p className="text-slate-500">Kepemimpinan organisasi Katana Rescue</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pengurus.map((p) => (
              <div
                key={p.name}
                className="group bg-white rounded-2xl p-6 text-center border border-slate-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex justify-center mb-4">
                  <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${p.color} shadow-lg group-hover:scale-110 transition-transform`}>
                    <p.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="inline-block px-3 py-0.5 rounded-full bg-slate-100 text-xs font-semibold text-slate-600 mb-2">
                  {p.role}
                </div>
                <h3 className="font-bold text-[#0F172A] mb-2">{p.name}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Divisi & Anggota */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-[#0F172A] mb-2">Divisi & Anggota Aktif</h2>
            <p className="text-slate-500">8 divisi spesialisasi dengan koordinator dan anggota aktif</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {membersByDivision.map(({ division, members: divMembers }) => (
              <div key={division.id} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#0F172A]">{division.name}</h3>
                    <p className="text-xs text-orange-600 font-semibold mt-1">Koordinator: {division.coordinator}</p>
                  </div>
                  <Badge className="bg-orange-100 text-orange-700 border-0">
                    {divMembers.length} Anggota
                  </Badge>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">{division.description}</p>
                {divMembers.length > 0 ? (
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {divMembers.map((m) => (
                      <div key={m.id} className="flex items-center gap-3 p-2 rounded-lg bg-slate-50">
                        <div className="h-9 w-9 rounded-full overflow-hidden bg-slate-200 shrink-0 flex items-center justify-center">
                          {m.photo ? (
                            <img
                              src={m.photo}
                              alt={m.fullName}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = "none"
                              }}
                            />
                          ) : (
                            <span className="text-sm font-bold text-white bg-gradient-to-br from-orange-500 to-orange-600 w-full h-full flex items-center justify-center">
                              {m.fullName.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-[#0F172A] truncate">{m.fullName}</div>
                          <div className="text-xs text-slate-400">{m.memberNumber} • {m.occupation || "Anggota"}</div>
                        </div>
                        {m.bio && (
                          <div className="text-xs text-slate-400 truncate max-w-[150px]" title={m.bio}>
                            {m.bio.substring(0, 40)}...
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic">Belum ada anggota aktif</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
