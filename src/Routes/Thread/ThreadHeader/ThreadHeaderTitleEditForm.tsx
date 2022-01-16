import { Trans } from "@lingui/macro"
import React from "react"
import * as Yup from "yup"
import { useSettingsContext } from "../../../Context"
import { CardAlert, CardBody } from "../../../UI/Card"
import { Field, FieldError, Form, FormFooter } from "../../../UI/Form"
import Input from "../../../UI/Input"
import { ThreadTitleValidationError } from "../../../UI/ValidationError"
import { Thread } from "../Thread.types"
import ThreadRootError from "../ThreadRootError"
import useThreadTitleUpdateMutation from "./useThreadTitleUpdateMutation"

interface ThreadHeaderTitleEditFormProps {
  thread: Thread
  close: () => void
}

interface FormValues {
  title: string
}

const ThreadHeaderTitleEditForm: React.FC<ThreadHeaderTitleEditFormProps> = ({
  close,
  thread,
}) => {
  const { threadTitleMaxLength, threadTitleMinLength } = useSettingsContext()

  const {
    data,
    loading,
    threadTitleUpdate,
    error: graphqlError,
  } = useThreadTitleUpdateMutation(thread)

  const validators = Yup.object().shape({
    title: Yup.string()
      .required("value_error.missing")
      .min(threadTitleMinLength, "value_error.any_str.min_length")
      .max(threadTitleMaxLength, "value_error.any_str.max_length")
      .matches(/[a-zA-Z0-9]/, "value_error.thread_title"),
  })

  return (
    <Form<FormValues>
      id="thread_header_edit_form"
      defaultValues={{ title: thread.title }}
      disabled={loading}
      validators={validators}
      onSubmit={async ({ clearErrors, setError, data: { title } }) => {
        clearErrors()

        try {
          const result = await threadTitleUpdate(title)
          const { errors } = result.data?.threadTitleUpdate || {}

          if (errors) {
            errors?.forEach(({ location, type, message }) => {
              setError(location, { type, message })
            })
          } else {
            close()
          }
        } catch (error) {
          // do nothing when threadTitleUpdate throws
          return
        }
      }}
    >
      <ThreadRootError
        graphqlError={graphqlError}
        dataErrors={data?.threadTitleUpdate.errors}
      >
        {({ message }) => <CardAlert>{message}</CardAlert>}
      </ThreadRootError>
      <CardBody className="thread-header-edit-form">
        <Field
          name="title"
          input={<Input />}
          error={(error, value) => (
            <ThreadTitleValidationError
              error={error}
              value={value.trim().length}
              min={threadTitleMinLength}
              max={threadTitleMaxLength}
            >
              {({ message }) => <FieldError>{message}</FieldError>}
            </ThreadTitleValidationError>
          )}
        />
        <FormFooter
          loading={loading}
          submitText={<Trans id="save">Save</Trans>}
          onCancel={close}
        />
      </CardBody>
    </Form>
  )
}

export default ThreadHeaderTitleEditForm
