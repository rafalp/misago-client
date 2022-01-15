import React from "react"
import { useModalContext } from "../Context"
import { Modal } from "../UI/Modal"
import AvatarModalDialog from "./AvatarModalDialog"

const AvatarModal: React.FC = () => {
  const { isOpen, closeModal } = useModalContext()

  return (
    <Modal close={closeModal} isOpen={isOpen} resistant>
      <AvatarModalDialog closeModal={closeModal} />
    </Modal>
  )
}

export default AvatarModal
