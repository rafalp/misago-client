import { t } from "@lingui/macro"
import React from "react"
import { Dropdown } from "../UI/Dropdown"
import EditorButton from "./EditorButton"
import { EditorContextData, EditorContextProvider } from "./EditorContext"
import {
  EditorControl,
  EditorControlCode,
  EditorControlImage,
  EditorControlLink,
  EditorControlList,
} from "./EditorControl"
import EditorControlsItem from "./EditorControlsItem"

interface EditorControlsProps {
  children?: React.ReactNode
  disabled?: boolean
  setValue: (value: string) => void
}

const EditorControls: React.FC<EditorControlsProps> = ({
  children,
  disabled,
  setValue,
}) => {
  const [initialized, setInitialized] = React.useState(false)
  const textarea = React.useRef<HTMLTextAreaElement | null>(null)

  const controls: Array<EditorControl> = [
    {
      name: "bold",
      title: t({
        id: "editor.bold",
        message: "Bolder",
      }),
      icon: "fas fa-bold",
      onClick: (context: EditorContextData) => {
        context.replaceSelection({
          prefix: "**",
          suffix: "**",
          default: t({
            id: "editor.bold_default",
            message: "strong text",
          }),
          trim: true,
          lstrip: /(\*|_)+$/,
          rstrip: /^(\*|_)+/,
        })
      },
    },
    {
      name: "emphasis",
      title: t({
        id: "editor.emphasis",
        message: "Emphasize",
      }),
      icon: "fas fa-italic",
      onClick: (context: EditorContextData) => {
        context.replaceSelection({
          prefix: "*",
          suffix: "*",
          default: t({
            id: "editor.emphasis_default",
            message: "emphasized text",
          }),
          trim: true,
          lstrip: /(\*|_)+$/,
          rstrip: /^(\*|_)+/,
        })
      },
    },
    {
      name: "strikethrough",
      title: t({
        id: "editor.strikethrough",
        message: "Strikethrough",
      }),
      icon: "fas fa-strikethrough",
      onClick: (context: EditorContextData) => {
        context.replaceSelection({
          prefix: "~~",
          suffix: "~~",
          default: t({
            id: "editor.strikethrough_default",
            message: "removed text",
          }),
          trim: true,
          lstrip: /~+$/,
          rstrip: /^~+/,
        })
      },
    },
    {
      name: "hr",
      title: t({
        id: "editor.hr",
        message: "Insert horizontal ruler",
      }),
      icon: "fas fa-minus",
      onClick: (context: EditorContextData) => {
        context.replaceSelection({
          prefix: "\n\n",
          suffix: "\n\n",
          replace: "- - -",
          lstrip: /\s+$/,
          rstrip: /^\s+/,
        })
      },
    },
    {
      name: "link",
      title: t({
        id: "editor.link",
        message: "Insert link",
      }),
      icon: "fas fa-link",
      component: EditorControlLink,
    },
    {
      name: "image",
      title: t({
        id: "editor.image",
        message: "Insert image",
      }),
      icon: "far fa-image",
      component: EditorControlImage,
    },
    {
      name: "list",
      title: t({
        id: "editor.list",
        message: "Insert list",
      }),
      icon: "fas fa-list-ul",
      component: EditorControlList,
    },
    {
      name: "quote",
      title: t({
        id: "editor.quote",
        message: "Quote",
      }),
      icon: "fas fa-quote-right",
      onClick: (context: EditorContextData) => {
        context.replaceSelection({
          prefix: "\n\n[quote]\n",
          suffix: "\n[/quote]\n\n",
          default: t({
            id: "editor.quote_default",
            message: "quoted text",
          }),
          trim: true,
          lstrip: /\s+$/,
          rstrip: /^\s+/,
        })
      },
    },
    {
      name: "spoiler",
      title: t({
        id: "editor.spoiler",
        message: "Spoiler",
      }),
      icon: "far fa-eye-slash",
      onClick: (context: EditorContextData) => {
        context.replaceSelection({
          prefix: "\n\n[spoiler]\n",
          suffix: "\n[/spoiler]\n\n",
          default: t({
            id: "editor.spoiler_default",
            message: "hidden text",
          }),
          trim: true,
          lstrip: /\s+$/,
          rstrip: /^\s+/,
        })
      },
    },
    {
      name: "code",
      title: t({
        id: "editor.code",
        message: "Insert code",
      }),
      icon: "fas fa-code",
      component: EditorControlCode,
    },
  ]

  const isDisabled = disabled || !textarea.current || !initialized

  return (
    <div
      className="col-auto editor-controls"
      ref={(element) => {
        if (element) {
          const editor = element.closest(".form-editor")
          if (editor) {
            textarea.current = editor.querySelector<HTMLTextAreaElement>(
              "textarea"
            )
            setInitialized(!!textarea.current)
          }
        }
      }}
    >
      {children}
      <EditorContextProvider
        disabled={isDisabled}
        textarea={textarea.current}
        setValue={setValue}
      >
        <Dropdown
          className="editor-controls-dropdown"
          placement="top-start"
          toggle={({ ref, toggle }) => (
            <span ref={ref}>
              <EditorButton
                className={"btn-editor-dropdown-toggle"}
                disabled={isDisabled}
                icon="fas fa-ellipsis-h"
                onClick={toggle}
              />
            </span>
          )}
          menu={() => (
            <>
              {controls.map((control) => (
                <EditorControlsItem
                  disabled={isDisabled}
                  key={control.name}
                  {...control}
                />
              ))}
            </>
          )}
        />
        <span className="editor-controls-list">
          {controls.map((control) => (
            <EditorControlsItem
              disabled={isDisabled}
              key={control.name}
              {...control}
            />
          ))}
        </span>
      </EditorContextProvider>
    </div>
  )
}

export default EditorControls
