import { Trans } from "@lingui/macro"
import React from "react"
import { FormProvider as HookFormProvider } from "react-hook-form"
import { Redirect } from "react-router-dom"
import { useSettingsContext, useToastsContext } from "../../../Context"
import { ButtonPrimary } from "../../../UI/Button"
import {
  Field,
  FieldErrorFloating,
  FieldWatcher,
  FormContext,
} from "../../../UI/Form"
import { PostingFormAlert, PostingFormLoader } from "../../../UI/PostingForm"
import { ValidationError } from "../../../UI/ValidationError"
import * as urls from "../../../urls"
import ThreadPostRootError from "../ThreadPostRootError"
import { ThreadReplyContextData } from "./ThreadReplyContext"
import ThreadReplyDialog from "./ThreadReplyDialog"
import usePostCreateMutation from "./usePostCreateMutation"

const Editor = React.lazy(() => import("../../../Editor"))

interface ThreadReplyNewFormProps {
  context: ThreadReplyContextData
  threadId: string
}

const ThreadReplyNewForm: React.FC<ThreadReplyNewFormProps> = ({
  context,
  threadId,
}) => {
  const { postMinLength } = useSettingsContext()
  const { showToast } = useToastsContext()
  const { form, setDraft, removeDraft } = context

  const [
    postCreate,
    { data, loading, error: graphqlError },
  ] = usePostCreateMutation()

  if (data?.postCreate.thread && data?.postCreate.post) {
    return (
      <Redirect
        to={urls.threadPost(data.postCreate.thread, data.postCreate.post)}
      />
    )
  }

  return (
    <ThreadReplyDialog>
      <HookFormProvider {...form}>
        <FormContext.Provider
          value={{ disabled: loading, id: "thread_post_reply" }}
        >
          <form
            onSubmit={form.handleSubmit(async (data, event) => {
              if (loading) {
                event?.preventDefault()
                return
              }

              form.clearErrors()

              const result = await postCreate({
                variables: {
                  input: {
                    thread: threadId,
                    markup: data.markup,
                  },
                },
              })
              const { errors, post } = result.data?.postCreate || {}

              errors?.forEach(({ location, type, message }) => {
                form.setError(location as "markup", { type, message })
              })

              if (post) {
                removeDraft()

                showToast(
                  <Trans id="post_reply.message">Reply has been posted.</Trans>
                )
              }
            })}
          >
            <FieldWatcher name="markup" onChange={setDraft} />
            <ThreadPostRootError
              graphqlError={graphqlError}
              dataErrors={data?.postCreate.errors}
            >
              {({ message }) => <PostingFormAlert>{message}</PostingFormAlert>}
            </ThreadPostRootError>
            <React.Suspense fallback={<PostingFormLoader />}>
              <Field
                label={
                  <Trans id="posting.placeholder">Message contents</Trans>
                }
                name="markup"
                className="form-group-editor form-group-with-floating-error"
                input={
                  <Editor
                    submit={
                      <ButtonPrimary
                        text={
                          <Trans id="posting.submit_reply">Post reply</Trans>
                        }
                        loading={loading}
                        small
                      />
                    }
                  />
                }
                error={(error, value) => (
                  <ValidationError
                    error={error}
                    value={value.trim().length}
                    min={postMinLength}
                  >
                    {({ type, message }) => (
                      <FieldErrorFloating
                        key={context.form.formState.submitCount}
                        type={type}
                      >
                        {message}
                      </FieldErrorFloating>
                    )}
                  </ValidationError>
                )}
                labelReaderOnly
              />
            </React.Suspense>
          </form>
        </FormContext.Provider>
      </HookFormProvider>
    </ThreadReplyDialog>
  )
}

export default ThreadReplyNewForm
