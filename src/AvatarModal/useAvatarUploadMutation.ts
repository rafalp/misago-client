import { gql, useMutation } from "@apollo/client"
import { AvatarData, MutationError } from "../types"

const AVATAR_UPLOAD_MUTATION = gql`
  mutation AvatarUpload($upload: Upload!) {
    avatarUpload(upload: $upload) {
      errors {
        message
        location
        type
      }
      user {
        id
        avatars {
          size
          url
        }
      }
    }
  }
`

interface AvatarUploadMutationData {
  avatarUpload: {
    errors: Array<MutationError> | null
    user: {
      id: string
      avatars: Array<AvatarData>
    } | null
  }
}

interface AvatarUploadMutationVariables {
  upload: File
}

const useAvatarUploadMutation = () => {
  const [mutation, { data, error, loading }] = useMutation<
    AvatarUploadMutationData,
    AvatarUploadMutationVariables
  >(AVATAR_UPLOAD_MUTATION)

  return {
    data,
    error,
    loading,
    avatarUpload: (upload: File) => {
      return mutation({
        variables: { upload },
      })
    },
  }
}

export default useAvatarUploadMutation
