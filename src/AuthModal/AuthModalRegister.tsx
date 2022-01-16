import { Trans } from "@lingui/macro"
import React from "react"
import * as Yup from "yup"
import { ButtonLink, ButtonPrimary } from "../UI/Button"
import { Field, FieldError, Form } from "../UI/Form"
import Input from "../UI/Input"
import {
  ModalAlert,
  ModalDialog,
  ModalFooter,
  ModalFormBody,
  ModalHeader,
  ModalSize,
} from "../UI/Modal"
import RootError from "../UI/RootError"
import {
  EmailValidationError,
  PasswordValidationError,
  UsernameValidationError,
} from "../UI/ValidationError"
import { useAuth } from "../auth"
import useRegisterMutation from "./useRegisterMutation"

interface FormValues {
  name: string
  email: string
  password: string
}

interface AuthModalRegisterProps {
  settings: {
    passwordMinLength: number
    passwordMaxLength: number
    usernameMinLength: number
    usernameMaxLength: number
  }
  close: () => void
  showLogin: () => void
}

const AuthModalRegister: React.FC<AuthModalRegisterProps> = ({
  settings,
  close,
  showLogin,
}) => {
  const { login } = useAuth()
  const [disabled, setDisabled] = React.useState<boolean>(false)
  const [
    register,
    { data, loading, error: graphqlError },
  ] = useRegisterMutation()

  const validators = Yup.object().shape({
    name: Yup.string()
      .required("value_error.missing")
      .min(settings.usernameMinLength, "value_error.any_str.min_length")
      .max(settings.usernameMaxLength, "value_error.any_str.max_length")
      .matches(/^[a-zA-Z0-9]+$/, "value_error.username"),
    password: Yup.string()
      .required("value_error.missing")
      .min(settings.passwordMinLength, "value_error.any_str.min_length")
      .max(settings.passwordMaxLength, "value_error.any_str.max_length"),
    email: Yup.string()
      .required("value_error.missing")
      .email("value_error.email"),
  })

  return (
    <ModalDialog
      className="modal-dialog-auth modal-dialog-register"
      size={ModalSize.SMALL}
    >
      <ModalHeader
        title={<Trans id="register.title">Sign up</Trans>}
        close={close}
      />
      <Form<FormValues>
        id="register_form"
        defaultValues={{
          name: "",
          email: "",
          password: "",
        }}
        disabled={loading || disabled}
        validators={validators}
        onSubmit={async ({ clearErrors, setError, data: input }) => {
          clearErrors()

          try {
            const result = await register({ variables: { input } })
            const { errors, token, user } = result.data?.register || {}

            errors?.forEach(({ location, type, message }) => {
              setError(location, { type, message })
            })

            if (token && user) {
              setDisabled(true)
              login({ token, user })
              close()
            }
          } catch (error) {
            // do nothing when register throws
            return
          }
        }}
      >
        <RootError
          graphqlError={graphqlError}
          dataErrors={data?.register.errors}
        >
          {({ message }) => <ModalAlert>{message}</ModalAlert>}
        </RootError>
        <ModalFormBody>
          <Field
            label={<Trans id="input.name">User name</Trans>}
            name="name"
            input={<Input maxLength={settings.usernameMaxLength} />}
            error={(error, value) => (
              <UsernameValidationError
                error={error}
                value={value.trim().length}
                min={settings.usernameMinLength}
                max={settings.usernameMaxLength}
              >
                {({ message }) => <FieldError>{message}</FieldError>}
              </UsernameValidationError>
            )}
          />
          <Field
            label={<Trans id="input.email">E-mail</Trans>}
            name="email"
            input={<Input maxLength={100} type="email" />}
            error={(error) => (
              <EmailValidationError error={error}>
                {({ message }) => <FieldError>{message}</FieldError>}
              </EmailValidationError>
            )}
          />
          <Field
            label={<Trans id="input.password">Password</Trans>}
            name="password"
            input={
              <Input maxLength={settings.passwordMaxLength} type="password" />
            }
            error={(error, value) => (
              <PasswordValidationError
                error={error}
                value={value.length}
                min={settings.passwordMinLength}
                max={settings.passwordMaxLength}
              >
                {({ message }) => <FieldError>{message}</FieldError>}
              </PasswordValidationError>
            )}
          />
        </ModalFormBody>
        <ModalFooter>
          <ButtonPrimary
            loading={loading || disabled}
            text={
              loading || disabled ? (
                <Trans id="register.submitting">Signing up...</Trans>
              ) : (
                <Trans id="register.submit">Sign up</Trans>
              )
            }
            block
          />
          <ButtonLink
            disabled={loading || disabled}
            text={
              <Trans id="register.login">
                Already a member? <strong>Log in</strong>
              </Trans>
            }
            block
            onClick={showLogin}
          />
        </ModalFooter>
      </Form>
    </ModalDialog>
  )
}

export default AuthModalRegister
