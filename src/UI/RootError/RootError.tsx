import { t } from "@lingui/macro"
import React from "react"
import { ApolloError } from "apollo-client"
import { MutationError } from "../../types"
import getNetworkErrorCode from "../getNetworkErrorCode"

interface Error {
  message: React.ReactNode
  type: string
}

interface RootErrorProps {
  children: (error: Error) => React.ReactElement
  dataErrors?: Array<MutationError> | null
  graphqlError?: ApolloError | null
  plainError?: string | null
  locations?: Array<string> | null
  messages?: {
    [type: string]: React.ReactNode
  }
}

const NOT_AUTHORIZED_ERROR = "auth_error.not_authorized"

const RootError: React.FC<RootErrorProps> = ({
  children,
  dataErrors,
  graphqlError,
  plainError,
  locations,
  messages,
}) => {
  if (plainError && messages && messages[plainError]) {
    return children({ type: plainError, message: messages[plainError] })
  }

  const errors: Array<MutationError> = []
  if (graphqlError) {
    const code = getNetworkErrorCode(graphqlError)
    if (code === 400 || !graphqlError.networkError) {
      errors.push({
        location: ["__root__"],
        type: "client_error.graphql",
        message: t({
          id: "client_error.graphql",
          message: "Unexpected error has occurred.",
        }),
      })
    } else if (graphqlError.networkError) {
      errors.push({
        location: ["__root__"],
        type: "client_error.network",
        message: t({
          id: "client_error.network",
          message: "Site server can't be reached.",
        }),
      })
    }
  }

  if (dataErrors) errors.push(...dataErrors)
  if (!errors.length) return null

  const finLocations: Array<string> = locations || ["__root__"]
  const finMessages: { [type: string]: React.ReactNode } = messages || {}

  if (!finMessages[NOT_AUTHORIZED_ERROR]) {
    finMessages[NOT_AUTHORIZED_ERROR] = t({
      id: "auth_error.not_authorized",
      message: "You need to be signed in to perform this action.",
    })
  }

  for (const location of finLocations) {
    for (const error of errors) {
      const errorLocation = error.location.join(".")
      if (errorLocation === location) {
        const { type, message } = error
        return children({ type, message: finMessages[type] || message })
      }
    }
  }

  return null
}

export default RootError
