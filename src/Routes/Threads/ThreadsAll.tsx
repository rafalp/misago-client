import { t } from "@lingui/macro"
import React from "react"
import { Redirect } from "react-router-dom"
import ResetScrollOnNav from "../../UI/ResetScrollOnNav"
import RouteLoader from "../../UI/RouteLoader"
import { RouteNotFound } from "../../UI/RouteError"
import SectionLoader from "../../UI/SectionLoader"
import WindowTitle from "../../UI/WindowTitle"
import { useForumStatsContext, useSettingsContext } from "../../Context"
import hooks from "../../hooks"
import * as urls from "../../urls"
import { PageUrl } from "./Threads.types"
import { ThreadsHeaderAll } from "./ThreadsHeader"
import ThreadsLayout from "./ThreadsLayout"
import ThreadsList from "./ThreadsList"
import { ThreadsModeration, useThreadsModeration } from "./ThreadsModeration"
import ThreadsToolbar from "./ThreadsToolbar"
import useCategoryAcl from "./useCategoryAcl"
import useCursorParams from "./useCursorParams"
import { useThreadsQuery } from "./useThreadsQuery"
import useThreadsSelection from "./useThreadsSelection"

const ThreadsAll: React.FC = () => {
  const forumStats = useForumStatsContext()
  const settings = useSettingsContext()
  const cursor = useCursorParams()
  const { data, error, loading, update } = useThreadsQuery({
    after: cursor.after,
    before: cursor.before,
  })
  const { threads } = data || { threads: null }

  const acl = useCategoryAcl()
  const selection = useThreadsSelection(threads?.edges || [])
  const moderation = useThreadsModeration(selection.selected)

  if (!cursor.valid) return <RouteNotFound />
  if (!forumStats || !settings) return <RouteLoader />

  const isIndex = settings.forumIndexThreads

  const pageUrl: PageUrl = ({ after, before }) => {
    let url = isIndex ? urls.index() : urls.threads()
    if (after) url += "?after=" + after
    if (before) url += "?before=" + before
    return url
  }

  if (cursor.before && threads?.pageInfo.hasPreviousPage === false) {
    return <Redirect to={isIndex ? urls.index() : urls.threads()} />
  }

  return (
    <ThreadsLayout className="route-threads">
      <WindowTitle
        index={isIndex}
        title={t({ id: "threads.title", message: "Threads" })}
        alerts={update.threads}
      />
      {hooks.THREADS_ALL_TOP.map((Component, index) => (
        <Component key={index} />
      ))}
      <ThreadsHeaderAll settings={settings} stats={forumStats} />
      <ThreadsToolbar
        acl={acl}
        pageInfo={threads?.pageInfo}
        pageUrl={pageUrl}
      />
      <SectionLoader loading={loading}>
        <ThreadsList
          acl={acl}
          error={error}
          loading={loading}
          selectable={!!moderation}
          selection={selection}
          threads={threads}
          update={update}
        />
      </SectionLoader>
      <ResetScrollOnNav selector=".paginator a">
        <ThreadsToolbar
          acl={acl}
          pageInfo={threads?.pageInfo}
          pageUrl={pageUrl}
        />
      </ResetScrollOnNav>
      <ThreadsModeration moderation={moderation} selection={selection} />
    </ThreadsLayout>
  )
}

export default ThreadsAll
