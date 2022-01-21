import { Trans } from "@lingui/macro"
import { useAuthContext, useModalContext } from "../../../Context"
import { Thread, ThreadModerationOptions } from "../Thread.types"
import ThreadModerationDelete from "./ThreadModerationDelete"
import ThreadModerationMove from "./ThreadModerationMove"
import useThreadClose from "./useThreadClose"
import useThreadOpen from "./useThreadOpen"

const useThreadModeration = (
  thread: Thread | null
): ThreadModerationOptions | null => {
  const user = useAuthContext()
  const { openModal } = useModalContext()

  const [threadClose, { loading: closingThread }] = useThreadClose(thread)
  const [threadOpen, { loading: openingThread }] = useThreadOpen(thread)

  if (!thread || !user || !user.isModerator) return null

  const threadMove = () => openModal(<ThreadModerationMove thread={thread} />)
  const threadDelete = () => {
    openModal(<ThreadModerationDelete thread={thread} />)
  }

  return {
    loading: closingThread || openingThread,
    actions: [
      thread.isClosed
        ? {
            name: <Trans id="moderation.open">Open</Trans>,
            icon: "fas fa-unlock",
            action: threadOpen,
          }
        : {
            name: <Trans id="moderation.close">Close</Trans>,
            icon: "fas fa-lock",
            action: threadClose,
          },
      {
        name: <Trans id="moderation.move">Move</Trans>,
        icon: "fas fa-arrow-right",
        action: threadMove,
      },
      {
        name: <Trans id="moderation.delete">Delete</Trans>,
        icon: "fas fa-times",
        action: threadDelete,
      },
    ],
  }
}

export default useThreadModeration
