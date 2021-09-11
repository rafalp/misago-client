import classnames from "classnames"
import { Link } from "react-router-dom"
import React from "react"
import * as urls from "../../urls"
import TidbitItem from "./TidbitItem"

interface TidbitCategoryProps {
  category: {
    id: string
    slug: string
    name: string
    color: string | null
  }
  disabled?: boolean
  parent?: boolean
}

const TidbitCategory: React.FC<TidbitCategoryProps> = ({
  category,
  disabled,
  parent,
}) => (
  <TidbitItem
    className={classnames("tidbit-category", {
      "tidbit-parent-category": parent,
    })}
  >
    {disabled ? (
      <TidbitCategoryContent category={category} />
    ) : (
      <Link to={urls.category(category)}>
        <TidbitCategoryContent category={category} />
      </Link>
    )}
  </TidbitItem>
)

interface TidbitCategoryContentProps {
  category: {
    id: string
    slug: string
    name: string
    color: string | null
  }
}

const TidbitCategoryContent: React.FC<TidbitCategoryContentProps> = ({
  category,
}) => (
  <>
    {category.color && (
      <span
        className="tidbit-category-color"
        style={{ backgroundColor: category.color }}
      />
    )}
    <span className="tidbit-category-name">{category.name}</span>
  </>
)

export default TidbitCategory
