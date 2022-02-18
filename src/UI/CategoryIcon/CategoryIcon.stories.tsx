import React from "react"
import { RootContainer, icons } from "../Storybook"
import CategoryIcon from "./CategoryIcon"

export default {
  title: "UI/CategoryIcon",
}

export const Default = () => (
  <RootContainer>
    <CategoryIcon />
  </RootContainer>
)

export const CustomIcon = () => (
  <RootContainer>
    <CategoryIcon category={{ icon: icons[0] }} />
  </RootContainer>
)
