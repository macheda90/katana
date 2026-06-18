import { db } from "@/lib/db"
import { getSiteSettings } from "@/lib/site-settings"
import { Navbar } from "@/components/site/navbar"
import { Footer } from "@/components/site/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { StatsSection } from "@/components/sections/stats-section"
import { AboutSection } from "@/components/sections/about-section"
import { DivisionsSection } from "@/components/sections/divisions-section"
import { ActivitiesSection } from "@/components/sections/activities-section"
import { NewsSection } from "@/components/sections/news-section"
import { AgendaSection } from "@/components/sections/agenda-section"
import { StrukturSection } from "@/components/sections/struktur-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { PartnersSection } from "@/components/sections/partners-section"
import { EdukasiSection } from "@/components/sections/edukasi-section"
import { DashboardSection } from "@/components/sections/dashboard-section"
import { RegisterSection } from "@/components/sections/register-section"
import { LaporSection } from "@/components/sections/lapor-section"
import { DonasiSection } from "@/components/sections/donasi-section"
import { DisasterSection } from "@/components/sections/disaster-section"
import { MapSection } from "@/components/sections/map-section"
import { ContactSection } from "@/components/sections/contact-section"
import { AdminPortal } from "@/components/admin/admin-portal"

async function getStats() {
  try {
    const [totalMembers, totalPengurus, totalMissions, totalSocial, activeVolunteers, missionsCompleted] = await Promise.all([
      db.member.count({ where: { status: "ACTIVE" } }),
      db.member.count({ where: { status: "ACTIVE", divisionId: { not: null } } }),
      db.mission.count(),
      db.activity.count({ where: { category: "SOSIAL" } }),
      db.member.count({ where: { status: "ACTIVE" } }),
      db.mission.count({ where: { status: "SELESAI" } }),
    ])
    return { totalMembers, totalPengurus, totalMissions, totalSocial, activeVolunteers, missionsCompleted }
  } catch {
    return { totalMembers: 50, totalPengurus: 8, totalMissions: 5, totalSocial: 20, activeVolunteers: 42, missionsCompleted: 3 }
  }
}

// Revalidate every 30 seconds so front-end syncs with back-office changes
export const revalidate = 30

export default async function HomePage() {
  const [stats, divisions, activities, news, agenda, testimonials, partners, settings] = await Promise.all([
    getStats(),
    db.division.findMany({
      orderBy: { order: "asc" },
      include: { _count: { select: { members: { where: { status: "ACTIVE" } } } } },
    }),
    db.activity.findMany({
      orderBy: { activityDate: "desc" },
      take: 6,
      include: { division: { select: { name: true, icon: true, color: true } } },
    }),
    db.news.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 5,
    }),
    db.agenda.findMany({
      where: { status: "UPCOMING" },
      orderBy: { startDate: "asc" },
      take: 6,
    }),
    db.testimonial.findMany({ orderBy: { order: "asc" } }),
    db.partner.findMany({ orderBy: { order: "asc" } }),
    getSiteSettings(),
  ])

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0a0f1d]">
      <Navbar />
      <main className="flex-1">
        <HeroSection stats={stats} settings={settings} />
        <StatsSection stats={stats} />
        <AboutSection settings={settings} />
        <DivisionsSection divisions={divisions} />
        <ActivitiesSection activities={activities} />
        <NewsSection news={news} />
        <AgendaSection agenda={agenda} />
        <StrukturSection />
        <DisasterSection />
        <EdukasiSection />
        <DashboardSection />
        <RegisterSection divisions={divisions} />
        <LaporSection />
        <DonasiSection />
        <TestimonialsSection testimonials={testimonials} />
        <PartnersSection partners={partners} />
        <MapSection settings={settings} />
        <ContactSection settings={settings} />
      </main>
      <Footer settings={settings} />
      <AdminPortal />
    </div>
  )
}
