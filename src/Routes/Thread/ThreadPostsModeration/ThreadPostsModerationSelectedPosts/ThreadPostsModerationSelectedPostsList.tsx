import React from "react"
import { useFormContext } from "react-hook-form"
import { useFieldContext } from "../../../../UI/Form"
import useSelection from "../../../../UI/useSelection"
import { MutationError } from "../../../../types"
import { Post } from "../../Thread.types"
import ThreadPostsModerationSelectedPostsListItem from "./ThreadPostsModerationSelectedPostsListItem"

interface ThreadPostsModerationSelectedPostsListProps {
  errors?: Record<string, MutationError>
  posts: Array<Post>
}

const ThreadPostsModerationSelectedPostsList: React.FC<ThreadPostsModerationSelectedPostsListProps> = ({
  errors,
  posts,
}) => {
  const context = useFieldContext()
  const name = context ? context.name : undefined

  const { register, unregister, setValue } = useFormContext() || {}
  const { change, selection, selected } = useSelection<Post>(posts, posts)

  React.useEffect(() => {
    if (register && unregister) {
      register({ name: "posts" })
      return () => unregister("posts")
    }
  }, [register, unregister])

  React.useEffect(() => {
    if (name && setValue) {
      setValue("posts", selected)
    }
  }, [name, setValue, selected])

  return (
    <ul className="selected-items selected-posts">
      {posts.map((post) => (
        <ThreadPostsModerationSelectedPostsListItem
          disabled={context && context.disabled}
          error={errors && errors[post.id]}
          id={context && `${context.id}_${context.name}`}
          key={post.id}
          selected={selection[post.id]}
          post={post}
          changeSelection={change}
        />
      ))}
    </ul>
  )
}

export default ThreadPostsModerationSelectedPostsList
