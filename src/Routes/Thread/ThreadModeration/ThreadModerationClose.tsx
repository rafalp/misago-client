import { Trans } from "@lingui/macro"
import { ApolloError } from "apollo-client"
import React from "react"
import { useModalContext } from "../../../Context"
import { Modal, ModalDialog } from "../../../UI/Modal"
import { MutationError } from "../../../types"
import ThreadModerationError from "./ThreadModerationError"

interface ThreadModerationCloseProps {
  graphqlError?: ApolloError | null
  errors?: Array<MutationError> | null
}

const ThreadModerationClose: React.FC<ThreadModerationCloseProps> = ({
  graphqlError,
  errors,
}) => {
  const { isOpen, closeModal } = useModalContext()

  return (
    <Modal isOpen={isOpen} close={closeModal}>
      <ModalDialog
        title={<Trans id="moderation.close_thread">Close thread</Trans>}
        close={closeModal}
      >
        <ThreadModerationError
          graphqlError={graphqlError}
          errors={errors}
          close={closeModal}
        />
      </ModalDialog>
    </Modal>
  )
}

export default ThreadModerationClose
