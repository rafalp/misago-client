import { Trans } from "@lingui/macro"
import React from "react"
import { Modal, ModalDialog } from "../../UI/Modal"
import portal from "../../UI/portal"
import { EditorContextData } from "../EditorContext"
import EditorControlImageForm from "./EditorControlImageForm"

interface EditorControlImageModalProps {
  context: EditorContextData
  isOpen: boolean
  close: () => void
}

const EditorControlImageModal: React.FC<EditorControlImageModalProps> = ({
  context,
  isOpen,
  close,
}) => {
  return portal(
    <Modal isOpen={isOpen} close={close}>
      <ModalDialog
        title={<Trans id="editor.image">Insert image</Trans>}
        close={close}
      >
        <EditorControlImageForm context={context} close={close} />
      </ModalDialog>
    </Modal>
  )
}

export default EditorControlImageModal
