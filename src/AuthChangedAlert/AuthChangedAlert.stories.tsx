import { actions } from "@storybook/addon-actions"
import { withKnobs, text } from "@storybook/addon-knobs"
import AuthChangedLoggedInAlert from "./AuthChangedLoggedInAlert"
import AuthChangedLoggedOutAlert from "./AuthChangedLoggedOutAlert"

export default {
  title: "Auth/Alert",
  decorators: [withKnobs],
}

const { reload } = actions({
  reload: "reload app",
})

const args = {
  username: "JohnDoe"
}

export const LoggedIn = ({ username }) => (
  <AuthChangedLoggedInAlert
    username={username}
    reload={reload}
  />
).args = args

export const LoggedOut = ({ username }) => (
  <AuthChangedLoggedOutAlert
    username={username}
    reload={reload}
  />
).args = args
