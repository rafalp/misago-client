import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  Observable,
  Operation,
  split,
} from "@apollo/client"
import { onError } from "@apollo/client/link/error"
import { getMainDefinition } from "@apollo/client/utilities"
import { WebSocketLink } from "@apollo/client/link/ws"
import { createUploadLink } from "apollo-upload-client"
import { getAuthToken } from "./auth"

const cache = new InMemoryCache()

const getGraphQLURI = () => {
  const uri: string | undefined = (process as any).env.REACT_APP_GRAPHQL_URL
  if (uri) return uri

  return window.location.protocol + "//" + window.location.host + "/graphql/"
}

const httpLink = createUploadLink({
  uri: getGraphQLURI(),
})

const getGraphQLWebSocketURI = () => {
  const uri = getGraphQLURI()
  return "ws" + uri.substring(4)
}

const wsLink = new WebSocketLink({
  uri: getGraphQLWebSocketURI(),
  options: {
    lazy: true,
    reconnect: true,
    connectionParams: () => {
      const token = getAuthToken()
      return {
        authorization: token ? `Bearer ${token}` : "",
      }
    },
  },
})

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    )
  },
  wsLink,
  httpLink
)

const request = async (operation: Operation) => {
  const token = getAuthToken()
  operation.setContext({
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  })
}

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handle: { unsubscribe(): void } | null
      Promise.resolve(operation)
        .then((op) => request(op))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          })
        })
        .catch(observer.error.bind(observer))

      return () => {
        if (handle) handle.unsubscribe()
      }
    })
)

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        )
      if (networkError) console.log(`[Network error]: ${networkError}`)
    }),
    requestLink,
    link,
  ]),
  cache: new InMemoryCache(),
})

export { cache, client }
