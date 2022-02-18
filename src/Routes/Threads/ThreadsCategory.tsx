import classnames from "classnames"
import React from "react"
import { Redirect, useParams } from "react-router-dom"
import { RouteNotFound } from "../../UI/RouteError"
import SectionLoader from "../../UI/SectionLoader"
import WindowTitle from "../../UI/WindowTitle"
import * as urls from "../../urls"
import { PageUrl } from "./Threads.types"
import { ThreadsHeaderCategory } from "./ThreadsHeader"
import ThreadsLayout from "./ThreadsLayout"
import ThreadsList from "./ThreadsList"
import { ThreadsModeration, useThreadsModeration } from "./ThreadsModeration"
import ThreadsToolbar from "./ThreadsToolbar"
import redirectFromInvalidURL from "./redirectFromInvalidURL"
import useActiveCategory from "./useActiveCategory"
import useCategoryAcl from "./useCategoryAcl"
import useCursorParams from "./useCursorParams"
import { useCategoryThreadsQuery } from "./useThreadsQuery"
import useThreadsSelection from "./useThreadsSelection"

interface ThreadsCategoryParams {
  id: string
  slug: string
}

const ThreadsCategory: React.FC = () => {
  const { id, slug } = useParams<ThreadsCategoryParams>()
  const cursor = useCursorParams()
  const activeCategory = useActiveCategory(id)
  const { data, error, loading, update } = useCategoryThreadsQuery({
    id,
    after: cursor.after,
    before: cursor.before,
  })

  const { category } = activeCategory || { category: null }
  const { threads } =
    data && data.category.id === id ? data : { threads: null }

  const acl = useCategoryAcl(category)
  const selection = useThreadsSelection(threads?.edges || [])
  const moderation = useThreadsModeration(selection.selected, category)

  if (!cursor.valid) return <RouteNotFound />
  if (data && !data.category) return <RouteNotFound />

  const pageUrl: PageUrl = ({ after, before }) => {
    let url = data ? urls.category(data.category) : ""
    if (after) url += "?after=" + after
    if (before) url += "?before=" + before
    return url
  }

  if (category && redirectFromInvalidURL(cursor, threads, category, slug)) {
    return <Redirect to={urls.category(category)} />
  }

  return (
    <ThreadsLayout
      activeCategory={activeCategory}
      className={
        category
          ? classnames(
              "route-category",
              category && `route-category-${category.id}`
            )
          : undefined
      }
    >
      {category && (
        <>
          <WindowTitle title={category.name} alerts={update.threads} />
          <ThreadsHeaderCategory category={category} />
          <ThreadsToolbar acl={acl} category={category} pageUrl={pageUrl} />
        </>
      )}
      <SectionLoader loading={loading && !!threads}>
        <ThreadsList
          acl={acl}
          category={category}
          error={error}
          loading={loading && !threads}
          selectable={!!moderation}
          selection={selection}
          threads={threads}
          update={update}
        />
      </SectionLoader>
      {category && (
        <ThreadsToolbar acl={acl} category={category} pageUrl={pageUrl} />
      )}
      <ThreadsModeration moderation={moderation} selection={selection} />
    </ThreadsLayout>
  )
}

export default ThreadsCategory
