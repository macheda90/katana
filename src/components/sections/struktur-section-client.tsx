"use client"

import { ArrowRight } from "lucide-react"
import { SectionHeading } from "@/components/site/section-heading"
import { Button } from "@/components/ui/button"
import { useView } from "@/lib/view-store"

export type PengurusCard = {
    id: string
    memberName: string
    roleTitle: string
    avatarUrl?: string | null
    bio?: string | null
}

export function StrukturSectionClient({ pengurus }: { pengurus: PengurusCard[] }) {
    const { setView } = useView()

    return (
        <section id="struktur" className="py-20 bg-white dark:bg-[#0a0f1d]">
            <div className="container mx-auto px-4">
                <SectionHeading
                    eyebrow="Struktur Organisasi"
                    title="Kepengurusan Katana Rescue"
                    description="Susunan pengurus harian yang memimpin dan mengelola operasional organisasi Katana Rescue Cikampek."
                />

                {/* Pengurus Utama */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {pengurus.map((p) => (
                        <div
                            key={p.id}
                            className="group relative bg-white dark:bg-slate-900 rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all duration-300"
                        >
                            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 mb-4 shadow-lg group-hover:scale-110 transition-transform">
                                {p.avatarUrl ? (
                                    <img
                                        src={p.avatarUrl}
                                        alt={p.memberName}
                                        className="h-16 w-16 rounded-2xl object-cover"
                                        onError={(e) => {
                                            ; (e.currentTarget as HTMLImageElement).style.display = "none"
                                        }}
                                    />
                                ) : (
                                    <span className="text-white font-bold text-sm">
                                        {p.memberName?.charAt(0) || "?"}
                                    </span>
                                )}

                            </div>

                            <div className="inline-block px-3 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2">
                                {p.roleTitle}
                            </div>
                            <h3 className="font-bold text-[#0F172A] dark:text-white mb-1">{p.memberName}</h3>
                            {p.bio ? (
                                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                    {p.bio}
                                </p>
                            ) : (
                                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                    Profil pengurus Katana Rescue.
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                {/* Koordinator Divisi (tampil apa adanya untuk sekarang, tanpa hard-code nama) */}
                <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 md:p-8 border border-slate-100 dark:border-slate-800">
                    <h3 className="text-xl font-bold text-[#0F172A] dark:text-white mb-6 text-center">
                        Koordinator Divisi
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
                        Silakan lihat daftar lengkap pada halaman Selengkapnya.
                    </p>

                    <div className="text-center pt-4 border-t border-slate-200 dark:border-slate-700 mt-8">
                        <Button
                            onClick={() => setView("all-struktur")}
                            variant="outline"
                            className="border-orange-500 text-orange-600 hover:bg-orange-50"
                        >
                            Selengkapnya <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

