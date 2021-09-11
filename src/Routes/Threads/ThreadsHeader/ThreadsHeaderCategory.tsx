import React from "react"
import ThreadsHeader from "./ThreadsHeader"
import { CategoryBanner } from "../../../types"

interface ThreadsHeaderCategoryProps {
  category: {
    name: string
    color: string | null
    banner: { full: CategoryBanner; half: CategoryBanner } | null
    threads: number
    posts: number
  }
}

const ThreadsHeaderCategory: React.FC<ThreadsHeaderCategoryProps> = ({
  category,
}) => (
  <ThreadsHeader
    banner={category.banner}
    color={category.color}
    stats={category}
    text={category.name}
  />
)

export default ThreadsHeaderCategory
