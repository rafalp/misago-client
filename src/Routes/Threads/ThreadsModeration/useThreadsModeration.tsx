import { Trans } from "@lingui/macro"
import { useAuthContext, useModalContext } from "../../../Context"
import { Category } from "../../../types"
import { Thread, ThreadsModerationOptions } from "../Threads.types"
import ThreadsModerationDelete from "./ThreadsModerationDelete"
import ThreadsModerationMove from "./ThreadsModerationMove"
import useThreadsBulkClose from "./useThreadsBulkClose"
import useThreadsBulkOpen from "./useThreadsBulkOpen"

const useThreadsModeration = (
  threads: Array<Thread>,
  category?: Category | null
): ThreadsModerationOptions | null => {
  const user = useAuthContext()
  const { openModal } = useModalContext()

  const [threadsOpen, { loading: closingThreads }] = useThreadsBulkOpen(
    threads
  )
  const [threadsClose, { loading: openingThreads }] = useThreadsBulkClose(
    threads
  )

  const threadsMove = () => {
    openModal(<ThreadsModerationMove threads={threads} />)
  }

  const threadsDelete = () => {
    openModal(
      <ThreadsModerationDelete threads={threads} category={category} />
    )
  }

  const moderation = {
    loading: closingThreads || openingThreads,
    disabled: threads.length === 0,
    actions: [
      {
        name: <Trans id="moderation.open">Open</Trans>,
        icon: "fas fa-unlock",
        action: threadsOpen,
      },
      {
        name: <Trans id="moderation.close">Close</Trans>,
        icon: "fas fa-lock",
        action: threadsClose,
      },
      {
        name: <Trans id="moderation.move">Move</Trans>,
        icon: "fas fa-arrow-right",
        action: threadsMove,
      },
      {
        name: <Trans id="moderation.delete">Delete</Trans>,
        icon: "fas fa-times",
        action: threadsDelete,
      },
    ],
  }

  if (user && user.isModerator) return moderation
  return null
}

export default useThreadsModeration
