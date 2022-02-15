import React from "react"
import { Redirect, useParams } from "react-router-dom"
import { RouteGraphQLError, RouteNotFound } from "../../UI/RouteError"
import RouteLoader from "../../UI/RouteLoader"
import useThreadPostUrlQuery from "./useThreadPostUrlQuery"

interface ThreadPostRouteParams {
  id: string
  slug: string
  postId: string
}

const ThreadRedirectToPost: React.FC = () => {
  const { id, postId } = useParams<ThreadPostRouteParams>()
  const { data, loading, error } = useThreadPostUrlQuery({ id, postId })

  if (!data) {
    if (error) return <RouteGraphQLError error={error} />
    if (loading) return <RouteLoader />
  }

  if (data?.thread?.post?.url) {
    return <Redirect to={data.thread.post.url} />
  }

  return <RouteNotFound />
}

export default ThreadRedirectToPost
