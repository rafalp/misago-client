import { Trans } from "@lingui/macro"
import React from "react"
import { useSettingsContext, useToastsContext } from "../Context"
import { ButtonPrimary } from "../UI/Button"
import { ModalFooter, ModalFormBody } from "../UI/Modal"
import { formatFileSizeShort } from "../UI/formats"
import { MutationError } from "types"
import AvatarValidationError from "./AvatarValidationError"
import useAvatarUploadMutation from "./useAvatarUploadMutation"

interface AvatarUploadFormProps {
  closeModal: () => void
}

const AvatarUploadForm: React.FC<AvatarUploadFormProps> = ({ closeModal }) => {
  const {
    avatarUploadContentTypes,
    avatarUploadImageMinSize,
    avatarUploadMaxSize,
  } = useSettingsContext()
  const uploadLimit = avatarUploadMaxSize * 1024
  const { showToast } = useToastsContext()
  const { loading, avatarUpload } = useAvatarUploadMutation()
  const [errors, setErrors] = React.useState<Array<MutationError> | null>(null)
  const [file, setFile] = React.useState<File | null>(null)

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault()
        if (loading || !file) return false

        setErrors(null)

        try {
          const result = await avatarUpload(file)

          if (result.data?.avatarUpload?.errors) {
            setErrors(result.data.avatarUpload.errors)
            return false
          }

          showToast(
            <Trans id="avatar_modal.avatar_updated">
              Avatar has been updated.
            </Trans>
          )

          setFile(null)
          closeModal()

          return false
        } catch (error) {
          return false // do nothing when avatarUpload throws
        }
      }}
    >
      <ModalFormBody>
        {errors &&
          errors.map((error, i) => (
            <AvatarValidationError
              error={error}
              value={file}
              uploadMaxSize={uploadLimit}
              imageMinSize={avatarUploadImageMinSize}
              key={i}
            >
              {({ message }) => <p className="text-danger">{message}</p>}
            </AvatarValidationError>
          ))}
        <input
          accept={avatarUploadContentTypes.join(",")}
          type="file"
          disabled={loading}
          onChange={(event) => {
            if (event.target.files && event.target.files.length) {
              setFile(event.target.files[0])
            }
          }}
        />
        <p className="text-muted text-center">
          <small>
            <Trans id="avatar_modal.upload_instruction">
              {avatarUploadImageMinSize}x{avatarUploadImageMinSize}px weighting
              less than {formatFileSizeShort(uploadLimit)}.
            </Trans>
          </small>
        </p>
      </ModalFormBody>
      <ModalFooter>
        <ButtonPrimary
          disabled={!file}
          loading={loading}
          text={<Trans id="avatar_modal.upload_image">Upload image</Trans>}
          block
        />
      </ModalFooter>
    </form>
  )
}

export default AvatarUploadForm
