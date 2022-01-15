import classnames from "classnames"
import React from "react"
import { useFieldContext } from "../Form"
import useRegisterFieldHook from "../useRegisterFieldHook"

interface TextareaProps {
  className?: string
  disabled?: boolean
  id?: string
  invalid?: boolean
  maxLength?: number
  name?: string
  placeholder?: string
  required?: boolean
  rows?: number
  onBlur?: (event: React.BaseSyntheticEvent<object, any, any>) => void
  onChange?: (event: React.BaseSyntheticEvent<object, any, any>) => void
}

const Textarea: React.FC<TextareaProps> = ({
  className,
  disabled,
  id,
  invalid,
  maxLength,
  name,
  placeholder,
  required,
  rows,
  onBlur,
  onChange,
}) => {
  const context = useFieldContext()
  const register = useRegisterFieldHook<HTMLTextAreaElement>(
    name || context.name,
    { onBlur, onChange }
  )

  return (
    <textarea
      className={classnames(
        "form-control",
        { "is-invalid": invalid || context.invalid },
        className
      )}
      disabled={disabled || context.disabled}
      id={id || context.id}
      maxLength={maxLength}
      placeholder={placeholder}
      required={required || context.required}
      rows={rows || 5}
      {...register}
    />
  )
}

export default Textarea
