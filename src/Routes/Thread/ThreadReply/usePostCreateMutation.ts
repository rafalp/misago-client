import { gql, useMutation } from "@apollo/client"
import { MutationError } from "../../../types"

const POST_CREATE = gql`
  mutation PostCreate($input: PostCreateInput!) {
    postCreate(input: $input) {
      errors {
        location
        message
        type
      }
      thread {
        id
        title
        slug
      }
      post {
        id
      }
    }
  }
`

interface PostCreateMutationData {
  postCreate: {
    errors: Array<MutationError> | null
    thread: {
      id: string
      slug: string
    } | null
    post: {
      id: string
    } | null
  }
}

interface PostCreateMutationValues {
  input: {
    thread: string
    markup: string
  }
}

const usePostCreateMutation = () => {
  return useMutation<PostCreateMutationData, PostCreateMutationValues>(
    POST_CREATE
  )
}

export default usePostCreateMutation
