import { Trans } from "@lingui/macro"
import React from "react"
import { ButtonSecondary } from "../Button"
import ViewportEvent from "../ViewportEvent"

interface LoadMoreProps {
  data: { pageInfo: { hasNextPage: boolean } } | null
  loading: boolean
  onEvent: () => void
}

const LoadMore: React.FC<LoadMoreProps> = ({ loading, data, onEvent }) => {
  if (!data || !data.pageInfo.hasNextPage) return null

  return (
    <ViewportEvent
      className="load-more"
      disabled={loading}
      onEnter={onEvent}
      desktopOnly
    >
      <ButtonSecondary
        loading={loading}
        text={
          loading ? (
            <Trans id="loading-more">Loading...</Trans>
          ) : (
            <Trans id="load-more">Load more</Trans>
          )
        }
        onClick={onEvent}
        responsive
      />
    </ViewportEvent>
  )
}

export default LoadMore
