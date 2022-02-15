import { t } from "@lingui/macro"
import React from "react"
import ValidationError from "./ValidationError"
import { ValidationErrorProps } from "./ValidationError.types"

const ERROR_TYPES_MAP: Record<string, string> = {
  required: "value_error.missing",
}

const CategoryValidationError: React.FC<ValidationErrorProps> = ({
  children,
  error,
  messages,
  value = 0,
  min = 0,
  max = 0,
}) => {
  if (!error) return null

  const errorType = ERROR_TYPES_MAP[error.type] || error.type
  if (messages && messages[errorType]) {
    return children({ type: errorType, message: messages[errorType] })
  }

  switch (errorType) {
    case "value_error.missing":
      return children({
        type: errorType,
        message: t({
          id: "category_error.missing",
          message: "Select category.",
        }),
      })

    case "auth_error.not_moderator":
      return children({
        type: errorType,
        message: t({
          id: "category_error.not_moderator",
          message: "You can't moderate this category.",
        }),
      })

    case "category_error.closed":
      return children({
        type: errorType,
        message: t({
          id: "category_error.closed",
          message: "This category is closed.",
        }),
      })

    case "category_error.not_found":
      return children({
        type: errorType,
        message: t({
          id: "category_error.not_found",
          message: "Category could not be found.",
        }),
      })
  }

  return (
    <ValidationError error={error} value={value} min={min} max={max}>
      {children}
    </ValidationError>
  )
}

export default CategoryValidationError
