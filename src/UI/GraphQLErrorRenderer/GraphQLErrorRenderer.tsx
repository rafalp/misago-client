import { ApolloError } from "apollo-client"
import React from "react"
import getNetworkErrorCode from "../getNetworkErrorCode"

interface GrapQLErrorRendererProps {
  error: ApolloError
  networkError: React.ReactElement
  queryError: React.ReactElement
}

const GraphQLErrorRenderer: React.FC<GrapQLErrorRendererProps> = ({
  error,
  networkError,
  queryError,
}) => {
  const code = getNetworkErrorCode(error)

  if (error.networkError && code !== 400) {
    return networkError
  }

  return queryError
}

export default GraphQLErrorRenderer
