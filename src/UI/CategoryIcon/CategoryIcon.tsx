import React from "react"
import Icon from "../Icon"

interface CategoryIconProps {
  className?: string
  category?: {
    icon: string | null
  } | null
}

const CategoryIcon: React.FC<CategoryIconProps> = ({
  className,
  category,
}) => (
  <span className={className || "category-icon"}>
    {category?.icon ? (
      <i className={category.icon + " fa-fw"} />
    ) : (
      <Icon icon="comment-alt" fixedWidth />
    )}
  </span>
)

export default CategoryIcon
