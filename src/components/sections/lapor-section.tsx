"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, Droplets, Flame, CarFront, UserX, Phone, Send, Siren } from "lucide-react"

const incidentTypes = [
  { value: "ORANG_HILANG", label: "Orang Hilang", icon: UserX, color: "bg-purple-500" },
  { value: "BANJIR", label: "Banjir", icon: Droplets, color: "bg-blue-500" },
  { value: "KEBAKARAN", label: "Kebakaran", icon: Flame, color: "bg-red-500" },
  { value: "KECELAKAAN", label: "Kecelakaan", icon: CarFront, color: "bg-amber-500" },
  { value: "LAINNYA", label: "Lainnya", icon: AlertTriangle, color: "bg-slate-500" },
]

export function LaporSection() {
  const [loading, setLoading] = useState(false)
  const [selectedType, setSelectedType] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())
    data.type = selectedType

    if (!selectedType || !data.location || !data.description) {
      toast.error("Jenis, lokasi, dan deskripsi wajib diisi")
      setLoading(false)
      return
    }

    try {
      const res = await fetch("/api/incidents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const result = await res.json()
      if (result.success) {
        toast.success("Laporan berhasil dikirim! Tim kami akan menindaklanjuti.")
        e.currentTarget.reset()
        setSelectedType("")
      } else {
        toast.error(result.error || "Gagal mengirim laporan")
      }
    } catch {
      toast.error("Terjadi kesalahan")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="lapor" className="py-20 bg-white dark:bg-[#0a0f1d]">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left: Info */}
          <div className="lg:sticky lg:top-24">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 dark:bg-red-950/30 mb-4">
              <Siren className="h-3.5 w-3.5 text-red-500" />
              <span className="text-xs font-semibold text-red-600 uppercase tracking-wider">Pelaporan Kejadian</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] dark:text-white mb-4">
              Laporkan Kejadian Darurat
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              Masyarakat dapat melaporkan kejadian darurat seperti orang hilang, banjir, kebakaran, atau kecelakaan. Tim Katana Rescue akan segera menindaklanjuti laporan Anda.
            </p>

            <div className="space-y-3 mb-8">
              <p className="text-sm font-semibold text-[#0F172A] dark:text-white">Pilih jenis kejadian:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {incidentTypes.map((t) => (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => setSelectedType(t.value)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${selectedType === t.value
                      ? "border-orange-500 bg-orange-50 dark:bg-orange-950/20"
                      : "border-slate-200 dark:border-slate-700 hover:border-orange-300"
                      }`}
                  >
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${t.color}`}>
                      <t.icon className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xs font-semibold text-[#0F172A] dark:text-white text-center">{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-xl p-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500 shrink-0">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-xs text-red-700 dark:text-red-400 font-semibold">DARURAT HUBUNGI</p>
                <a href="tel:+6283845408400" className="text-xl font-extrabold text-red-600 dark:text-red-400">
                  +62 838-4540-8400
                </a>
                <p className="text-xs text-slate-500">Siaga 24 Jam</p>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <Card className="shadow-xl border-0">
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="reporterName">Nama Pelapor</Label>
                    <Input id="reporterName" name="reporterName" placeholder="Nama Anda" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="reporterPhone">No. HP Pelapor</Label>
                    <Input id="reporterPhone" name="reporterPhone" placeholder="08xxxxxxxxxx" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="location">Lokasi Kejadian *</Label>
                  <Input id="location" name="location" placeholder="Alamat lengkap lokasi kejadian" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="description">Deskripsi Kejadian *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Jelaskan detail kejadian, jumlah korban, kondisi, dll."
                    rows={5}
                  />
                </div>

                <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-700 dark:text-amber-400">
                    Untuk keadaan darurat yang mengancam nyawa, langsung telepon hotline darurat kami. Form ini untuk pelaporan yang membutuhkan tindak lanjut tim.
                  </p>
                </div>

                <Button type="submit" disabled={loading} className="w-full bg-red-500 hover:bg-red-600 text-white h-12">
                  {loading ? (
                    <><span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />Mengirim...</>
                  ) : (
                    <><Send className="h-4 w-4 mr-2" />Kirim Laporan</>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
