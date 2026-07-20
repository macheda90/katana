import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/site/navbar"
import { Footer } from "@/components/site/footer"
import { getSiteSettings } from "@/lib/site-settings"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, ArrowLeft } from "lucide-react"
import { formatDateId } from "@/lib/format"

export const revalidate = 30

export default async function ActivityPage({ params }: { params: Promise<{ slug?: string }> }) {
    const resolved = await params
    const slug = resolved?.slug
    if (!slug) return notFound()

    const activity = await db.activity.findUnique({
        where: { slug },
        select: {
            id: true,
            title: true,
            slug: true,
            category: true,
            description: true,
            content: true,
            location: true,
            activityDate: true,
            image: true,
            division: { select: { name: true } },
        },
    })

    if (!activity) return notFound()

    const settings = await getSiteSettings()

    // Prepare formatted HTML from content/description
    const rawContent = (activity.content || activity.description || "") as string

    function escapeHtml(str: string) {
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
    }

    function formatContent(str: string) {
        if (!str) return ''
        // Normalize line endings
        const normalized = str.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
        // Escape any HTML to avoid injection
        let escaped = escapeHtml(normalized)
        // Convert **bold** to <strong>
        escaped = escaped.replace(/\*\*(.+?)\*\*/gs, '<strong>$1</strong>')
        // Split into paragraphs on empty line (two newlines)
        const parts = escaped.split(/\n\s*\n/)
        // Wrap paragraphs with <p> and add indent + margin + justify
        const paragraphs = parts.map(p => `<p class="indent-6 mb-4 text-justify">${p.replace(/\n/g, '<br/>')}</p>`)
        return paragraphs.join('\n')
    }

    const formattedHtml = formatContent(rawContent)

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-[#0a0f1d]">
            <Navbar />
            <main className="flex-1">
                <div className="container mx-auto px-4 py-10">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 hover:text-orange-600">
                                <ArrowLeft className="h-4 w-4" /> Kembali
                            </Link>
                            <h1 className="text-2xl md:text-3xl font-extrabold text-[#0F172A] dark:text-white mt-3">{activity.title}</h1>
                            <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mt-2">
                                <span className="flex items-center gap-2"><Calendar className="h-4 w-4" />{formatDateId(activity.activityDate, 'long')}</span>
                                <span className="flex items-center gap-2"><MapPin className="h-4 w-4" />{activity.location}</span>
                            </div>
                        </div>
                        <Badge className="bg-orange-100 text-orange-700 border-0">{activity.category}</Badge>
                    </div>

                    {/* Image (standard) */}
                    {activity.image && (
                        <div className="w-full bg-white dark:bg-slate-900 rounded-lg overflow-hidden mb-6">
                            <Image
                                src={activity.image}
                                alt={activity.title}
                                width={1600}
                                height={900}
                                className="w-full h-auto object-contain"
                                sizes="100vw"
                                priority
                            />
                        </div>
                    )}

                    {/* Main content */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <article className="lg:col-span-2">
                            <div className="prose prose-lg max-w-none text-slate-800 dark:text-slate-200">
                                <div className="text-justify" dangerouslySetInnerHTML={{ __html: formattedHtml }} />
                            </div>
                        </article>

                        <aside className="space-y-4">
                            <div className="bg-white dark:bg-slate-900 rounded-lg p-4 shadow-sm">
                                <h4 className="text-sm text-slate-500 mb-2">Detail Kegiatan</h4>
                                <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-2">
                                    <li><strong>Tanggal:</strong> <span className="text-slate-500">{formatDateId(activity.activityDate, 'long')}</span></li>
                                    <li><strong>Lokasi:</strong> <span className="text-slate-500">{activity.location}</span></li>
                                    <li><strong>Kategori:</strong> <span className="text-slate-500">{activity.category}</span></li>
                                    <li><strong>Slug:</strong> <span className="text-slate-500">{activity.slug}</span></li>
                                </ul>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>
            <Footer settings={settings} />
        </div>
    )
}
