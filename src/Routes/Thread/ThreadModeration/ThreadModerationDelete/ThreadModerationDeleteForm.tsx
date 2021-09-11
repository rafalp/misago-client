import { Trans } from "@lingui/macro"
import React from "react"
import { useHistory } from "react-router-dom"
import { useToastsContext } from "../../../../Context"
import { Form, FormFooter } from "../../../../UI/Form"
import {
  ModalAlert,
  ModalMessageBody,
  ModalFooter,
} from "../../../../UI/Modal"
import RootError from "../../../../UI/RootError"
import * as urls from "../../../../urls"
import { Thread } from "../../Thread.types"
import ThreadModerationError from "../ThreadModerationError"
import useDeleteThreadMutation from "./useDeleteThreadMutation"

interface ThreadModerationDeleteFormProps {
  thread: Thread
  close: () => void
}

interface FormValues {}

const ThreadModerationDeleteForm: React.FC<ThreadModerationDeleteFormProps> = ({
  thread,
  close,
}) => {
  const history = useHistory()
  const { showToast } = useToastsContext()

  const {
    data,
    loading,
    deleteThread,
    error: graphqlError,
  } = useDeleteThreadMutation()

  if (data?.deleteThread.errors) {
    return (
      <ThreadModerationError
        errors={data.deleteThread.errors}
        close={close}
        forDelete
      />
    )
  }

  return (
    <Form<FormValues>
      id="delete_thread_form"
      disabled={loading}
      onSubmit={async () => {
        try {
          const result = await deleteThread(thread)

          if (!result.data?.deleteThread.errors) {
            window.setTimeout(() => {
              showToast(
                <Trans id="moderation.thread_deleted">
                  Thread "{thread.title}" has been deleted.
                </Trans>
              )
              history.push(urls.category(thread.category))
            }, 0)

            close()
          }
        } catch (error) {
          // do nothing when deleteThread throws
          return
        }
      }}
    >
      <RootError graphqlError={graphqlError}>
        {({ message }) => <ModalAlert>{message}</ModalAlert>}
      </RootError>
      <ModalMessageBody
        header={
          <Trans id="moderation.delete_thread_prompt">
            Are you sure you want to delete this thread?
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
            <Trans id="moderation.delete_thread.submit">Delete thread</Trans>
          }
          loading={loading}
          danger
          onCancel={close}
        />
      </ModalFooter>
    </Form>
  )
}

export default ThreadModerationDeleteForm
