import classnames from "classnames"
import React from "react"
import { FieldValues, UseFormRegister } from "react-hook-form"

interface EditorTextareaProps {
  disabled?: boolean
  hidden?: boolean
  invalid?: boolean
  name: string
  register?: UseFormRegister<FieldValues>
}

const EditorTextarea: React.FC<EditorTextareaProps> = ({
  disabled,
  hidden,
  invalid,
  name,
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
    name={name}
    {...register}
  />
)

export default EditorTextarea
