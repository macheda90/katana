import { db } from '@/lib/db'

// Server-only model mapping - do NOT import in client components
export const modelMap: Record<string, any> = {
  members: db.member,
  news: db.news,
  activities: db.activity,
  agenda: db.agenda,
  missions: db.mission,
  inventory: db.inventory,
  donations: db.donation,
  contacts: db.contactMessage,
  incidents: db.incidentReport,
  disasters: db.disasterData,
  testimonials: db.testimonial,
  partners: db.partner,
  divisions: db.division,
  positions: db.position,
  positionAssignments: db.positionAssignment,
  // Alias untuk key section UI
  pengurus: db.positionAssignment,
}

