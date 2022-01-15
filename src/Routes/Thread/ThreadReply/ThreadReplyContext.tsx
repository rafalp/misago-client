import { yupResolver } from "@hookform/resolvers/yup"
import { t } from "@lingui/macro"
import React from "react"
import { UseFormReturn, useForm } from "react-hook-form"
import * as Yup from "yup"
import { useSettingsContext } from "../../../Context"
import useNewReplyDraft from "./useNewReplyDraft"
import getQuoteMarkup from "../getQuoteMarkup"

interface ThreadReplyFormValues {
  markup: string
}

interface ThreadReplyPost {
  id: string
}

export interface ThreadReplyContextData {
  isActive: boolean
  fullscreen: boolean
  minimized: boolean
  mode: string
  post: ThreadReplyPost | null
  form: UseFormReturn<ThreadReplyFormValues>
  quote: (range: Range) => void
  startReply: () => boolean
  editReply: (post: ThreadReplyPost) => void
  cancelReply: (force?: boolean) => void
  setFullscreen: (state: boolean) => void
  setMinimized: (state: boolean) => void
  getValue: () => string
  setValue: (value: string, dirty?: boolean) => void
  setDraft: (value: string) => void
  removeDraft: () => void
  resetValue: (value?: string) => void
}

const ThreadReplyContext = React.createContext<ThreadReplyContextData | null>(
  null
)

interface ThreadReplyProviderProps {
  threadId: string
  active?: boolean
  mode?: string
  post?: ThreadReplyPost
  children: React.ReactNode
}

const ThreadReplyProvider: React.FC<ThreadReplyProviderProps> = (props) => {
  const { postMinLength } = useSettingsContext()
  const [isActive, setActive] = React.useState(props.active || false)
  const [mode, setMode] = React.useState(props.mode || "")
  const [post, setPost] = React.useState<ThreadReplyPost | null>(
    props.post || null
  )
  const [fullscreen, setFullscreen] = React.useState(false)
  const [minimized, setMinimized] = React.useState(false)

  const { getDraft, setDraft, removeDraft } = useNewReplyDraft(props.threadId)

  const validators = Yup.object({
    markup: Yup.string()
      .required("value_error.missing")
      .min(postMinLength, "value_error.any_str.min_length"),
  })

  const form = useForm<ThreadReplyFormValues>({
    defaultValues: { markup: "" },
    resolver: yupResolver(validators),
  })

  const formGetValue = form.getValues
  const getValue = React.useCallback(() => formGetValue("markup") || "", [
    formGetValue,
  ])

  const formSetValue = form.setValue
  const setValue = React.useCallback(
    (value: string) => formSetValue("markup", value),
    [formSetValue]
  )

  const formReset = form.reset
  const resetValue = React.useCallback(
    (value?: string) => {
      formReset({ markup: value || "" }, { keepSubmitCount: true })
    },
    [formReset]
  )

  const dirtyFields = form.formState.dirtyFields
  const hasChanges = React.useCallback(() => {
    if (getValue().length === 0) return false
    return !!dirtyFields.markup
  }, [getValue, dirtyFields])

  const startReply = React.useCallback(() => {
    if (isActive && mode === "edit" && hasChanges()) {
      // ask user to confirm mode change
      const confirmed = window.confirm(
        t({
          id: "posting.confirm_cancel_edit_to_reply",
          message:
            "You are currently editing a post. Do you want to abandon your changes and write a new reply instead?",
        })
      )

      if (!confirmed) return false
    }

    resetValue(getDraft())
    setActive(true)
    setMode("reply")
    setPost(null)
    setFullscreen(false)
    setMinimized(false)

    return true
  }, [
    isActive,
    mode,
    getDraft,
    hasChanges,
    setActive,
    setMode,
    setPost,
    setFullscreen,
    setMinimized,
    resetValue,
  ])

  const editReply = React.useCallback(
    (newPost: ThreadReplyPost) => {
      if (isActive && hasChanges()) {
        if (mode === "reply") {
          const confirmed = window.confirm(
            t({
              id: "posting.confirm_cancel_reply_to_edit",
              message:
                "You are currently writing a new reply. Do you want to abandon it and edit this post instead?",
            })
          )

          if (!confirmed) return
        }

        if (mode === "edit" && post?.id !== newPost.id) {
          const confirmed = window.confirm(
            t({
              id: "posting.confirm_cancel_edit_to_edit",
              message:
                "You are currently editing other post. Do you want to abandon your changes and edit this post instead?",
            })
          )

          if (!confirmed) return
        }
      }

      resetValue()
      setActive(true)
      setMode("edit")
      setPost(newPost)
      setFullscreen(false)
      setMinimized(false)
    },
    [
      isActive,
      mode,
      post,
      hasChanges,
      setActive,
      setMode,
      setPost,
      setFullscreen,
      setMinimized,
      resetValue,
    ]
  )

  const cancelReply = React.useCallback(
    (force?: boolean) => {
      if (!force && isActive && getValue().trim().length > 5) {
        // ask user to confirm cancel
        const confirmed = window.confirm(
          t({
            id: "posting.confirm_cancel",
            message: "Are you sure you want to abandon your post?",
          })
        )

        if (!confirmed) return
      }

      setActive(false)
      setMode("reply")
      setPost(null)
      resetValue()
      removeDraft()
    },
    [isActive, getValue, setActive, setMode, setPost, removeDraft, resetValue]
  )

  const quote = React.useCallback(
    (range: Range) => {
      const quoteMarkup = getQuoteMarkup(range)
      const newValue = getValue() + "\n\n" + quoteMarkup
      setValue(newValue.trim() + "\n\n")

      if (!mode) {
        setMode("reply")
      }

      setActive(true)
      setFullscreen(false)
      setMinimized(false)
    },
    [mode, getValue, setValue, setActive]
  )

  return (
    <ThreadReplyContext.Provider
      value={{
        isActive,
        form,
        fullscreen,
        minimized,
        mode,
        post,
        quote,
        setFullscreen,
        setMinimized,
        startReply,
        editReply,
        cancelReply,
        getValue,
        setValue,
        setDraft,
        removeDraft,
        resetValue,
      }}
    >
      {props.children}
    </ThreadReplyContext.Provider>
  )
}

const useThreadReplyContext = () => React.useContext(ThreadReplyContext)

export { ThreadReplyContext, ThreadReplyProvider, useThreadReplyContext }
