"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog"
import { Shield, Mail, Lock, Loader2, LogIn, AlertCircle } from "lucide-react"
import { useAuth } from "@/lib/auth-store"
import { toast } from "sonner"

export function LoginDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [email, setEmail] = useState("admin@katanarescue.cikampek.id")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { setUser, setShowAdmin } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, remember }),
      })
      const data = await res.json()
      if (res.ok) {
        setUser(data.user)
        setShowAdmin(true)
        toast.success(`Selamat datang, ${data.user.name}!`)
        onOpenChange(false)
        setPassword("")
      } else {
        setError(data.error || "Login gagal")
      }
    } catch {
      setError("Terjadi kesalahan koneksi")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-2">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg">
              <Shield className="h-7 w-7 text-white" />
            </div>
          </div>
          <DialogTitle className="text-center text-xl">Login Back Office</DialogTitle>
          <DialogDescription className="text-center">
            Masuk ke panel admin Katana Rescue untuk mengelola data organisasi.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="login-email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                id="login-email"
                type="email"
                placeholder="admin@katanarescue.cikampek.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-9"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="login-password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                id="login-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-9"
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="remember"
              checked={remember}
              onCheckedChange={(v) => setRemember(v === true)}
            />
            <Label htmlFor="remember" className="text-sm text-slate-600 dark:text-slate-300 cursor-pointer">
              Tetap Masuk (simpan sesi 30 hari)
            </Label>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 text-red-600 text-sm">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          {/* <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <p className="text-xs text-slate-500 font-semibold mb-1">Demo Credentials:</p>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Email: <code className="text-orange-600">admin@katanarescue.cikampek.id</code>
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Password: <code className="text-orange-600">admin123</code>
            </p>
          </div> */}

          <Button type="submit" disabled={loading} className="w-full bg-orange-500 hover:bg-orange-600 text-white h-11">
            {loading ? (
              <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Masuk...</>
            ) : (
              <><LogIn className="h-4 w-4 mr-2" />Masuk ke Back Office</>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
