import React from "react"
import { useFormContext } from "react-hook-form"

interface FieldOptions<T extends HTMLElement> {
  onBlur?: (event: React.FocusEvent<T>) => void
  onChange?: (event: React.ChangeEvent<T>) => void
}

const useRegisterFieldHook = <T extends HTMLElement>(name?: string | null, options?: FieldOptions<T>) => {
  const context = useFormContext()
  if (!context || !name) return options || {}
  
  const props = context.register(name)
  if (!options || (!options.onBlur && !options.onChange)) return props

  return {
    ...context.register,
    onBlur: async (event: React.FocusEvent<T>) => {
      props.onBlur(event)
      if (options.onBlur) await options.onBlur(event)
    },
    onChange: async (event: React.ChangeEvent<T>) => {
      props.onChange(event)
      if (options.onChange) await options.onChange(event)
    }
  }
}

export default useRegisterFieldHook