import { withKnobs, boolean } from "@storybook/addon-knobs"
import { RootContainer, categories } from "../../../UI/Storybook"
import { PageUrl } from "../Threads.types"
import ThreadsToolbar from "./ThreadsToolbar"

export default {
  title: "Route/Threads/Toolbar",
  decorators: [withKnobs],
}

const pageUrl: PageUrl = ({ after, before }) => "#"

export const Default = () => (
  <RootContainer>
    <ThreadsToolbar
      acl={{ start: boolean("acl.start", true) }}
      pageUrl={pageUrl}
    />
  </RootContainer>
)

export const Category = () => (
  <RootContainer>
    <ThreadsToolbar
      acl={{ start: boolean("acl.start", true) }}
      category={categories[0]}
      pageUrl={pageUrl}
    />
  </RootContainer>
)
