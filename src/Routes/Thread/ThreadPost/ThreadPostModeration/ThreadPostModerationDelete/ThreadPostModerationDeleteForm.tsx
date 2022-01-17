import { Trans } from "@lingui/macro"
import React from "react"
import { Form, FormFooter } from "../../../../../UI/Form"
import {
  ModalAlert,
  ModalMessageBody,
  ModalFooter,
} from "../../../../../UI/Modal"
import RootError from "../../../../../UI/RootError"
import { Post } from "../../../Thread.types"
import ThreadPostModerationError from "../ThreadPostModerationError"
import usePostDeleteMutation from "./usePostDeleteMutation"

interface ThreadPostModerationDeleteFormProps {
  threadId: string
  post: Post
  page?: number
  close: () => void
}

interface FormValues {}

const ThreadPostModerationDeleteForm: React.FC<ThreadPostModerationDeleteFormProps> = ({
  threadId,
  post,
  page,
  close,
}) => {
  const {
    data,
    loading,
    postDelete,
    error: graphqlError,
  } = usePostDeleteMutation()

  if (data?.postDelete.errors) {
    return (
      <ThreadPostModerationError
        errors={data.postDelete.errors}
        close={close}
        forDelete
      />
    )
  }

  return (
    <Form<FormValues>
      id="delete_post_form"
      disabled={loading}
      onSubmit={async () => {
        try {
          const result = await postDelete(threadId, post, page)

          if (!result.data?.postDelete.errors) {
            close()
          }
        } catch (error) {
          // do nothing when postDelete throws
          return
        }
      }}
    >
      <RootError graphqlError={graphqlError}>
        {({ message }) => <ModalAlert>{message}</ModalAlert>}
      </RootError>
      <ModalMessageBody
        header={
          <Trans id="moderation.delete_post_prompt">
            Are you sure you want to delete this post?
          </Trans>
        }
        message={
          <Trans id="moderation.delete_message">
            This action is not reversible!
          </Trans>
        }
      />
      <ModalFooter>
        <FormFooter
          submitText={
            <Trans id="moderation.delete_post.submit">Delete post</Trans>
          }
          loading={loading}
          danger
          onCancel={close}
        />
      </ModalFooter>
    </Form>
  )
}

export default ThreadPostModerationDeleteForm
