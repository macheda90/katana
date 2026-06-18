import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: "center" | "left"
  light?: boolean
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl mb-12",
        align === "center" ? "mx-auto text-center" : "text-left"
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4",
            light
              ? "bg-orange-500/20 border border-orange-500/30"
              : "bg-orange-50 dark:bg-orange-950/30"
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
          <span className={cn(
            "text-xs font-semibold uppercase tracking-wider",
            light ? "text-orange-300" : "text-orange-600"
          )}>
            {eyebrow}
          </span>
        </div>
      )}
      <h2
        className={cn(
          "text-3xl md:text-4xl font-extrabold tracking-tight mb-4",
          light ? "text-white" : "text-[#0F172A] dark:text-white"
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn(
          "text-base md:text-lg leading-relaxed",
          light ? "text-slate-300" : "text-slate-600 dark:text-slate-400"
        )}>
          {description}
        </p>
      )}
    </div>
  )
}
