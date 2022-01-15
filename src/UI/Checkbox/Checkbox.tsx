import React from "react"
import { useFieldContext } from "../Form"
import useRegisterFieldHook from "../useRegisterFieldHook"

interface CheckboxProps {
  checked?: boolean
  disabled?: boolean
  id?: string
  name?: string
  required?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  disabled,
  id,
  name,
  required,
  onChange,
}) => {
  const context = useFieldContext()
  const register = useRegisterFieldHook<HTMLInputElement>(
    name || context.name,
    { onChange }
  )

  return (
    <span className="form-check-input">
      <input
        id={id || context.id}
        type="checkbox"
        checked={checked}
        disabled={disabled || context.disabled}
        required={required}
        {...register}
      />
    </span>
  )
}

export default Checkbox
