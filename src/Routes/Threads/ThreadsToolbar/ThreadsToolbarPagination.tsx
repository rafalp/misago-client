import { t } from "@lingui/macro"
import React from "react"
import { PageInfo, PageUrl } from "../Threads.types"
import ThreadsToolbarPaginationButton from "./ThreadsToolbarPaginationButton"

interface ThreadsToolbarPaginationProps {
  pageInfo?: PageInfo | null
  pageUrl: PageUrl
}

const ThreadsToolbarPagination: React.FC<ThreadsToolbarPaginationProps> = ({
  pageInfo,
  pageUrl,
}) => (
  <div className="paginator">
    <ThreadsToolbarPaginationButton
      icon="fas fa-angle-double-left"
      title={t({
        id: "page.first",
        message: "First page",
      })}
      url={pageInfo?.hasPreviousPage ? pageUrl({}) : null}
    />
    <ThreadsToolbarPaginationButton
      icon="fas fa-angle-left"
      title={t({
        id: "page.previous",
        message: "Previous page",
      })}
      url={
        pageInfo?.hasPreviousPage
          ? pageUrl({ before: pageInfo.startCursor })
          : null
      }
    />
    <ThreadsToolbarPaginationButton
      icon="fas fa-angle-right"
      title={t({
        id: "page.next",
        message: "Next page",
      })}
      url={
        pageInfo?.hasNextPage ? pageUrl({ after: pageInfo.endCursor }) : null
      }
    />
  </div>
)

export default ThreadsToolbarPagination
