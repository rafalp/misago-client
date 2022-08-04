import React from "react"
import { Toolbar, ToolbarItem, ToolbarSeparator } from "../../../UI/Toolbar"
import { CategoryAcl, PageInfo, PageUrl } from "../Threads.types"
import ThreadsNewButton from "../ThreadsNewButton"
import ThreadsToolbarPagination from "./ThreadsToolbarPagination"

interface ThreadsToolbarProps {
  acl: CategoryAcl
  category?: {
    id: string
    slug: string
  } | null
  pageInfo?: PageInfo | null
  pageUrl: PageUrl
}

const ThreadsToolbar: React.FC<ThreadsToolbarProps> = ({
  acl,
  category,
  pageInfo,
  pageUrl,
}) => (
  <Toolbar>
    <ToolbarItem>
      <ThreadsToolbarPagination pageInfo={pageInfo} pageUrl={pageUrl} />
    </ToolbarItem>
    <ToolbarSeparator />
    {acl.start && (
      <ToolbarItem>
        <ThreadsNewButton category={category} />
      </ToolbarItem>
    )}
  </Toolbar>
)

export default ThreadsToolbar
