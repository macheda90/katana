"use client"

import { useView } from "@/lib/view-store"
import { AllActivitiesPage } from "@/components/pages/all-activities-page"
import { AllNewsPage } from "@/components/pages/all-news-page"
import { AllStrukturPage } from "@/components/pages/all-struktur-page"

interface PageContentProps {
  children: React.ReactNode
  members: any[]
  divisions: any[]
}

export function PageContent({ children, members, divisions }: PageContentProps) {
  const { view } = useView()

  if (view === 'all-activities') {
    return <AllActivitiesPage />
  }

  if (view === 'all-news') {
    return <AllNewsPage />
  }

  if (view === 'all-struktur') {
    return <AllStrukturPage members={members} divisions={divisions} />
  }

  return <>{children}</>
}
