"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Banknote, Wallet, Send, TrendingUp, Users } from "lucide-react"

const quickAmounts = [50000, 100000, 250000, 500000, 1000000, 5000000]

function formatRupiah(n: number) {
  return "Rp " + n.toLocaleString("id-ID")
}

export function DonasiSection() {
  const [loading, setLoading] = useState(false)
  const [amount, setAmount] = useState<number>(100000)
  const [method, setMethod] = useState("TRANSFER")
  const [data, setData] = useState<{ total: number; count: number }>({ total: 0, count: 0 })

  useEffect(() => {
    fetch("/api/donations")
      .then((r) => r.json())
      .then((d) => setData({ total: d.total || 0, count: d.donations?.length || 0 }))
      .catch(() => {})
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const donorName = formData.get("donorName") as string
    const donorEmail = formData.get("donorEmail") as string
    const message = formData.get("message") as string

    if (!donorName || amount < 10000) {
      toast.error("Nama donatur dan minimal Rp 10.000 wajib diisi")
      setLoading(false)
      return
    }

    try {
      const res = await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ donorName, donorEmail, amount, message, method }),
      })
      const result = await res.json()
      if (result.success) {
        toast.success("Terima kasih atas donasi Anda!")
        e.currentTarget.reset()
        setAmount(100000)
      } else {
        toast.error(result.error || "Gagal")
      }
    } catch {
      toast.error("Terjadi kesalahan")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="donasi" className="py-20 bg-gradient-to-br from-orange-50 to-slate-50 dark:from-[#0d1424] dark:to-[#0a0f1d]">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left: Info */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/30 mb-4">
              <Heart className="h-3.5 w-3.5 text-orange-500" />
              <span className="text-xs font-semibold text-orange-600 uppercase tracking-wider">Donasi Online</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] dark:text-white mb-4">
              Dukung Operasional Katana Rescue
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              Donasi Anda sangat berarti untuk mendukung operasional pencarian, pertolongan, dan kegiatan kemanusiaan Katana Rescue di Kecamatan Cikampek.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm">
                <TrendingUp className="h-8 w-8 text-orange-500 mb-2" />
                <div className="text-2xl font-extrabold text-[#0F172A] dark:text-white">
                  {formatRupiah(data.total)}
                </div>
                <div className="text-xs text-slate-500">Total Donasi Terverifikasi</div>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm">
                <Users className="h-8 w-8 text-emerald-500 mb-2" />
                <div className="text-2xl font-extrabold text-[#0F172A] dark:text-white">{data.count}</div>
                <div className="text-xs text-slate-500">Donatur Terverifikasi</div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-[#0F172A] dark:text-white mb-3 flex items-center gap-2">
                <Banknote className="h-5 w-5 text-orange-500" />
                Rekening Donasi
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div>
                    <div className="font-bold text-[#0F172A] dark:text-white">Bank BCA</div>
                    <div className="text-xs text-slate-500">a.n. Katana Rescue Cikampek</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-bold text-orange-600">1234567890</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div>
                    <div className="font-bold text-[#0F172A] dark:text-white">Bank Mandiri</div>
                    <div className="text-xs text-slate-500">a.n. Katana Rescue Cikampek</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-bold text-orange-600">0987654321</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <Card className="shadow-xl border-0">
            <CardContent className="p-6 md:p-8">
              <h3 className="text-xl font-bold text-[#0F172A] dark:text-white mb-6">Form Donasi Online</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <Label>Pilih Nominal Donasi</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {quickAmounts.map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setAmount(amt)}
                        className={`px-3 py-2.5 rounded-lg text-sm font-semibold border-2 transition-all ${
                          amount === amt
                            ? "border-orange-500 bg-orange-500 text-white"
                            : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-orange-300"
                        }`}
                      >
                        {formatRupiah(amt)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="amount">Nominal Lain (Rp)</Label>
                  <Input
                    id="amount"
                    type="number"
                    min={10000}
                    value={amount}
                    onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
                  />
                  <p className="text-xs text-slate-500">Minimal donasi Rp 10.000</p>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="donorName">Nama Donatur *</Label>
                  <Input id="donorName" name="donorName" placeholder="Nama Anda / Hamba Allah" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="donorEmail">Email (opsional)</Label>
                  <Input id="donorEmail" name="donorEmail" type="email" placeholder="email@example.com" />
                </div>

                <div className="space-y-1.5">
                  <Label>Metode Pembayaran</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setMethod("TRANSFER")}
                      className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 text-sm font-semibold transition-all ${
                        method === "TRANSFER"
                          ? "border-orange-500 bg-orange-50 dark:bg-orange-950/20 text-orange-600"
                          : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                      }`}
                    >
                      <Banknote className="h-4 w-4" /> Transfer Bank
                    </button>
                    <button
                      type="button"
                      onClick={() => setMethod("EWALLET")}
                      className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 text-sm font-semibold transition-all ${
                        method === "EWALLET"
                          ? "border-orange-500 bg-orange-50 dark:bg-orange-950/20 text-orange-600"
                          : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                      }`}
                    >
                      <Wallet className="h-4 w-4" /> E-Wallet
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="message">Pesan (opsional)</Label>
                  <Textarea id="message" name="message" placeholder="Pesan/doa untuk tim Katana Rescue" rows={2} />
                </div>

                <div className="pt-2">
                  <div className="flex items-center justify-between mb-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <span className="text-sm text-slate-600 dark:text-slate-300">Total Donasi:</span>
                    <span className="text-2xl font-extrabold text-orange-600">{formatRupiah(amount)}</span>
                  </div>
                  <Button type="submit" disabled={loading} className="w-full bg-orange-500 hover:bg-orange-600 text-white h-12">
                    {loading ? (
                      <><span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />Memproses...</>
                    ) : (
                      <><Send className="h-4 w-4 mr-2" />Donasi Sekarang</>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
