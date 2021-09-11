import React from "react"
import { RootContainer, categories } from "../../../UI/Storybook"
import ThreadBreadcrumbs from "./ThreadBreadcrumbs"

export default {
  title: "Route/Thread/Breadcrumbs",
}

export const Category = () => (
  <RootContainer>
    <ThreadBreadcrumbs category={categories[0]} />
  </RootContainer>
)

export const ChildCategory = () => (
  <RootContainer>
    <ThreadBreadcrumbs
      category={Object.assign({}, categories[0].children[0], {
        parent: categories[0],
      })}
    />
  </RootContainer>
)
