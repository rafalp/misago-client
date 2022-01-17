import { Trans } from "@lingui/macro"
import React from "react"
import * as Yup from "yup"
import { useBulkActionLimit } from "../../../../Context"
import { Form, FormFooter } from "../../../../UI/Form"
import { ModalAlert, ModalFormBody, ModalFooter } from "../../../../UI/Modal"
import RootError from "../../../../UI/RootError"
import { useSelectionErrors } from "../../../../UI/useSelectionErrors"
import { Post, Thread } from "../../Thread.types"
import ThreadPostsModerationError from "../ThreadPostsModerationError"
import ThreadPostsModerationSelectedPosts from "../ThreadPostsModerationSelectedPosts"
import usePostsBulkDeleteMutation from "./usePostsBulkDeleteMutation"

interface ThreadPostsModerationDeleteProps {
  thread: Thread
  posts: Array<Post>
  page: number | undefined
  close: () => void
}

interface FormValues {
  posts: Array<Post>
}

const ThreadPostsModerationDelete: React.FC<ThreadPostsModerationDeleteProps> = ({
  thread,
  posts,
  page,
  close,
}) => {
  const {
    errors: selectionErrors,
    setErrors: setSelectionErrors,
  } = useSelectionErrors<Post>("posts")

  const {
    data,
    loading,
    postsBulkDelete,
    error: graphqlError,
  } = usePostsBulkDeleteMutation()

  const bulkActionLimit = useBulkActionLimit()
  const validators = Yup.object().shape({
    posts: Yup.array()
      .min(1, "value_error.list.min_items")
      .max(bulkActionLimit, "value_error.list.max_items"),
  })

  if (data?.postsBulkDelete.errors) {
    return (
      <ThreadPostsModerationError
        posts={posts}
        selectionErrors={selectionErrors}
        errors={data.postsBulkDelete.errors}
        close={close}
        forDelete
      />
    )
  }

  return (
    <Form<FormValues>
      id="delete_posts_form"
      disabled={loading}
      defaultValues={{ posts }}
      validators={validators}
      onSubmit={async ({ data: { posts } }) => {
        try {
          const result = await postsBulkDelete(thread, posts, page)
          if (result.data?.postsBulkDelete.errors) {
            setSelectionErrors(posts, result.data.postsBulkDelete.errors)
          } else {
            close()
          }
        } catch (error) {
          // do nothing when postsBulkDelete throws
          return
        }
      }}
    >
      <RootError graphqlError={graphqlError}>
        {({ message }) => <ModalAlert>{message}</ModalAlert>}
      </RootError>
      <ModalFormBody>
        <ThreadPostsModerationSelectedPosts
          max={bulkActionLimit}
          min={1}
          posts={posts}
        />
      </ModalFormBody>
      <ModalFooter>
        <FormFooter
          submitText={<Trans id="moderation.delete">Delete</Trans>}
          loading={loading}
          danger
          onCancel={close}
        />
      </ModalFooter>
    </Form>
  )
}

export default ThreadPostsModerationDelete
