import {
  ApolloClient,
  InMemoryCache,
  ApolloLink, Observable, Operation, split,
  HttpLink,
} from "@apollo/client"
import { onError } from "@apollo/client/link/error"
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from "@apollo/client/link/ws";
import { getAuthToken } from "./auth"

const cache = new InMemoryCache()

const httpLink = new HttpLink({
  uri: "http://localhost:8000/graphql/",
})

const wsLink = new WebSocketLink({
  uri: `ws://localhost:8000/graphql/`,
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
