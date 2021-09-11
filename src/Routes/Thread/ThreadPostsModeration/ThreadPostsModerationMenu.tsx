import { Trans } from "@lingui/macro"
import React from "react"
import { DropdownButton, DropdownDivider } from "../../../UI/Dropdown"
import { PostsModeration } from "./ThreadPostsModeration.types"

interface ThreadPostsModerationMenuProps {
  moderation: PostsModeration
  selection: {
    selected: Array<any>
    clear: () => void
  }
}

const ThreadPostsModerationMenu: React.FC<ThreadPostsModerationMenuProps> = ({
  moderation,
  selection,
}) => (
  <>
    {moderation.actions.map((action) => (
      <DropdownButton
        key={action.icon}
        text={action.name}
        icon={action.icon}
        onClick={action.action}
      />
    ))}
    <DropdownDivider />
    {selection && (
      <DropdownButton
        text={<Trans id="clear_selection">Clear selection</Trans>}
        icon="far fa-square"
        onClick={selection.clear}
      />
    )}
  </>
)

export default ThreadPostsModerationMenu
