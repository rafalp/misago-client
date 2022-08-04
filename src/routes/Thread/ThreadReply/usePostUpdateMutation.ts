import { gql, useMutation } from "@apollo/client"
import { MutationError, RichText } from "../../../types"

const POST_UPDATE = gql`
  mutation PostUpdate($input: PostUpdateInput!) {
    postUpdate(input: $input) {
      errors {
        message
        location
        type
      }
      post {
        id
        richText
        edits
      }
    }
  }
`

interface PostUpdateMutationData {
  postUpdate: {
    errors: Array<MutationError> | null
    post: {
      id: string
      richText: RichText
      edits: number
    } | null
  }
}

interface PostUpdateMutationVariables {
  input: {
    post: string
    markup: string
  }
}

const usePostUpdateMutation = (post: { id: string }) => {
  const [mutation, { data, error, loading }] = useMutation<
    PostUpdateMutationData,
    PostUpdateMutationVariables
  >(POST_UPDATE)

  return {
    data,
    error,
    loading,
    postUpdate: (markup: string) => {
      return mutation({
        variables: {
          input: { markup, post: post.id },
        },
      })
    },
  }
}

export default usePostUpdateMutation
