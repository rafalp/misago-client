import React from "react"
import { useLocation } from "react-router-dom"

type Cursor = number | null | typeof NaN

const useCursorParams = () => {
  const { search } = useLocation()

  return React.useMemo(() => {
    const params = new URLSearchParams(search)
    const cleanAfter = cleanValue(params.get("after"))
    const cleanBefore = cleanValue(params.get("before"))

    if (!isValid(cleanAfter, cleanBefore)) {
      return {
        valid: false,
        after: null,
        before: null,
      }
    }

    return {
      valid: true,
      after: cleanAfter ? String(cleanAfter) : null,
      before: cleanBefore ? String(cleanBefore) : null,
    }
  }, [search])
}

const cleanValue = (value: string | null): Cursor => {
  if (!value) return null

  return Number.parseInt(value)
}

const isValid = (after: Cursor, before: Cursor) => {
  if (after && before) return false
  if (!!after && isNaN(after)) return false
  if (!!after && after < 1) return false
  if (!!before && isNaN(before)) return false
  if (!!before && before < 1) return false

  return true
}

export default useCursorParams
