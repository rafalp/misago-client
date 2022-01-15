import { MockedProvider } from "@apollo/client/testing"
import { action } from "@storybook/addon-actions"
import { AuthContext } from "../Context/"
import { Modal } from "../UI/Modal"
import {
  RootContainer,
  SettingsContextFactory,
  userFactory,
} from "../UI/Storybook"
import AvatarModalDialog from "./AvatarModalDialog"

export default {
  title: "Avatar Modal",
}

const close = action("close modal")

export const AvatarModal = () => (
  <MockedProvider>
    <RootContainer>
      <SettingsContextFactory>
        <AuthContext.Provider value={userFactory()}>
          <Modal isOpen={true} close={close}>
            <AvatarModalDialog closeModal={close} />
          </Modal>
        </AuthContext.Provider>
      </SettingsContextFactory>
    </RootContainer>
  </MockedProvider>
)
