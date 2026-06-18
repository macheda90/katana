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
import { Plus, Search, Pencil, Trash2, Loader2, CheckCircle2, XCircle, Upload, FileText, ImageIcon, Lock } from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"
import { canPerformAction } from "@/lib/admin-config"
import type { SectionConfig, FieldConfig } from "@/lib/admin-config"

const statusColors: Record<string, string> = {
  ACTIVE: "bg-emerald-100 text-emerald-700",
  PENDING: "bg-amber-100 text-amber-700",
  INACTIVE: "bg-slate-100 text-slate-600",
  REJECTED: "bg-red-100 text-red-700",
  VERIFIED: "bg-emerald-100 text-emerald-700",
  FAILED: "bg-red-100 text-red-700",
  BARU: "bg-blue-100 text-blue-700",
  DIBACA: "bg-slate-100 text-slate-600",
  DIBALAS: "bg-emerald-100 text-emerald-700",
  SELESAI: "bg-emerald-100 text-emerald-700",
  DITINJAU: "bg-amber-100 text-amber-700",
  DITINDAKLANJUTI: "bg-orange-100 text-orange-700",
  AKTIF: "bg-red-100 text-red-700",
  TERKENDALI: "bg-amber-100 text-amber-700",
  UPCOMING: "bg-blue-100 text-blue-700",
  ONGOING: "bg-emerald-100 text-emerald-700",
  DONE: "bg-slate-100 text-slate-600",
  CANCELLED: "bg-red-100 text-red-700",
  SIAGA: "bg-blue-100 text-blue-700",
  BERJALAN: "bg-orange-100 text-orange-700",
  BAIK: "bg-emerald-100 text-emerald-700",
  RUSAK_RINGAN: "bg-amber-100 text-amber-700",
  RUSAK_BERAT: "bg-red-100 text-red-700",
  RINGAN: "bg-emerald-100 text-emerald-700",
  SEDANG: "bg-amber-100 text-amber-700",
  BERAT: "bg-red-100 text-red-700",
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

export function DataManager({ section, sectionKey, userRole }: { section: SectionConfig; sectionKey: string; userRole: string }) {
  const [records, setRecords] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [editing, setEditing] = useState<any>(null)
  const [creating, setCreating] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const canCreate = canPerformAction(section, userRole, 'create')
  const canEdit = canPerformAction(section, userRole, 'edit')
  const canDelete = canPerformAction(section, userRole, 'delete')

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
          <h2 className="text-2xl font-bold text-slate-900">{section.title}</h2>
          <p className="text-sm text-slate-500">Kelola data {section.title.toLowerCase()} organisasi</p>
        </div>
        {canCreate ? (
          <Button onClick={() => setCreating(true)} className="bg-orange-500 hover:bg-orange-600 text-white">
            <Plus className="h-4 w-4 mr-1" />Tambah {section.singular}
          </Button>
        ) : (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-500 text-xs">
            <Lock className="h-3.5 w-3.5" /> Read-only mode
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder={`Cari ${section.title.toLowerCase()}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-white border-slate-200"
          />
        </div>
        {hasStatus && (
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48 bg-white border-slate-200">
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
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
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
              <thead className="bg-slate-50 sticky top-0 z-10 border-b border-slate-200">
                <tr>
                  {section.listColumns.map((col) => (
                    <th key={col.key} className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider whitespace-nowrap">
                      {col.label}
                    </th>
                  ))}
                  <th className="text-right px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {records.map((record) => (
                  <tr key={record.id} className="hover:bg-orange-50/30 transition-colors">
                    {section.listColumns.map((col) => (
                      <td key={col.key} className="px-4 py-3 text-slate-700 whitespace-nowrap">
                        {col.key === "photo" ? (
                          <div className="relative h-10 w-10 rounded-full overflow-hidden bg-slate-100 shrink-0">
                            {record.photo ? (
                              <Image src={record.photo} alt={record.fullName || "Foto"} fill className="object-cover" sizes="40px" />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-slate-300">
                                <ImageIcon className="h-5 w-5" />
                              </div>
                            )}
                          </div>
                        ) : col.key === "status" ? (
                          <Badge className={`${statusColors[record[col.key]] || "bg-slate-100 text-slate-600"} border-0`}>
                            {record[col.key]}
                          </Badge>
                        ) : col.key === "amount" ? (
                          formatCurrency(record[col.key])
                        ) : col.key.includes("Date") || col.key.includes("date") || col.key === "createdAt" || col.key === "publishedAt" || col.key === "startDate" ? (
                          formatDate(record[col.key])
                        ) : col.key === "title" || col.key === "name" || col.key === "fullName" ? (
                          <span className="font-medium text-slate-900">{record[col.key]}</span>
                        ) : col.key === "division" ? (
                          <span className="text-slate-600">{record.division?.name || record.divisionId || "-"}</span>
                        ) : (
                          <span className="truncate max-w-xs block">{record[col.key] || "-"}</span>
                        )}
                      </td>
                    ))}
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        {sectionKey === "members" && record.status === "PENDING" && canEdit && (
                          <>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-emerald-600 hover:bg-emerald-50" onClick={() => quickAction(record.id, { status: "ACTIVE", joinDate: new Date() }, "Anggota disetujui & diaktifkan")} title="Approve">
                              <CheckCircle2 className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-600 hover:bg-red-50" onClick={() => quickAction(record.id, { status: "REJECTED" }, "Anggota ditolak")} title="Reject">
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        {sectionKey === "donations" && record.status === "PENDING" && canEdit && (
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-emerald-600 hover:bg-emerald-50" onClick={() => quickAction(record.id, { status: "VERIFIED" }, "Donasi diverifikasi")} title="Verify">
                            <CheckCircle2 className="h-4 w-4" />
                          </Button>
                        )}
                        {sectionKey === "contacts" && record.status === "BARU" && canEdit && (
                          <Button size="sm" variant="ghost" className="h-8 px-2 text-blue-600 hover:bg-blue-50" onClick={() => quickAction(record.id, { status: "DIBACA" }, "Pesan ditandai dibaca")}>
                            Tandai Dibaca
                          </Button>
                        )}
                        {sectionKey === "incidents" && record.status === "BARU" && canEdit && (
                          <Button size="sm" variant="ghost" className="h-8 px-2 text-amber-600 hover:bg-amber-50" onClick={() => quickAction(record.id, { status: "DITINJAU" }, "Laporan ditinjau")}>
                            Tinjau
                          </Button>
                        )}
                        {canEdit && (
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-slate-500 hover:bg-slate-100" onClick={() => setEditing(record)} title="Edit">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        )}
                        {canDelete && (
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-600 hover:bg-red-50" onClick={() => setDeleteId(record.id)} title="Hapus">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {!loading && records.length > 0 && (
          <div className="px-4 py-3 border-t border-slate-200 text-xs text-slate-500">
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
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-slate-900">{record ? `Edit ${section.singular}` : `Tambah ${section.singular}`}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            {section.fields.map((field) => (
              <FieldInput
                key={field.name}
                field={field}
                value={formData[field.name]}
                onChange={(v) => setFormData({ ...formData, [field.name]: v })}
              />
            ))}
          </div>
          <DialogFooter className="pt-4 border-t">
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

function FieldInput({ field, value, onChange }: { field: FieldConfig; value: unknown; onChange: (v: string) => void }) {
  const colSpan = field.full || field.type === "textarea" ? "sm:col-span-2" : ""

  return (
    <div className={`${colSpan} space-y-1.5`}>
      <Label htmlFor={field.name} className="text-slate-700 text-xs">
        {field.label}
        {field.required && <span className="text-red-500 ml-0.5">*</span>}
      </Label>

      {field.type === "textarea" ? (
        <Textarea
          id={field.name}
          value={(value as string) || ""}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          placeholder={field.placeholder}
          className="bg-white border-slate-200 text-sm"
        />
      ) : field.type === "select" ? (
        <Select value={(value as string) || ""} onValueChange={onChange}>
          <SelectTrigger className="bg-white border-slate-200 text-sm"><SelectValue placeholder={`Pilih ${field.label}`} /></SelectTrigger>
          <SelectContent>
            {field.options?.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
          </SelectContent>
        </Select>
      ) : field.type === "boolean" ? (
        <Select value={value ? "true" : "false"} onValueChange={onChange}>
          <SelectTrigger className="bg-white border-slate-200 text-sm"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Ya</SelectItem>
            <SelectItem value="false">Tidak</SelectItem>
          </SelectContent>
        </Select>
      ) : field.type === "image" ? (
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              id={field.name}
              type="text"
              value={(value as string) || ""}
              onChange={(e) => onChange(e.target.value)}
              placeholder={field.placeholder || "URL gambar"}
              className="bg-white border-slate-200 text-sm flex-1"
            />
            <Button type="button" variant="outline" size="icon" className="shrink-0 border-slate-200" title="Upload">
              <Upload className="h-4 w-4 text-slate-400" />
            </Button>
          </div>
          {value ? (
            <div className="relative h-24 w-24 rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
              <Image src={value as string} alt={field.label} fill className="object-cover" sizes="96px" />
            </div>
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-lg border-2 border-dashed border-slate-200 bg-slate-50">
              <ImageIcon className="h-8 w-8 text-slate-300" />
            </div>
          )}
        </div>
      ) : field.type === "file" ? (
        <div className="flex gap-2">
          <Input
            id={field.name}
            type="text"
            value={(value as string) || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder || "URL file"}
            className="bg-white border-slate-200 text-sm flex-1"
          />
          <Button type="button" variant="outline" size="icon" className="shrink-0 border-slate-200" title="Upload File">
            <FileText className="h-4 w-4 text-slate-400" />
          </Button>
        </div>
      ) : (
        <Input
          id={field.name}
          type={field.type === "number" ? "number" : field.type === "date" ? "date" : "text"}
          value={(value as string) || ""}
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
          placeholder={field.placeholder}
          className="bg-white border-slate-200 text-sm"
        />
      )}
    </div>
  )
}
