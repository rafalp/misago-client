export const formatDate = (date: Date, locale: string): string => {
  return date.toLocaleString(locale, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  })
}

export const formatDateShort = (date: Date, locale: string): string => {
  return date.toLocaleString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export const formatTime = (date: Date, locale: string): string => {
  return date.toLocaleString(locale, {
    hour: "numeric",
    minute: "numeric",
  })
}
