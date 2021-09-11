import { action } from "@storybook/addon-actions"
import React from "react"
import { RootContainer, categories } from "../../../UI/Storybook"
import PostThreadCategoryInputBody from "./PostThreadCategoryInputBody"
import PostThreadCategoryInputPlaceholder from "./PostThreadCategoryInputPlaceholder"
import PostThreadCategoryInputValue from "./PostThreadCategoryInputValue"

const openPicker = action("open modal with categories")

export default {
  title: "Route/Post Thread/Category Input",
}

export const Empty = () => (
  <RootContainer>
    <PostThreadCategoryInputBody onClick={openPicker}>
      <PostThreadCategoryInputPlaceholder />
    </PostThreadCategoryInputBody>
  </RootContainer>
)

export const EmptyDisabled = () => (
  <RootContainer>
    <PostThreadCategoryInputBody onClick={openPicker} disabled>
      <PostThreadCategoryInputPlaceholder />
    </PostThreadCategoryInputBody>
  </RootContainer>
)

export const Category = () => (
  <RootContainer>
    <PostThreadCategoryInputBody onClick={openPicker}>
      <PostThreadCategoryInputValue value={{ parent: categories[0] }} />
    </PostThreadCategoryInputBody>
  </RootContainer>
)

export const CategoryDisabled = () => (
  <RootContainer>
    <PostThreadCategoryInputBody onClick={openPicker} disabled>
      <PostThreadCategoryInputValue value={{ parent: categories[0] }} />
    </PostThreadCategoryInputBody>
  </RootContainer>
)

export const ChildCategory = () => (
  <RootContainer>
    <PostThreadCategoryInputBody onClick={openPicker}>
      <PostThreadCategoryInputValue
        value={{ parent: categories[0], child: categories[3] }}
      />
    </PostThreadCategoryInputBody>
  </RootContainer>
)

export const ChildCategoryDisabled = () => (
  <RootContainer>
    <PostThreadCategoryInputBody onClick={openPicker} disabled>
      <PostThreadCategoryInputValue
        value={{ parent: categories[0], child: categories[3] }}
      />
    </PostThreadCategoryInputBody>
  </RootContainer>
)
