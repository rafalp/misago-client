import React from "react"
import * as urls from "../../urls"
import CategoryIcon from "../CategoryIcon"
import { SideNavItem } from "../SideNav"
import { ActiveCategory, Category } from "./CategoriesNav.types"

interface CategoriesNavItemProps {
  category: Category
  active?: ActiveCategory | null
}

const CategoriesNavItem: React.FC<CategoriesNavItemProps> = ({
  category,
  active,
}) => {
  const isActive = category.id === active?.parent.id

  return (
    <React.Fragment key={category.id}>
      <SideNavItem
        hasChildren={category.children.length > 0}
        icon={<CategoryIcon category={category} />}
        style={
          category.color ? { "--color-theme": category.color } : undefined
        }
        to={urls.category(category)}
        isActive={isActive}
      >
        {category.name}
      </SideNavItem>
      {isActive &&
        category.children.map((child) => (
          <SideNavItem
            icon={<CategoryIcon category={child} />}
            key={child.id}
            style={
              category.color ? { "--color-theme": category.color } : undefined
            }
            to={urls.category(child)}
            isActive={active?.category.id === child.id}
            isChild
          >
            {child.name}
          </SideNavItem>
        ))}
    </React.Fragment>
  )
}

export default CategoriesNavItem
