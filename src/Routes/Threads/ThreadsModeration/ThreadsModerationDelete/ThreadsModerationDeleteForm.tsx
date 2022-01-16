import { Plural } from "@lingui/macro"
import React from "react"
import * as Yup from "yup"
import { useBulkActionLimit } from "../../../../Context"
import { Form, FormFooter } from "../../../../UI/Form"
import { ModalAlert, ModalFormBody, ModalFooter } from "../../../../UI/Modal"
import RootError from "../../../../UI/RootError"
import { useSelectionErrors } from "../../../../UI/useSelectionErrors"
import { Category } from "../../../../types"
import { Thread } from "../../Threads.types"
import ThreadsModerationError from "../ThreadsModerationError"
import ThreadsModerationSelectedThreads from "../ThreadsModerationSelectedThreads"
import useThreadsBulkDeleteMutation from "./useThreadsBulkDeleteMutation"

interface ThreadsModerationDeleteFormProps {
  category?: Category | null
  threads: Array<Thread>
  close: () => void
}

interface FormValues {
  threads: Array<Thread>
}

const ThreadsModerationDeleteForm: React.FC<ThreadsModerationDeleteFormProps> = ({
  category,
  threads,
  close,
}) => {
  const {
    errors: threadsErrors,
    clearErrors: clearThreadsErrors,
    setErrors: setThreadsErrors,
  } = useSelectionErrors<Thread>("threads")

  const {
    data,
    loading,
    threadsBulkDelete,
    error: graphqlError,
  } = useThreadsBulkDeleteMutation()

  const bulkActionLimit = useBulkActionLimit()
  const validators = Yup.object().shape({
    threads: Yup.array()
      .min(1, "value_error.list.min_items")
      .max(bulkActionLimit, "value_error.list.max_items"),
  })

  if (data?.threadsBulkDelete.errors) {
    return (
      <ThreadsModerationError
        errors={data.threadsBulkDelete.errors}
        threads={threads}
        close={close}
        forDelete
      />
    )
  }

  return (
    <Form<FormValues>
      id="delete_threads_form"
      disabled={loading}
      defaultValues={{ threads }}
      validators={validators}
      onSubmit={async ({ clearErrors, setError, data: { threads } }) => {
        clearErrors()
        clearThreadsErrors()

        try {
          const result = await threadsBulkDelete(threads, category)
          const { errors } = result.data?.threadsBulkDelete || {}

          if (errors) {
            setThreadsErrors(threads, errors)
            errors?.forEach(({ location, type, message }) => {
              setError(location, { type, message })
            })
          } else {
            close()
          }
        } catch (error) {
          // do nothing when threadsBulkDelete throws
          return
        }
      }}
    >
      <RootError
        graphqlError={graphqlError}
        dataErrors={data?.threadsBulkDelete.errors}
      >
        {({ message }) => <ModalAlert>{message}</ModalAlert>}
      </RootError>
      <ModalFormBody>
        <ThreadsModerationSelectedThreads
          errors={threadsErrors}
          max={bulkActionLimit}
          min={1}
          threads={threads}
        />
      </ModalFormBody>
      <ModalFooter>
        <FormFooter
          submitText={
            <Plural
              id="moderation.delete_threads.submit"
              value={threads.length}
              one="Delete # thread"
              other="Delete # threads"
            />
          }
          loading={loading}
          danger
          onCancel={close}
        />
      </ModalFooter>
    </Form>
  )
}

export default ThreadsModerationDeleteForm
