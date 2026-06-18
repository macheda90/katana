import { Users, Award, Activity, HeartHandshake, Shield, UserCheck } from "lucide-react"

export function StatsSection({ stats }: { stats: any }) {
  const items = [
    { icon: Users, label: "Jumlah Anggota", value: stats?.totalMembers ?? 50, color: "from-orange-500 to-orange-600", suffix: "" },
    { icon: Award, label: "Pengurus", value: stats?.totalPengurus ?? 8, color: "from-blue-600 to-blue-700", suffix: "" },
    { icon: Activity, label: "Misi SAR", value: stats?.totalMissions ?? 5, color: "from-emerald-500 to-emerald-600", suffix: "" },
    { icon: HeartHandshake, label: "Kegiatan Sosial", value: stats?.totalSocial ?? 20, color: "from-amber-500 to-amber-600", suffix: "" },
    { icon: UserCheck, label: "Relawan Aktif", value: stats?.activeVolunteers ?? 42, color: "from-rose-500 to-rose-600", suffix: "" },
    { icon: Shield, label: "Misi Selesai", value: stats?.missionsCompleted ?? 3, color: "from-violet-500 to-violet-600", suffix: "" },
  ]

  return (
    <section className="relative -mt-8 z-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {items.map((item, idx) => (
            <div
              key={item.label}
              className="group relative bg-white dark:bg-slate-900 rounded-2xl p-4 md:p-5 shadow-lg border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} mb-3 shadow-md`}>
                <item.icon className="h-5 w-5 text-white" />
              </div>
              <div className="text-3xl font-extrabold text-[#0F172A] dark:text-white mb-0.5">
                {item.value}{item.suffix}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-tight">
                {item.label}
              </div>
              <div className="absolute top-2 right-2 text-[10px] font-mono text-slate-300 dark:text-slate-700">
                {String(idx + 1).padStart(2, "0")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
