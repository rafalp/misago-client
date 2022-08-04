import { ApolloError } from "@apollo/client"
import { withKnobs, select } from "@storybook/addon-knobs"
import { RootContainer } from "../../../UI/Storybook"
import ThreadRootError from "./ThreadRootError"

export default {
  title: "Route/Thread/Thread RootError",
  decorators: [withKnobs],
}

export const ThreadError = () => (
  <RootContainer>
    <ThreadRootError
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
    </ThreadRootError>
  </RootContainer>
)

export const QueryError = () => (
  <RootContainer>
    <ThreadRootError graphqlError={new ApolloError({})}>
      {({ message }) => <p>{message}</p>}
    </ThreadRootError>
  </RootContainer>
)

export const NetworkError = () => (
  <RootContainer>
    <ThreadRootError
      graphqlError={new ApolloError({ networkError: new Error() })}
    >
      {({ message }) => <p>{message}</p>}
    </ThreadRootError>
  </RootContainer>
)
