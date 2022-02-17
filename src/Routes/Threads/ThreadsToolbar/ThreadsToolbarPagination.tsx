import classnames from "classnames"
import React from "react"
import { Link } from "react-router-dom"
import { ButtonSecondary } from "../../../UI/Button"
import Icon from "../../../UI/Icon"
import { PageInfo, PageUrl } from "../Threads.types"

interface ThreadsToolbarPaginationProps {
  pageInfo?: PageInfo | null
  pageUrl: PageUrl
}

const ThreadsToolbarPagination: React.FC<ThreadsToolbarPaginationProps> = ({
  pageInfo,
  pageUrl,
}) => (
  <div className="paginator">
    {pageInfo?.hasPreviousPage ? (
      <>
        <Link
          className={classnames("btn btn-secondary btn-responsive")}
          to={pageUrl({})}
        >
          <Icon icon="fas fa-angle-double-left" fixedWidth />
        </Link>
        <Link
          className={classnames("btn btn-secondary btn-responsive")}
          to={pageUrl({ before: pageInfo.startCursor })}
        >
          <Icon icon="fas fa-angle-left" fixedWidth />
        </Link>
      </>
    ) : (
      <>
        <ButtonSecondary icon="fas fa-angle-double-left" responsive disabled />
        <ButtonSecondary icon="fas fa-angle-left" responsive disabled />
      </>
    )}
    {pageInfo?.hasNextPage ? (
      <Link
        className={classnames("btn btn-secondary btn-responsive")}
        to={pageUrl({ after: pageInfo.endCursor })}
      >
        <Icon icon="fas fa-angle-right" fixedWidth />
      </Link>
    ) : (
      <ButtonSecondary icon="fas fa-angle-right" responsive disabled />
    )}
  </div>
)

export default ThreadsToolbarPagination
