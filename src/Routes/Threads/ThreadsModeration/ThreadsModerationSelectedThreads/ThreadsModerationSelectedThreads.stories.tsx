import { action } from "@storybook/addon-actions"
import React from "react"
import { Form } from "../../../../UI/Form"
import { ModalFormContainer, categories } from "../../../../UI/Storybook"
import { SelectedThread } from "../../Threads.types"
import ThreadsModerationSelectedThreads from "./"

export default {
  title: "Route/Threads/Moderation/SelectedThreads",
}

interface FormValues {
  threads: Array<SelectedThread>
}

const submit = action("submit form")

export const SingleThread = () => {
  const threads = [
    {
      id: "1",
      title: "Nam id ante ultricies, laoreet leo tempor, venenatis ipsum.",
      replies: 719,
      category: Object.assign({}, categories[0].children[2], {
        parent: categories[0],
      }),
    },
  ]

  return (
    <Form<FormValues> id="threads-select-test" onSubmit={submit}>
      <ModalFormContainer title="Threads moderation" footer>
        <ThreadsModerationSelectedThreads max={10} min={1} threads={threads} />
      </ModalFormContainer>
    </Form>
  )
}

export const FewThreads = () => {
  const threads = [
    {
      id: "1",
      title: "Nam id ante ultricies, laoreet leo tempor, venenatis ipsum.",
      replies: 719,
      category: Object.assign({}, categories[0].children[2], {
        parent: categories[0],
      }),
    },
    {
      id: "2",
      title: "Donec in tempor tellus.",
      replies: 0,
      category: Object.assign({}, categories[2]),
    },
  ]

  return (
    <Form<FormValues> id="threads-select-test" onSubmit={submit}>
      <ModalFormContainer title="Threads moderation" footer>
        <ThreadsModerationSelectedThreads max={10} min={1} threads={threads} />
      </ModalFormContainer>
    </Form>
  )
}

export const ManyThreads = () => {
  const threads = [
    {
      id: "1",
      title: "Nam id ante ultricies, laoreet leo tempor, venenatis ipsum.",
      replies: 719,
      category: Object.assign({}, categories[0].children[2], {
        parent: categories[0],
      }),
    },
    {
      id: "2",
      title: "Donec in tempor tellus.",
      replies: 0,
      category: Object.assign({}, categories[2]),
    },
    {
      id: "3",
      title: "Integer iaculis ut tellus id lobortis.",
      replies: 12,
      category: Object.assign({}, categories[0].children[2], {
        parent: categories[0],
      }),
    },
  ]

  return (
    <Form<FormValues> id="threads-select-test" onSubmit={submit}>
      <ModalFormContainer title="Threads moderation" footer>
        <ThreadsModerationSelectedThreads max={10} min={1} threads={threads} />
      </ModalFormContainer>
    </Form>
  )
}

export const WithThreadError = () => {
  const threads = [
    {
      id: "1",
      title: "Nam id ante ultricies, laoreet leo tempor, venenatis ipsum.",
      replies: 0,
      category: categories[0],
    },
    {
      id: "2",
      title: "Donec in tempor tellus.",
      replies: 719,
      category: Object.assign({}, categories[0].children[2], {
        parent: categories[0],
      }),
    },
  ]

  const errors = {
    "1": {
      location: ["threads", "0"],
      type: "auth_error.not_moderator",
      message: "message not displayed",
    },
  }

  return (
    <Form<FormValues> id="threads-select-test" onSubmit={submit}>
      <ModalFormContainer title="Threads moderation" footer>
        <ThreadsModerationSelectedThreads
          errors={errors}
          max={10}
          min={1}
          threads={threads}
        />
      </ModalFormContainer>
    </Form>
  )
}
