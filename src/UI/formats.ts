import { plural, t } from "@lingui/macro"

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

const KB = 1024
const MB = KB * 1024
const GB = MB * 1024

export const roundFileSize = (size: number): string => {
  const rounded = parseFloat(String(size)).toFixed(2)
  if (rounded.substring(rounded.length - 3) === ".00") {
    return rounded.substring(0, rounded.length - 3)
  }
  if (rounded.substring(rounded.length - 1) === "0") {
    return rounded.substring(0, rounded.length - 1)
  }
  return rounded
}

export const formatFileSize = (size: number): string => {
  if (size >= GB) {
    const rounded = roundFileSize(size / GB)

    return t({
      id: "gigabytes",
      message: plural(rounded, {
        one: `${rounded} gigabytes`,
        other: `${rounded} gigabytes`,
      }),
    })
  }

  if (size >= MB) {
    const rounded = roundFileSize(size / MB)

    return t({
      id: "megabytes",
      message: plural(rounded, {
        one: `${rounded} megatybe`,
        other: `${rounded} megatybes`,
      }),
    })
  }

  if (size >= KB) {
    const rounded = roundFileSize(size / KB)

    return t({
      id: "kilobytes",
      message: plural(rounded, {
        one: `${rounded} kilobyte`,
        other: `${rounded} kilobytes`,
      }),
    })
  }

  return t({
    id: "bytes",
    message: plural(size, {
      one: `${size} byte`,
      other: `${size} bytes`,
    }),
  })
}

export const formatFileSizeShort = (size: number): string => {
  if (size >= GB) {
    const rounded = roundFileSize(size / GB)
    return `${rounded} GB`
  }

  if (size >= MB) {
    const rounded = roundFileSize(size / MB)
    return `${rounded} MB`
  }

  if (size >= KB) {
    const rounded = roundFileSize(size / KB)
    return `${rounded} KB`
  }

  return `${size} B`
}
