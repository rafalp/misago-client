import classnames from "classnames"
import React from "react"
import Icon from "../Icon"
import { ButtonProps } from "./Button.types"
import ButtonSpinner from "./ButtonSpinner"

const Button: React.FC<ButtonProps> = ({
  block,
  className,
  disabled,
  elementRef,
  icon,
  image,
  loading,
  responsive,
  small,
  text,
  onClick,
}) => {
  return (
    <button
      className={classnames(
        "btn",
        {
          "btn-block": block,
          "btn-img": image,
          "btn-responsive": responsive,
          "btn-loading": loading,
          "btn-sm": small,
        },
        className
      )}
      ref={elementRef}
      type={onClick ? "button" : "submit"}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {icon && !loading && <Icon icon={icon} fixedWidth />}
      {!loading && image}
      {loading && <ButtonSpinner />}
      {text && <span>{text}</span>}
    </button>
  )
}

export default Button
