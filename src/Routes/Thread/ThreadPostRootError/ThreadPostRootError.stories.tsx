import { ApolloError } from "@apollo/client"
import { withKnobs, select } from "@storybook/addon-knobs"
import { RootContainer } from "../../../UI/Storybook"
import ThreadPostRootError from "./ThreadPostRootError"

export default {
  title: "Route/Thread/Post RootError",
  decorators: [withKnobs],
}

export const PostError = () => (
  <RootContainer>
    <ThreadPostRootError
      dataErrors={[
        {
          location: "post",
          message: "moderator permission is required",
          type: select(
            "Error",
            {
              "Not moderator": "auth_error.not_moderator",
              "Category is closed": "category_error.closed",
              "Thread is closed": "thread_error.closed",
              "Post not author": "post_error.not_author",
              "Post not found": "post.not_found",
            },
            "auth_error.not_moderator"
          ),
        },
      ]}
    >
      {({ message }) => <p>{message}</p>}
    </ThreadPostRootError>
  </RootContainer>
)

export const ThreadError = () => (
  <RootContainer>
    <ThreadPostRootError
      dataErrors={[
        {
          location: "thread",
          message: "moderator permission is required",
          type: select(
            "Error",
            {
              "Not moderator": "auth_error.not_moderator",
              "Category is closed": "category_error.closed",
              "Thread is closed": "thread_error.closed",
              "Thread not author": "thread_error.not_author",
              "Thread not found": "thread_error.not_found",
            },
            "auth_error.not_moderator"
          ),
        },
      ]}
    >
      {({ message }) => <p>{message}</p>}
    </ThreadPostRootError>
  </RootContainer>
)

export const QueryError = () => (
  <RootContainer>
    <ThreadPostRootError graphqlError={new ApolloError({})}>
      {({ message }) => <p>{message}</p>}
    </ThreadPostRootError>
  </RootContainer>
)

export const NetworkError = () => (
  <RootContainer>
    <ThreadPostRootError
      graphqlError={new ApolloError({ networkError: new Error() })}
    >
      {({ message }) => <p>{message}</p>}
    </ThreadPostRootError>
  </RootContainer>
)
