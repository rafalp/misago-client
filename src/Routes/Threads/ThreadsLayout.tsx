import React from "react"
import CategoriesNav from "../../UI/CategoriesNav"
import { Layout, LayoutMain, LayoutSide } from "../../UI/Layout"
import RouteContainer from "../../UI/RouteContainer"
import { ActiveCategory } from "./Threads.types"
import { ThreadsCategoriesModalButton } from "./ThreadsCategoriesModal"

interface ThreadsLayoutProps {
  activeCategory?: ActiveCategory | null
  className?: string
  children: React.ReactNode
}

const ThreadsLayout: React.FC<ThreadsLayoutProps> = ({
  activeCategory,
  className,
  children,
}) => (
  <RouteContainer className={className}>
    <Layout>
      <LayoutSide>
        <CategoriesNav active={activeCategory} />
      </LayoutSide>
      <LayoutMain>
        <ThreadsCategoriesModalButton active={activeCategory} />
        {children}
      </LayoutMain>
    </Layout>
  </RouteContainer>
)

export default ThreadsLayout
