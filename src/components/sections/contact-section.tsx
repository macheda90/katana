"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from "lucide-react"
import { SectionHeading } from "@/components/site/section-heading"

export function ContactSection({ settings }: { settings: Record<string, string> }) {
  const [loading, setLoading] = useState(false)
  const phone = settings.phone || "+62 838-4540-8400"
  const email = settings.email || "info@katanarescue.id"
  const address = settings.address || "Jl. Raya Cikampek No. 1, Cikampek, Karawang, Jawa Barat 41373"
  const whatsapp = settings.whatsapp || phone

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const result = await res.json()
      if (result.success) {
        toast.success("Pesan berhasil dikirim! Tim kami akan menghubungi Anda.")
        e.currentTarget.reset()
      } else {
        toast.error(result.error || "Gagal mengirim pesan")
      }
    } catch {
      toast.error("Terjadi kesalahan")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="kontak" className="py-20 bg-white dark:bg-[#0a0f1d]">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="Hubungi Kami"
          title="Kirim Pesan kepada Katana Rescue"
          description="Ada pertanyaan, masukan, atau ingin bekerja sama? Hubungi tim Katana Rescue melalui form di bawah ini."
        />

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="border-0 shadow-md bg-gradient-to-br from-[#0F172A] to-[#1e293b] text-white">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-orange-500" />
                  Informasi Kontak
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/20 shrink-0">
                      <MapPin className="h-5 w-5 text-orange-400" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 mb-0.5">Alamat</div>
                      <div className="text-sm">{address}</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/20 shrink-0">
                      <Phone className="h-5 w-5 text-orange-400" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 mb-0.5">Telepon / WhatsApp</div>
                      <div className="text-sm font-semibold">{phone}</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/20 shrink-0">
                      <Mail className="h-5 w-5 text-orange-400" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 mb-0.5">Email</div>
                      <div className="text-sm">{email}</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/20 shrink-0">
                      <Clock className="h-5 w-5 text-orange-400" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 mb-0.5">Jam Operasional</div>
                      <div className="text-sm">Sekretariat: Senin-Sabtu, 08.00-17.00</div>
                      <div className="text-sm text-orange-400 font-semibold">Tanggap Darurat: 24 Jam</div>
                    </div>
                  </div>
                </div>
                <a
                  href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex items-center justify-center gap-2 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2.5 rounded-lg transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat WhatsApp
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <Card className="shadow-lg border-0">
              <CardContent className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="name">Nama Lengkap *</Label>
                      <Input id="name" name="name" placeholder="Nama Anda" required />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" name="email" type="email" placeholder="email@example.com" required />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="phone">Nomor HP</Label>
                      <Input id="phone" name="phone" placeholder="08xxxxxxxxxx" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="subject">Subjek *</Label>
                      <Input id="subject" name="subject" placeholder="Subjek pesan" required />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="message">Pesan *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tulis pesan Anda di sini..."
                      rows={6}
                      required
                    />
                  </div>
                  <Button type="submit" disabled={loading} className="w-full bg-orange-500 hover:bg-orange-600 text-white h-12">
                    {loading ? (
                      <><span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />Mengirim...</>
                    ) : (
                      <><Send className="h-4 w-4 mr-2" />Kirim Pesan</>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
