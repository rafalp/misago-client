import React from "react"
import * as urls from "../../../urls"
import { ActiveCategory } from "../Threads.types"
import ThreadsCategoriesModalLink from "./ThreadsCategoriesModalLink"

interface ThreadsCategoriesModalActiveItemProps {
  active: ActiveCategory
}

const ThreadsCategoriesModalActiveItem: React.FC<ThreadsCategoriesModalActiveItemProps> = ({
  active,
}) => {
  const { category, parent } = active

  return (
    <>
      <ThreadsCategoriesModalLink
        category={parent}
        text={parent.name}
        to={urls.category(parent)}
        isActive
      />
      {parent.children.map((child) => (
        <ThreadsCategoriesModalLink
          category={child}
          key={child.id}
          text={child.name}
          to={urls.category(child)}
          isActive={child.id === category.id}
          isChild
        />
      ))}
    </>
  )
}

export default ThreadsCategoriesModalActiveItem
