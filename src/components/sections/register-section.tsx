"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, User, Mail, Phone, Upload, FileText, UserCheck, ClipboardCheck, Send } from "lucide-react"

const schema = z.object({
  fullName: z.string().min(3, "Nama lengkap minimal 3 karakter"),
  nik: z.string().min(16, "NIK harus 16 digit").max(16),
  birthPlace: z.string().min(2, "Tempat lahir wajib diisi"),
  birthDate: z.string().min(1, "Tanggal lahir wajib diisi"),
  gender: z.string().min(1, "Pilih jenis kelamin"),
  address: z.string().min(5, "Alamat wajib diisi"),
  village: z.string().min(2, "Desa wajib diisi"),
  phone: z.string().min(10, "Nomor HP tidak valid"),
  whatsapp: z.string().min(10, "Nomor WhatsApp tidak valid"),
  email: z.string().email("Email tidak valid"),
  education: z.string().min(1, "Pilih pendidikan"),
  occupation: z.string().min(2, "Pekerjaan wajib diisi"),
  skills: z.string().optional(),
  certifications: z.string().optional(),
  divisionId: z.string().optional(),
})

type FormData = z.infer<typeof schema>

const villages = ["Cikampek Kota", "Cikampek Selatan", "Dawuan", "Kuta Winangun", "Limbangan", "Pejaten", "Purwasari", "Rangkasbitung", "Tambun", "Wanasari"]

export function RegisterSection({ divisions }: { divisions: any[] }) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [memberNumber, setMemberNumber] = useState("")

  const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const result = await res.json()
      if (result.success) {
        setSuccess(true)
        setMemberNumber(result.memberNumber)
        toast.success("Pendaftaran berhasil dikirim!")
        reset()
      } else {
        toast.error(result.error || "Gagal mendaftar")
      }
    } catch {
      toast.error("Terjadi kesalahan. Coba lagi.")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <section id="daftar" className="py-20 bg-gradient-to-br from-[#0F172A] to-[#1e293b]">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto bg-white dark:bg-slate-900 border-0 shadow-2xl">
            <CardContent className="p-8 text-center">
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/40 mb-6">
                <CheckCircle2 className="h-12 w-12 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-[#0F172A] dark:text-white mb-3">
                Pendaftaran Berhasil Dikirim!
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                Selamat! Data Anda telah berhasil dikirim. Status pendaftaran Anda saat ini{" "}
                <Badge className="bg-amber-100 text-amber-700 mx-1">PENDING APPROVAL</Badge>.
                Admin akan mereview data Anda dan mengirim notifikasi email.
              </p>
              <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 mb-6">
                <p className="text-xs text-slate-500 mb-1">Nomor Pendaftaran Anda:</p>
                <p className="text-2xl font-extrabold text-orange-600 tracking-wider">{memberNumber}</p>
              </div>
              <Button
                onClick={() => setSuccess(false)}
                variant="outline"
                className="border-orange-500 text-orange-600 hover:bg-orange-50"
              >
                Daftar Anggota Lain
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section id="daftar" className="py-20 bg-gradient-to-br from-[#0F172A] to-[#1e293b] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
            <span className="text-xs font-semibold text-orange-300 uppercase tracking-wider">Pendaftaran Anggota</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            Gabung Menjadi Bagian dari Katana Rescue
          </h2>
          <p className="text-slate-300">
            Bergabunglah dengan tim SAR dan relawan kemanusiaan. Ikuti langkah pendaftaran di bawah ini.
          </p>
        </div>

        {/* Flow steps */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { icon: User, label: "Daftar", desc: "Isi Formulir" },
              { icon: ClipboardCheck, label: "Review", desc: "Admin Cek Data" },
              { icon: UserCheck, label: "Approve", desc: "Verifikasi" },
              { icon: Mail, label: "Notifikasi", desc: "Email Konfirmasi" },
              { icon: CheckCircle2, label: "Aktif", desc: "Akun Aktif" },
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="relative mx-auto mb-3">
                  <div className="flex h-14 w-14 mx-auto items-center justify-center rounded-2xl bg-orange-500/20 border border-orange-500/30">
                    <step.icon className="h-6 w-6 text-orange-400" />
                  </div>
                  {i < 4 && (
                    <div className="hidden md:block absolute top-7 left-[60%] w-full h-0.5 bg-gradient-to-r from-orange-500/50 to-transparent" />
                  )}
                </div>
                <div className="font-bold text-white text-sm">{step.label}</div>
                <div className="text-xs text-slate-400">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <Card className="max-w-4xl mx-auto shadow-2xl border-0">
          <CardContent className="p-6 md:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Tabs defaultValue="pribadi" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="pribadi" className="text-xs sm:text-sm"><User className="h-4 w-4 mr-1 sm:mr-2" />Data Pribadi</TabsTrigger>
                  <TabsTrigger value="kontak" className="text-xs sm:text-sm"><Phone className="h-4 w-4 mr-1 sm:mr-2" />Kontak</TabsTrigger>
                  <TabsTrigger value="pendukung" className="text-xs sm:text-sm"><FileText className="h-4 w-4 mr-1 sm:mr-2" />Pendukung</TabsTrigger>
                </TabsList>

                {/* Tab 1: Data Pribadi */}
                <TabsContent value="pribadi" className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="fullName">Nama Lengkap *</Label>
                      <Input id="fullName" placeholder="Nama sesuai KTP" {...register("fullName")} />
                      {errors.fullName && <p className="text-xs text-red-500">{errors.fullName.message}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="nik">NIK *</Label>
                      <Input id="nik" placeholder="16 digit NIK" maxLength={16} {...register("nik")} />
                      {errors.nik && <p className="text-xs text-red-500">{errors.nik.message}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="birthPlace">Tempat Lahir *</Label>
                      <Input id="birthPlace" placeholder="Tempat lahir" {...register("birthPlace")} />
                      {errors.birthPlace && <p className="text-xs text-red-500">{errors.birthPlace.message}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="birthDate">Tanggal Lahir *</Label>
                      <Input id="birthDate" type="date" {...register("birthDate")} />
                      {errors.birthDate && <p className="text-xs text-red-500">{errors.birthDate.message}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <Label>Jenis Kelamin *</Label>
                      <Select onValueChange={(v) => setValue("gender", v)}>
                        <SelectTrigger><SelectValue placeholder="Pilih jenis kelamin" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="LAKI_LAKI">Laki-laki</SelectItem>
                          <SelectItem value="PEREMPUAN">Perempuan</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.gender && <p className="text-xs text-red-500">{errors.gender.message}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <Label>Desa *</Label>
                      <Select onValueChange={(v) => setValue("village", v)}>
                        <SelectTrigger><SelectValue placeholder="Pilih desa" /></SelectTrigger>
                        <SelectContent>
                          {villages.map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      {errors.village && <p className="text-xs text-red-500">{errors.village.message}</p>}
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="address">Alamat Lengkap *</Label>
                    <Textarea id="address" placeholder="Alamat lengkap sesuai KTP" rows={2} {...register("address")} />
                    {errors.address && <p className="text-xs text-red-500">{errors.address.message}</p>}
                  </div>
                </TabsContent>

                {/* Tab 2: Kontak */}
                <TabsContent value="kontak" className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="phone">Nomor HP *</Label>
                      <Input id="phone" placeholder="08xxxxxxxxxx" {...register("phone")} />
                      {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="whatsapp">WhatsApp *</Label>
                      <Input id="whatsapp" placeholder="08xxxxxxxxxx" {...register("whatsapp")} />
                      {errors.whatsapp && <p className="text-xs text-red-500">{errors.whatsapp.message}</p>}
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" placeholder="email@example.com" {...register("email")} />
                    {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                  </div>
                </TabsContent>

                {/* Tab 3: Pendukung */}
                <TabsContent value="pendukung" className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label>Pendidikan *</Label>
                      <Select onValueChange={(v) => setValue("education", v)}>
                        <SelectTrigger><SelectValue placeholder="Pilih pendidikan" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SMP">SMP</SelectItem>
                          <SelectItem value="SMA/SMK">SMA/SMK</SelectItem>
                          <SelectItem value="D3">Diploma (D3)</SelectItem>
                          <SelectItem value="S1">Sarjana (S1)</SelectItem>
                          <SelectItem value="S2">Magister (S2)</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.education && <p className="text-xs text-red-500">{errors.education.message}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="occupation">Pekerjaan *</Label>
                      <Input id="occupation" placeholder="Pekerjaan saat ini" {...register("occupation")} />
                      {errors.occupation && <p className="text-xs text-red-500">{errors.occupation.message}</p>}
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Divisi yang Diminati</Label>
                    <Select onValueChange={(v) => setValue("divisionId", v)}>
                      <SelectTrigger><SelectValue placeholder="Pilih divisi (opsional)" /></SelectTrigger>
                      <SelectContent>
                        {divisions.map((d) => <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="skills">Keahlian</Label>
                    <Input id="skills" placeholder="Contoh: Renang, P3K, Tali-temali, Radio" {...register("skills")} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="certifications">Sertifikasi</Label>
                    <Textarea id="certifications" placeholder="Sertifikasi yang dimiliki (BNSP, SAR, dll)" rows={2} {...register("certifications")} />
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <Label>Upload Foto</Label>
                      <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg p-4 text-center cursor-pointer hover:border-orange-400 transition-colors">
                        <Upload className="h-5 w-5 mx-auto text-slate-400 mb-1" />
                        <p className="text-xs text-slate-500">Klik untuk upload</p>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label>Upload KTP</Label>
                      <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg p-4 text-center cursor-pointer hover:border-orange-400 transition-colors">
                        <Upload className="h-5 w-5 mx-auto text-slate-400 mb-1" />
                        <p className="text-xs text-slate-500">Klik untuk upload</p>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label>Upload Sertifikat</Label>
                      <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg p-4 text-center cursor-pointer hover:border-orange-400 transition-colors">
                        <Upload className="h-5 w-5 mx-auto text-slate-400 mb-1" />
                        <p className="text-xs text-slate-500">Klik untuk upload</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t">
                <p className="text-xs text-slate-500">
                  Dengan mendaftar, Anda menyetujui AD/ART Katana Rescue. Status awal: <Badge className="bg-amber-100 text-amber-700">PENDING</Badge>
                </p>
                <Button type="submit" disabled={loading} className="bg-orange-500 hover:bg-orange-600 text-white w-full sm:w-auto">
                  {loading ? (
                    <><span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />Mengirim...</>
                  ) : (
                    <><Send className="h-4 w-4 mr-2" />Kirim Pendaftaran</>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
