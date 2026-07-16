const SHORT_MONTHS_ID = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"]
const LONG_MONTHS_ID = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
]

function getUtcDateParts(value: Date | string) {
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return null

  return {
    day: date.getUTCDate(),
    month: date.getUTCMonth(),
    year: date.getUTCFullYear(),
    hour: date.getUTCHours(),
    minute: date.getUTCMinutes(),
  }
}

export function formatDateId(value: Date | string, monthStyle: "short" | "long" = "short") {
  const parts = getUtcDateParts(value)
  if (!parts) return "-"

  const months = monthStyle === "long" ? LONG_MONTHS_ID : SHORT_MONTHS_ID
  return `${parts.day} ${months[parts.month]} ${parts.year}`
}

export function formatTimeId(value: Date | string) {
  const parts = getUtcDateParts(value)
  if (!parts) return "-"

  return `${String(parts.hour).padStart(2, "0")}.${String(parts.minute).padStart(2, "0")}`
}

export function formatCurrencyId(value: number) {
  const sign = value < 0 ? "-" : ""
  const digits = Math.abs(Math.trunc(value)).toString()
  const formatted = digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  return `${sign}Rp ${formatted}`
}
