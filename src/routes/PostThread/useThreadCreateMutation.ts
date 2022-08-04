import { gql, useMutation } from "@apollo/client"
import { MutationError } from "../../types"

const THREAD_CREATE = gql`
  mutation ThreadCreate($input: ThreadCreateInput!) {
    threadCreate(input: $input) {
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
    }
  }
`

interface ThreadCreateMutationData {
  threadCreate: {
    errors: Array<MutationError> | null
    thread: {
      id: string
      title: string
      slug: string
    } | null
  }
}

interface ThreadCreateMutationValues {
  input: {
    category: string
    title: string
    markup: string
    isClosed?: boolean
  }
}

const useThreadCreateMutation = () => {
  return useMutation<ThreadCreateMutationData, ThreadCreateMutationValues>(
    THREAD_CREATE
  )
}

export default useThreadCreateMutation
