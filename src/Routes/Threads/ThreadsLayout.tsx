import React from "react"
import CategoriesNav from "../../UI/CategoriesNav"
import { Layout, LayoutMain, LayoutSide } from "../../UI/Layout"
import ResetScrollOnNav from "../../UI/ResetScrollOnNav"
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
        <ResetScrollOnNav selector="a">
          <CategoriesNav active={activeCategory} />
        </ResetScrollOnNav>
      </LayoutSide>
      <LayoutMain>
        <ThreadsCategoriesModalButton active={activeCategory} />
        {children}
      </LayoutMain>
    </Layout>
  </RouteContainer>
)

export default ThreadsLayout
