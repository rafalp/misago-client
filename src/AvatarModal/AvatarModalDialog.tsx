import { Trans } from "@lingui/macro"
import React from "react"
import { useAuthContext } from "../Context"
import Avatar from "../UI/Avatar"
import { ModalBody, ModalDialog, ModalHeader, ModalSize } from "../UI/Modal"
import AvatarUploadForm from "./AvatarUploadForm"

interface AvatarModalDialogProps {
  closeModal: () => void
}

const AvatarModalDialog: React.FC<AvatarModalDialogProps> = ({
  closeModal,
}) => {
  const user = useAuthContext()

  return (
    <ModalDialog size={ModalSize.SMALL}>
      <ModalHeader
        title={<Trans id="avatar_modal.title">Avatar Controls</Trans>}
        close={closeModal}
      />
      <ModalBody className="text-center">
        <Avatar user={user} size={200} />
      </ModalBody>
      <AvatarUploadForm closeModal={closeModal} />
    </ModalDialog>
  )
}

export default AvatarModalDialog
