import classnames from "classnames"
import React from "react"
import { UseFormRegisterReturn } from "react-hook-form"

interface EditorTextareaProps {
  disabled?: boolean
  hidden?: boolean
  invalid?: boolean
  register?: UseFormRegisterReturn
}

const EditorTextarea: React.FC<EditorTextareaProps> = ({
  disabled,
  hidden,
  invalid,
  register,
}) => (
  <textarea
    className={classnames(
      "form-control form-control-responsive form-editor-textarea",
      {
        "d-none": hidden,
        "is-invalid": invalid,
      }
    )}
    disabled={disabled}
    {...register}
  />
)

export default EditorTextarea
