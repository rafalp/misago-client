import classnames from "classnames"
import React from "react"
import { Link } from "react-router-dom"
import CategoryIcon from "../CategoryIcon"

interface Category {
  id: string
  name: string
  color: string | null
  icon: string | null
}

interface CategoryButtonProps {
  active?: boolean
  block?: boolean
  category: Category
  disabled?: boolean
  icon?: React.ReactNode
  link?: string | null
  nowrap?: boolean
  responsive?: boolean
  small?: boolean
  onClick?: () => void
}

const CategoryButton: React.FC<CategoryButtonProps> = ({
  active,
  block,
  category,
  disabled,
  icon,
  link,
  nowrap,
  responsive,
  small,
  onClick,
}) => {
  const className = classnames("btn btn-category", {
    "btn-primary": active,
    "btn-secondary": !active,
    "btn-block": block || nowrap,
    "btn-nowrap": nowrap,
    "btn-wrap": !nowrap,
    "btn-sm": small,
    "btn-responsive": responsive,
  })

  if (link && !disabled) {
    return (
      <Link className={className} to={link} onClick={onClick}>
        <CategoryIcon category={category} />
        <span>{category.name}</span>
        {icon && <span>{icon}</span>}
      </Link>
    )
  }

  return (
    <button
      className={className}
      type="button"
      disabled={disabled}
      onClick={onClick}
    >
      <CategoryIcon category={category} />
      <span>{category.name}</span>
      {icon && <span className="btn-icon-right">{icon}</span>}
    </button>
  )
}

export default CategoryButton
