import { gql, useMutation } from "@apollo/client"
import { MutationError } from "../../../types"
import { Thread } from "../Thread.types"

const THREAD_TITLE_UPDATE = gql`
  mutation ThreadTitleUpdate($input: ThreadTitleUpdateInput!) {
    threadTitleUpdate(input: $input) {
      errors {
        message
        location
        type
      }
      thread {
        id
        title
      }
    }
  }
`

interface ThreadTitleUpdateMutationData {
  threadTitleUpdate: {
    errors: Array<MutationError> | null
    thread: {
      id: string
      title: string
    } | null
  }
}

interface ThreadTitleUpdateMutationVariables {
  input: {
    thread: string
    title: string
  }
}

const useThreadTitleUpdateMutation = (thread: Thread) => {
  const [mutation, { data, error, loading }] = useMutation<
    ThreadTitleUpdateMutationData,
    ThreadTitleUpdateMutationVariables
  >(THREAD_TITLE_UPDATE)

  return {
    data,
    error,
    loading,
    threadTitleUpdate: (title: string) => {
      return mutation({
        variables: {
          input: { title, thread: thread.id },
        },
      })
    },
  }
}

export default useThreadTitleUpdateMutation
