import { t } from "@lingui/macro"
import React from "react"
import { UploadValidationError } from "../UI/ValidationError"

const ERROR_TYPES_MAP: Record<string, string> = {
  required: "value_error.missing",
}

interface Error {
  message: React.ReactNode
  type: string
}

interface AvatarValidationErrorProps {
  children: (error: Error) => React.ReactElement
  error?: Error | null
  value?: File | null
  uploadMaxSize: number
  imageMinSize: number
  messages?: {
    [type: string]: React.ReactNode
  } | null
}

const AvatarValidationError: React.FC<AvatarValidationErrorProps> = ({
  children,
  error,
  messages,
  value,
  uploadMaxSize,
  imageMinSize,
}) => {
  if (!error) return null

  const errorType = ERROR_TYPES_MAP[error.type] || error.type
  if (messages && messages[errorType]) {
    return children({ type: errorType, message: messages[errorType] })
  }

  switch (errorType) {
    case "value_error.image":
    case "value_error.upload.content_type":
      return children({
        type: errorType,
        message: t({
          id: "value_error.image",
          message: `Uploaded file is not a valid image.`,
        }),
      })

    case "value_error.image.min_size":
      return children({
        type: errorType,
        message: t({
          id: "value_error.image.min_size",
          message: `Uploaded image shouldn't be smaller than ${imageMinSize}x${imageMinSize}px.`,
        }),
      })
  }

  return (
    <UploadValidationError
      error={error}
      value={value?.size}
      max={uploadMaxSize}
    >
      {children}
    </UploadValidationError>
  )
}

export default AvatarValidationError
