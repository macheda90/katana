"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog"
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Plus, Search, Pencil, Trash2, Loader2, CheckCircle2, XCircle } from "lucide-react"
import { toast } from "sonner"
import type { SectionConfig } from "@/lib/admin-config"

const statusColors: Record<string, string> = {
  ACTIVE: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
  PENDING: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
  INACTIVE: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400",
  REJECTED: "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400",
  VERIFIED: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
  FAILED: "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400",
  BARU: "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
  DIBACA: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400",
  DIBALAS: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
  SELESAI: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
  DITINJAU: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
  DITINDAKLANJUTI: "bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400",
  AKTIF: "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400",
  TERKENDALI: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
  UPCOMING: "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
  ONGOING: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
  DONE: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400",
  CANCELLED: "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400",
  SIAGA: "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
  BERJALAN: "bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400",
  BAIK: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
  RUSAK_RINGAN: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
  RUSAK_BERAT: "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400",
  RINGAN: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
  SEDANG: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
  BERAT: "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400",
}

function formatDate(d: any) {
  if (!d) return "-"
  try {
    return new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
  } catch {
    return "-"
  }
}

function formatCurrency(n: number) {
  return "Rp " + (n || 0).toLocaleString("id-ID")
}

export function DataManager({ section, sectionKey }: { section: SectionConfig; sectionKey: string }) {
  const [records, setRecords] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [editing, setEditing] = useState<any>(null)
  const [creating, setCreating] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const fetchData = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (search) params.set("search", search)
      if (statusFilter !== "all") params.set("status", statusFilter)
      const res = await fetch(`/api/admin/${sectionKey}?${params}`)
      if (res.ok) {
        setRecords(await res.json())
      }
    } catch {
      toast.error("Gagal memuat data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const timer = setTimeout(fetchData, 300)
    return () => clearTimeout(timer)
  }, [search, statusFilter])

  const handleSave = async (data: Record<string, unknown>, id?: string) => {
    try {
      const url = id ? `/api/admin/${sectionKey}/${id}` : `/api/admin/${sectionKey}`
      const method = id ? "PATCH" : "POST"
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        toast.success(id ? "Data berhasil diperbarui" : "Data berhasil ditambahkan")
        setEditing(null)
        setCreating(false)
        fetchData()
      } else {
        const err = await res.json()
        toast.error(err.error || "Gagal menyimpan")
      }
    } catch {
      toast.error("Gagal menyimpan")
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      const res = await fetch(`/api/admin/${sectionKey}/${deleteId}`, { method: "DELETE" })
      if (res.ok) {
        toast.success("Data berhasil dihapus")
        fetchData()
      } else {
        toast.error("Gagal menghapus")
      }
    } catch {
      toast.error("Gagal menghapus")
    } finally {
      setDeleteId(null)
    }
  }

  const quickAction = async (id: string, data: Record<string, unknown>, msg: string) => {
    try {
      const res = await fetch(`/api/admin/${sectionKey}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        toast.success(msg)
        fetchData()
      }
    } catch {
      toast.error("Gagal")
    }
  }

  const hasStatus = section.fields.some((f) => f.name === "status")

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-white">{section.title}</h2>
          <p className="text-sm text-slate-400">Kelola data {section.title.toLowerCase()} organisasi</p>
        </div>
        <Button onClick={() => setCreating(true)} className="bg-orange-500 hover:bg-orange-600 text-white">
          <Plus className="h-4 w-4 mr-1" />Tambah {section.singular}
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder={`Cari ${section.title.toLowerCase()}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
          />
        </div>
        {hasStatus && (
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48 bg-slate-800/50 border-slate-700 text-white">
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              {section.fields.find((f) => f.name === "status")?.options?.map((o) => (
                <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Table */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
        <div className="overflow-x-auto max-h-[60vh] overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-40 text-slate-400">
              <Loader2 className="h-6 w-6 animate-spin mr-2" />Memuat...
            </div>
          ) : records.length === 0 ? (
            <div className="flex items-center justify-center h-40 text-slate-400 text-sm">
              Tidak ada data ditemukan
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-slate-900/50 sticky top-0 z-10">
                <tr>
                  {section.listColumns.map((col) => (
                    <th key={col.key} className="text-left px-4 py-3 font-semibold text-slate-300 text-xs uppercase tracking-wider whitespace-nowrap">
                      {col.label}
                    </th>
                  ))}
                  <th className="text-right px-4 py-3 font-semibold text-slate-300 text-xs uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {records.map((record) => (
                  <tr key={record.id} className="hover:bg-slate-700/30 transition-colors">
                    {section.listColumns.map((col) => (
                      <td key={col.key} className="px-4 py-3 text-slate-200 whitespace-nowrap">
                        {col.key === "status" ? (
                          <Badge className={`${statusColors[record[col.key]] || "bg-slate-100 text-slate-700"} border-0`}>
                            {record[col.key]}
                          </Badge>
                        ) : col.key === "amount" ? (
                          formatCurrency(record[col.key])
                        ) : col.key.includes("Date") || col.key.includes("date") || col.key === "createdAt" || col.key === "publishedAt" || col.key === "startDate" ? (
                          formatDate(record[col.key])
                        ) : col.key === "title" || col.key === "name" || col.key === "fullName" ? (
                          <span className="font-medium">{record[col.key]}</span>
                        ) : (
                          <span className="truncate max-w-xs block">{record[col.key] || "-"}</span>
                        )}
                      </td>
                    ))}
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        {sectionKey === "members" && record.status === "PENDING" && (
                          <>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-emerald-400 hover:bg-emerald-500/20" onClick={() => quickAction(record.id, { status: "ACTIVE", joinDate: new Date() }, "Anggota disetujui")} title="Approve">
                              <CheckCircle2 className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-400 hover:bg-red-500/20" onClick={() => quickAction(record.id, { status: "REJECTED" }, "Anggota ditolak")} title="Reject">
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        {sectionKey === "donations" && record.status === "PENDING" && (
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-emerald-400 hover:bg-emerald-500/20" onClick={() => quickAction(record.id, { status: "VERIFIED" }, "Donasi diverifikasi")} title="Verify">
                            <CheckCircle2 className="h-4 w-4" />
                          </Button>
                        )}
                        {sectionKey === "contacts" && record.status === "BARU" && (
                          <Button size="sm" variant="ghost" className="h-8 px-2 text-blue-400 hover:bg-blue-500/20" onClick={() => quickAction(record.id, { status: "DIBACA" }, "Pesan ditandai dibaca")}>
                            Tandai Dibaca
                          </Button>
                        )}
                        {sectionKey === "incidents" && record.status === "BARU" && (
                          <Button size="sm" variant="ghost" className="h-8 px-2 text-amber-400 hover:bg-amber-500/20" onClick={() => quickAction(record.id, { status: "DITINJAU" }, "Laporan ditinjau")}>
                            Tinjau
                          </Button>
                        )}
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:bg-slate-600/50" onClick={() => setEditing(record)} title="Edit">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-400 hover:bg-red-500/20" onClick={() => setDeleteId(record.id)} title="Hapus">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {!loading && records.length > 0 && (
          <div className="px-4 py-3 border-t border-slate-700/50 text-xs text-slate-400">
            Menampilkan {records.length} data
          </div>
        )}
      </div>

      {/* Create/Edit Dialog */}
      {(creating || editing) && (
        <RecordForm
          key={editing?.id || "new"}
          section={section}
          record={editing}
          onClose={() => { setCreating(false); setEditing(null) }}
          onSave={handleSave}
        />
      )}

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Hapus</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">Hapus</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

function RecordForm({
  section, record, onClose, onSave,
}: {
  section: SectionConfig
  record: any
  onClose: () => void
  onSave: (data: Record<string, unknown>, id?: string) => void
}) {
  const [saving, setSaving] = useState(false)

  const [formData, setFormData] = useState<Record<string, unknown>>(() => {
    const initial: Record<string, unknown> = {}
    for (const field of section.fields) {
      if (record) {
        let val = record[field.name]
        if (field.type === "date" && val) {
          try { val = new Date(val).toISOString().split("T")[0] } catch { val = "" }
        }
        initial[field.name] = val ?? ""
      } else {
        initial[field.name] = field.type === "boolean" ? false : ""
      }
    }
    return initial
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    onSave(formData, record?.id).finally(() => setSaving(false))
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{record ? `Edit ${section.singular}` : `Tambah ${section.singular}`}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            {section.fields.map((field) => (
              <div key={field.name} className={field.type === "textarea" ? "sm:col-span-2 space-y-1.5" : "space-y-1.5"}>
                <Label htmlFor={field.name}>
                  {field.label}
                  {field.required && <span className="text-red-500 ml-0.5">*</span>}
                </Label>
                {field.type === "textarea" ? (
                  <Textarea
                    id={field.name}
                    value={(formData[field.name] as string) || ""}
                    onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                    rows={3}
                  />
                ) : field.type === "select" ? (
                  <Select
                    value={(formData[field.name] as string) || ""}
                    onValueChange={(v) => setFormData({ ...formData, [field.name]: v })}
                  >
                    <SelectTrigger><SelectValue placeholder={`Pilih ${field.label}`} /></SelectTrigger>
                    <SelectContent>
                      {field.options?.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                ) : field.type === "boolean" ? (
                  <Select
                    value={formData[field.name] ? "true" : "false"}
                    onValueChange={(v) => setFormData({ ...formData, [field.name]: v === "true" })}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Ya</SelectItem>
                      <SelectItem value="false">Tidak</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id={field.name}
                    type={field.type === "number" ? "number" : field.type === "date" ? "date" : "text"}
                    value={(formData[field.name] as string) || ""}
                    onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                    required={field.required}
                  />
                )}
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Batal</Button>
            <Button type="submit" disabled={saving} className="bg-orange-500 hover:bg-orange-600 text-white">
              {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
              {record ? "Simpan Perubahan" : "Tambah Data"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
