import classnames from "classnames"
import React from "react"
import { useFieldContext } from "../Form"
import useRegisterFieldHook from "../useRegisterFieldHook"

interface InputProps {
  className?: string
  disabled?: boolean
  id?: string
  invalid?: boolean
  maxLength?: number
  name?: string
  placeholder?: string
  required?: boolean
  responsive?: boolean
  type?: "text" | "email" | "password"
  value?: string
  onBlur?: (event: React.BaseSyntheticEvent<object, any, any>) => void
  onChange?: (event: React.BaseSyntheticEvent<object, any, any>) => void
}

const Input: React.FC<InputProps> = ({
  className,
  disabled,
  id,
  invalid,
  maxLength,
  name,
  placeholder,
  required,
  responsive,
  type,
  value,
  onBlur,
  onChange,
}) => {
  const context = useFieldContext()
  const register = useRegisterFieldHook<HTMLInputElement>(
    name || context.name,
    {
      onBlur,
      onChange,
    }
  )

  return (
    <input
      className={classnames(
        "form-control",
        {
          "form-control-responsive": responsive,
          "is-invalid": invalid || context.invalid,
        },
        className
      )}
      disabled={disabled || context.disabled}
      id={id || context.id}
      maxLength={maxLength}
      placeholder={placeholder}
      required={required || context.required}
      type={type || "text"}
      value={value}
      {...register}
    />
  )
}

export default Input
