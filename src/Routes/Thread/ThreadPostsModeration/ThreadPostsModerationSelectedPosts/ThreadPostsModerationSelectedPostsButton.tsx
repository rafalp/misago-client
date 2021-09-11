import { Plural } from "@lingui/macro"
import React from "react"
import { ButtonSecondary } from "../../../../UI/Button"

interface ThreadPostsModerationSelectedPostsButtonProps {
  postsCount: number
  onClick: () => void
}

const ThreadPostsModerationSelectedPostsButton: React.FC<ThreadPostsModerationSelectedPostsButtonProps> = ({
  postsCount,
  onClick,
}) => (
  <ButtonSecondary
    text={
      <Plural
        id="moderation.see_selected_posts"
        value={postsCount}
        one="See # selected post"
        other="See # selected posts"
      />
    }
    block
    onClick={onClick}
  />
)
export default ThreadPostsModerationSelectedPostsButton
