import React from "react"
import { useModalContext } from "../Context"
import AvatarModal from "./AvatarModal"

const useOpenAvatarModal = () => {
  const { openModal } = useModalContext()

  return React.useCallback(() => {
    openModal(<AvatarModal />)
  }, [openModal])
}

export default useOpenAvatarModal
