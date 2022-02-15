import { t } from "@lingui/macro"
import React from "react"
import ValidationError from "./ValidationError"
import { ValidationErrorProps } from "./ValidationError.types"

const ERROR_TYPES_MAP: Record<string, string> = {
  required: "value_error.missing",
}

const ThreadValidationError: React.FC<ValidationErrorProps> = ({
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
    case "auth_error.not_moderator":
      return children({
        type: errorType,
        message: t({
          id: "auth_error.not_moderator.thread",
          message: "You can't moderate this thread.",
        }),
      })

    case "category_error.closed":
      return children({
        type: errorType,
        message: t({
          id: "thread_error.category.closed",
          message: "This thread's category is closed.",
        }),
      })

    case "thread_error.closed":
      return children({
        type: errorType,
        message: t({
          id: "thread_error.closed",
          message: "This thread is closed.",
        }),
      })

    case "thread_error.not_author":
      return children({
        type: errorType,
        message: t({
          id: "thread_error.not_author",
          message:
            "You need to be this thread's author to perform this action.",
        }),
      })

    case "thread_error.not_found":
      return children({
        type: errorType,
        message: t({
          id: "thread_error.not_found",
          message: "Thread could not be found.",
        }),
      })
  }

  return (
    <ValidationError error={error} value={value} min={min} max={max}>
      {children}
    </ValidationError>
  )
}

export default ThreadValidationError
