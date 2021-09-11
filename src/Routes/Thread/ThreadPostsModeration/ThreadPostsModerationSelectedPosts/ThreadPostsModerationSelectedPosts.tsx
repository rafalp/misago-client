import { Trans } from "@lingui/macro"
import React from "react"
import { Field, FieldError } from "../../../../UI/Form"
import { PostsValidationError } from "../../../../UI/ValidationError"
import { MutationError } from "../../../../types"
import { Post } from "../../Thread.types"
import ThreadPostsModerationSelectedPostsButton from "./ThreadPostsModerationSelectedPostsButton"
import ThreadPostsModerationSelectedPostsList from "./ThreadPostsModerationSelectedPostsList"

interface ThreadPostsModerationSelectedPostsProps {
  errors?: Record<string, MutationError>
  posts: Array<Post>
  min: number
  max: number
}

const ThreadPostsModerationSelectedPosts: React.FC<ThreadPostsModerationSelectedPostsProps> = ({
  errors,
  posts,
  min,
  max,
}) => {
  const [isOpen, setState] = React.useState<boolean>(posts.length < 3)

  return (
    <Field
      label={<Trans id="moderation.selected_posts">Selected posts</Trans>}
      name="posts"
      input={
        <>
          <div className={isOpen ? "" : "d-none"}>
            <ThreadPostsModerationSelectedPostsList
              errors={errors}
              posts={posts}
            />
          </div>
          {!isOpen && (
            <ThreadPostsModerationSelectedPostsButton
              postsCount={posts.length}
              onClick={() => setState(true)}
            />
          )}
        </>
      }
      error={(error, value) => (
        <PostsValidationError
          error={error}
          max={max}
          min={min}
          value={value.length}
        >
          {({ message }) => <FieldError>{message}</FieldError>}
        </PostsValidationError>
      )}
    />
  )
}

export default ThreadPostsModerationSelectedPosts
