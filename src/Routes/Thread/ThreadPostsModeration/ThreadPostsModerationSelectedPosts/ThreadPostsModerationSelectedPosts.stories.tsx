import { action } from "@storybook/addon-actions"
import { withKnobs, text } from "@storybook/addon-knobs"
import React from "react"
import { Form } from "../../../../UI/Form"
import { ModalFormContainer, userFactory } from "../../../../UI/Storybook"
import { RichText } from "../../../../types"
import { Post } from "../../Thread.types"
import ThreadsModerationSelectedPosts from "./"

export default {
  title: "Route/Thread/Moderation/Posts Select",
  decorators: [withKnobs],
}

interface FormValues {
  posts: Array<Post>
}

const submit = action("submit form")

export const SinglePost = () => {
  const username = text("Username", "JohnSmit")

  const posts = [
    {
      id: "1",
      richText: [
        {
          id: "aaaa",
          type: "p",
          text: "Lorem ipsum dolor met sit amet elit.",
        },
      ] as RichText,
      edits: 0,
      postedAt: "2020-04-01T21:42:51Z",
      posterName: username,
      poster: userFactory({ name: username }),
      extra: {},
    },
  ]

  return (
    <Form<FormValues> id="posts-select-test" onSubmit={submit}>
      <ModalFormContainer title="Posts moderation" footer>
        <ThreadsModerationSelectedPosts max={10} min={1} posts={posts} />
      </ModalFormContainer>
    </Form>
  )
}

export const FewPosts = () => {
  const username = text("Username", "JohnSmit")

  const posts = [
    {
      id: "1",
      richText: [
        {
          id: "aaaa",
          type: "p",
          text: "Lorem ipsum dolor met sit amet elit.",
        },
      ] as RichText,
      edits: 0,
      postedAt: "2020-04-01T21:42:51Z",
      posterName: username,
      poster: userFactory({ name: username }),
      extra: {},
    },
    {
      id: "2",
      richText: [
        {
          id: "bbbb",
          type: "p",
          text:
            "Aliquam commodo orci et lacinia placerat. Donec non porttitor metus.",
        },
      ] as RichText,
      edits: 0,
      postedAt: "2020-04-02T11:16:51Z",
      posterName: "Lorem",
      poster: userFactory({ name: "Lorem" }),
      extra: {},
    },
  ]

  return (
    <Form<FormValues> id="posts-select-test" onSubmit={submit}>
      <ModalFormContainer title="Posts moderation" footer>
        <ThreadsModerationSelectedPosts max={10} min={1} posts={posts} />
      </ModalFormContainer>
    </Form>
  )
}

export const ManyPosts = () => {
  const username = text("Username", "JohnSmit")

  const posts = [
    {
      id: "1",
      richText: [
        {
          id: "aaaa",
          type: "p",
          text: "Lorem ipsum dolor met sit amet elit.",
        },
      ] as RichText,
      edits: 0,
      postedAt: "2020-04-01T21:42:51Z",
      posterName: username,
      poster: userFactory({ name: username }),
      extra: {},
    },
    {
      id: "2",
      richText: [
        {
          id: "aaaa",
          type: "p",
          text:
            "Aliquam commodo orci et lacinia placerat. Donec non porttitor metus.",
        },
      ] as RichText,
      edits: 0,
      postedAt: "2020-04-02T11:16:51Z",
      posterName: "Lorem",
      poster: userFactory({ name: "Lorem" }),
      extra: {},
    },
    {
      id: "3",
      richText: [
        {
          id: "aaaa",
          type: "p",
          text:
            "Proin lacinia leo vitae mauris tempor, nec elementum quam eleifend.",
        },
      ] as RichText,
      edits: 0,
      postedAt: "2020-04-02T13:52:05Z",
      posterName: "Aenean",
      poster: userFactory({ name: "Aenean" }),
      extra: {},
    },
  ]

  return (
    <Form<FormValues> id="posts-select-test" onSubmit={submit}>
      <ModalFormContainer title="Posts moderation" footer>
        <ThreadsModerationSelectedPosts max={10} min={1} posts={posts} />
      </ModalFormContainer>
    </Form>
  )
}

export const WithErrors = () => {
  const username = text("Username", "JohnSmit")

  const posts = [
    {
      id: "1",
      richText: [
        {
          id: "aaaa",
          type: "p",
          text: "Lorem ipsum dolor met sit amet elit.",
        },
      ] as RichText,
      edits: 0,
      postedAt: "2020-04-01T21:42:51Z",
      posterName: username,
      poster: userFactory({ name: username }),
      extra: {},
    },
    {
      id: "2",
      richText: [
        {
          id: "aaaa",
          type: "p",
          text:
            "Aliquam commodo orci et lacinia placerat. Donec non porttitor metus.",
        },
      ] as RichText,
      edits: 0,
      postedAt: "2020-04-02T11:16:51Z",
      posterName: "Lorem",
      poster: userFactory({ name: "Lorem" }),
      extra: {},
    },
  ]

  const errors = {
    "1": {
      location: ["posts", "0"],
      type: "value_error.post.thread_start",
      message: "message not displayed",
    },
    "2": {
      location: ["posts", "1"],
      type: "value_error.post.not_exists",
      message: "message not displayed",
    },
  }

  return (
    <Form<FormValues> id="posts-select-test" onSubmit={submit}>
      <ModalFormContainer title="Posts moderation" footer>
        <ThreadsModerationSelectedPosts
          max={10}
          min={1}
          posts={posts}
          errors={errors}
        />
      </ModalFormContainer>
    </Form>
  )
}
