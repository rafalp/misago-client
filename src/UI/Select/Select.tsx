import classnames from "classnames"
import React from "react"
import { useFieldContext } from "../Form"
import useRegisterFieldHook from "../useRegisterFieldHook"

interface SelectProps {
  className?: string
  disabled?: boolean
  emptyLabel?: string
  emptyValue?: string | number
  id?: string
  invalid?: boolean
  name?: string
  options: Array<SelectOption>
  required?: boolean
  onBlur?: (event: React.BaseSyntheticEvent<object, any, any>) => void
  onChange?: (event: React.BaseSyntheticEvent<object, any, any>) => void
}

interface SelectOption {
  name: React.ReactNode
  value: string | number
}

const Select: React.FC<SelectProps> = ({
  className,
  disabled,
  emptyLabel,
  emptyValue,
  id,
  invalid,
  name,
  options,
  required,
  onBlur,
  onChange,
}) => {
  const context = useFieldContext()
  const register = useRegisterFieldHook<HTMLSelectElement>(name || context.name, { onBlur, onChange })

  return (
    <select
      className={classnames(
        "form-control",
        { "is-invalid": invalid || context.invalid },
        className
      )}
      disabled={disabled || context.disabled}
      id={id || context.id}
      required={required || context.required}
      {...register}
    >
      {typeof emptyValue !== "undefined" && (
        <option value={emptyValue}>{emptyLabel || null}</option>
      )}
      {options.map(({ name, value }) => (
        <option key={value} value={value}>
          {name}
        </option>
      ))}
    </select>
  )
}

export default Select
