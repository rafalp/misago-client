import { Trans } from "@lingui/macro"
import React from "react"

interface ThreadPostModerationErrorHeaderProps {
  forDelete?: boolean
}

const ThreadPostModerationErrorHeader: React.FC<ThreadPostModerationErrorHeaderProps> = ({
  forDelete,
}) =>
  forDelete ? (
    <Trans id="moderation.post_delete_error">Post could not be deleted.</Trans>
  ) : (
    <Trans id="moderation.post_update_error">Post could not be updated.</Trans>
  )

export default ThreadPostModerationErrorHeader
