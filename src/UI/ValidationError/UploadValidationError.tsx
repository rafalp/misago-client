import { t } from "@lingui/macro"
import React from "react"
import { formatFileSize } from "../formats"
import ValidationError from "./ValidationError"
import { ValidationErrorProps } from "./ValidationError.types"

const ERROR_TYPES_MAP: Record<string, string> = {
  required: "value_error.missing",
}

const UploadValidationError: React.FC<ValidationErrorProps> = ({
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
    case "value_error.upload.content_type":
      return children({
        type: errorType,
        message: t({
          id: "value_error.upload.content_type",
          message: `Uploaded file type is not supported.`,
        }),
      })

    case "value_error.upload.max_size":
      return children({
        type: errorType,
        message: t({
          id: "value_error.upload.max_size",
          message: `Uploaded file can't be larger than ${formatFileSize(
            max
          )} (it has ${formatFileSize(value)}).`,
        }),
      })
  }

  return (
    <ValidationError error={error} value={value} min={min} max={max}>
      {children}
    </ValidationError>
  )
}

export default UploadValidationError
