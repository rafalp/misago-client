import { MockedProvider } from "@apollo/react-testing"
import { withKnobs, boolean, number, text } from "@storybook/addon-knobs"
import React from "react"
import { AuthContext } from "../../../Context"
import { RootContainer, categories, userFactory } from "../../../UI/Storybook"
import ThreadHeader from "./ThreadHeader"

export default {
  title: "Route/Thread/Header",
  decorators: [withKnobs],
}

const posts = {
  page: null,
  pagination: {
    pages: 1,
  },
}

export const ThreadByUser = () => (
  <MockedProvider>
    <RootContainer>
      <ThreadHeader
        thread={{
          posts,
          id: "1",
          title: text(
            "Title",
            "First observed by the astronomer Galileo Galilei!"
          ),
          slug: "test-slug",
          replies: number("Replies", 5192),
          isClosed: boolean("Closed", false),
          startedAt: "2020-05-01T10:49:02.159Z",
          lastPostedAt: "2020-05-02T12:38:41.159Z",
          starterName: "LoremIpsum",
          lastPosterName: "DolorMet",
          extra: {},
          starter: userFactory({ username: "DolorMet" }),
          lastPoster: userFactory({ username: "DolorMet" }),
          category: Object.assign({}, categories[0], {
            parent: boolean("In child category", true) ? categories[1] : null,
          }),
        }}
      />
    </RootContainer>
  </MockedProvider>
)

export const ThreadByAnonymous = () => (
  <MockedProvider>
    <RootContainer>
      <ThreadHeader
        thread={{
          posts,
          id: "1",
          title: text(
            "Title",
            "First observed by the astronomer Galileo Galilei!"
          ),
          slug: "test-slug",
          replies: number("Replies", 5192),
          isClosed: boolean("Closed", false),
          startedAt: "2020-05-01T10:49:02.159Z",
          lastPostedAt: "2020-05-02T12:38:41.159Z",
          starterName: "LoremIpsum",
          lastPosterName: "DolorMet",
          extra: {},
          starter: null,
          lastPoster: null,
          category: Object.assign({}, categories[0], {
            parent: boolean("In child category", true) ? categories[1] : null,
          }),
        }}
      />
    </RootContainer>
  </MockedProvider>
)

export const ThreadEditable = () => (
  <AuthContext.Provider value={userFactory()}>
    <MockedProvider>
      <RootContainer>
        <ThreadHeader
          thread={{
            posts,
            id: "1",
            title: text(
              "Title",
              "First observed by the astronomer Galileo Galilei!"
            ),
            slug: "test-slug",
            replies: number("Replies", 5192),
            isClosed: boolean("Closed", false),
            startedAt: "2020-05-01T10:49:02.159Z",
            lastPostedAt: "2020-05-02T12:38:41.159Z",
            starterName: "LoremIpsum",
            lastPosterName: "DolorMet",
            extra: {},
            starter: userFactory({ username: "DolorMet" }),
            lastPoster: userFactory({ username: "DolorMet" }),
            category: Object.assign({}, categories[0], {
              parent: boolean("In child category", true)
                ? categories[1]
                : null,
            }),
          }}
        />
      </RootContainer>
    </MockedProvider>
  </AuthContext.Provider>
)
