import { db } from "@/lib/db"
import { StrukturSectionClient } from "@/components/sections/struktur-section-client"

export async function StrukturSection() {
  const positionAssignments = await db.positionAssignment.findMany({
    where: {
      isActive: true,
      member: {
        status: "ACTIVE",
      },
    },
    orderBy: { startedAt: "desc" },
    take: 12,
    include: {
      position: true,
      member: true,
    },
  })

  const pengurus = positionAssignments.map((pa) => ({
    id: pa.id,
    memberName: pa.member?.fullName ?? "",
    roleTitle: pa.position?.title ?? "Pengurus",
    avatarUrl: pa.member?.photo,
    bio: pa.member?.bio,
  }))

  return <StrukturSectionClient pengurus={pengurus} />
}


