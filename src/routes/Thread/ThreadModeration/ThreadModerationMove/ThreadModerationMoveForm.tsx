import { Trans } from "@lingui/macro"
import React from "react"
import * as Yup from "yup"
import CategorySelect from "../../../../UI/CategorySelect"
import { Field, FieldError, Form, FormFooter } from "../../../../UI/Form"
import { ModalAlert, ModalFormBody, ModalFooter } from "../../../../UI/Modal"
import RootError from "../../../../UI/RootError"
import { CategoryValidationError } from "../../../../UI/ValidationError"
import useLocationError from "../../../../UI/useLocationError"
import { Thread } from "../../Thread.types"
import ThreadModerationError from "../ThreadModerationError"
import useThreadMoveMutation from "./useThreadMoveMutation"

interface ThreadModerationMoveFormProps {
  thread: Thread
  close: () => void
}

interface FormValues {
  category: string
}

const ThreadModerationMoveForm: React.FC<ThreadModerationMoveFormProps> = ({
  thread,
  close,
}) => {
  const {
    data,
    loading,
    threadMove,
    error: graphqlError,
  } = useThreadMoveMutation()

  const threadError = useLocationError("thread", data?.threadMove.errors)

  if (data?.threadMove.errors && threadError) {
    return (
      <ThreadModerationError errors={data.threadMove.errors} close={close} />
    )
  }

  const validators = Yup.object().shape({
    category: Yup.string().required("value_error.missing"),
  })

  return (
    <Form<FormValues>
      id="move_thread_form"
      disabled={loading}
      defaultValues={{ category: "" }}
      validators={validators}
      onSubmit={async ({ clearErrors, setError, data: { category } }) => {
        clearErrors()

        try {
          const result = await threadMove(thread, category)
          const { errors } = result.data?.threadMove || {}

          if (errors) {
            errors?.forEach(({ location, type, message }) => {
              setError(location, { type, message })
            })
          } else {
            close()
          }
        } catch (error) {
          // do nothing when threadMove throws
          return
        }
      }}
    >
      <RootError graphqlError={graphqlError}>
        {({ message }) => <ModalAlert>{message}</ModalAlert>}
      </RootError>
      <ModalFormBody>
        <Field
          label={<Trans id="moderation.new_category">New category</Trans>}
          name="category"
          input={<CategorySelect />}
          error={(error, value) => (
            <CategoryValidationError error={error} value={value}>
              {({ message }) => <FieldError>{message}</FieldError>}
            </CategoryValidationError>
          )}
        />
      </ModalFormBody>
      <ModalFooter>
        <FormFooter
          submitText={
            <Trans id="moderation.move_thread.submit">Move thread</Trans>
          }
          loading={loading}
          onCancel={close}
        />
      </ModalFooter>
    </Form>
  )
}

export default ThreadModerationMoveForm
