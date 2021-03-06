import React from "react"
import { Redirect } from "react-router-dom"
import RouteContainer from "../../UI/RouteContainer"
import { RouteGraphQLError, RouteNotFound } from "../../UI/RouteError"
import RouteLoader from "../../UI/RouteLoader"
import SectionLoader from "../../UI/SectionLoader"
import WindowTitle from "../../UI/WindowTitle"
import * as urls from "../../urls"
import ThreadBreadcrumbs from "./ThreadBreadcrumbs"
import ThreadHeader from "./ThreadHeader"
import { useThreadModeration } from "./ThreadModeration"
import {
  ThreadPostsModeration,
  useThreadPostsModeration,
} from "./ThreadPostsModeration"
import ThreadPost from "./ThreadPost"
import ThreadPostsList from "./ThreadPostsList"
import ThreadQuoteSelection from "./ThreadQuoteSelection"
import { ThreadReply, ThreadReplyProvider } from "./ThreadReply"
import { ThreadToolbarBottom, ThreadToolbarTop } from "./ThreadToolbar"
import useThreadParams from "./useThreadParams"
import usePostsSelection from "./usePostsSelection"
import { useThreadQuery } from "./useThreadQuery"

const ThreadPosts: React.FC = () => {
  const { id, slug, page } = useThreadParams()
  const { data, loading, error } = useThreadQuery({ id, page })
  const { thread, posts } = data || { thread: null, posts: null }

  const selection = usePostsSelection(posts ? posts.results : [])
  const moderation = {
    thread: useThreadModeration(thread),
    posts: useThreadPostsModeration(thread, selection.selected, page),
  }

  if (!data) {
    if (error) return <RouteGraphQLError error={error} />
    if (loading) return <RouteLoader />
  }

  if (!thread || !posts) return <RouteNotFound />
  if (thread.id !== id) return <RouteLoader />
  if (page === 1 || thread.slug !== slug) {
    const newParams: { id: string; slug: string; page?: number } = { id, slug }
    if (page && page > 1) newParams.page = page
    return <Redirect to={urls.thread({ id, page, slug: thread.slug })} />
  }

  if (!posts.results.length) {
    // Requested page is empty
    return (
      <Redirect
        to={urls.thread({
          id,
          slug: thread.slug,
          page: posts.totalPages,
        })}
      />
    )
  }

  const isClosed = thread.isClosed || thread.category.isClosed

  const pagination = {
    page: page || 1,
    pages: posts.totalPages,
    url: (page: number) => {
      return urls.thread({ ...thread, page })
    },
  }
  const toolbarProps = {
    isClosed,
    pagination,
    moderation: moderation.thread,
  }

  return (
    <RouteContainer
      className={`route-thread route-thread-${thread.category.id}`}
    >
      <WindowTitle title={thread.title} parent={thread.category.name} />
      <ThreadBreadcrumbs category={thread.category} />
      <ThreadHeader thread={thread} />
      <ThreadReplyProvider threadId={thread.id}>
        <ThreadToolbarTop {...toolbarProps} />
        <ThreadQuoteSelection>
          <SectionLoader
            loading={loading || posts.pageInfo.number !== pagination.page}
          >
            <ThreadPostsList>
              {posts.results.map((post) => (
                <ThreadPost
                  key={post.id}
                  page={page}
                  post={post}
                  threadId={thread.id}
                  threadSlug={thread.slug}
                  isClosed={isClosed}
                  isSelected={selection.selection[post.id]}
                  toggleSelection={moderation.posts ? selection.toggle : null}
                />
              ))}
            </ThreadPostsList>
          </SectionLoader>
        </ThreadQuoteSelection>
        <ThreadToolbarBottom {...toolbarProps} />
        <ThreadReply threadId={thread.id} />
      </ThreadReplyProvider>
      <ThreadPostsModeration
        moderation={moderation.posts}
        selection={selection}
      />
    </RouteContainer>
  )
}

export default ThreadPosts
