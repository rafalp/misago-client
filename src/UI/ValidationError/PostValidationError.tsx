import { t } from "@lingui/macro"
import React from "react"
import ValidationError from "./ValidationError"
import { ValidationErrorProps } from "./ValidationError.types"

const ERROR_TYPES_MAP: Record<string, string> = {
  required: "value_error.missing",
}

const PostValidationError: React.FC<ValidationErrorProps> = ({
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
          id: "auth_error.not_moderator.post",
          message: "You can't moderate this post.",
        }),
      })

    case "category_error.closed":
      return children({
        type: errorType,
        message: t({
          id: "post_error.category.closed",
          message: "This post's category is closed.",
        }),
      })

    case "thread_error.closed":
      return children({
        type: errorType,
        message: t({
          id: "post_error.thread.closed",
          message: "This post's thread is closed.",
        }),
      })

    case "post_error.not_author":
      return children({
        type: errorType,
        message: t({
          id: "post_error.not_author",
          message: "You need to be this post's author to perform this action.",
        }),
      })

    case "post_error.thread_start":
      return children({
        type: errorType,
        message: t({
          id: "post_error.thread_start",
          message: "This post is thread's original post.",
        }),
      })

    case "post.not_found":
      return children({
        type: errorType,
        message: t({
          id: "post.not_found",
          message: "Post could not be found.",
        }),
      })
  }

  return (
    <ValidationError error={error} value={value} min={min} max={max}>
      {children}
    </ValidationError>
  )
}

export default PostValidationError
