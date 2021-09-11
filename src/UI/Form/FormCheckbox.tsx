import React from "react"

interface FormCheckboxProps {
  children: React.ReactNode
}

const FormCheckbox: React.FC<FormCheckboxProps> = ({ children }) => (
  <div className="form-check">{children}</div>
)

export default FormCheckbox
