import { gql, useMutation } from "@apollo/client"
import { MutationError } from "../../../../types"
import { Thread } from "../../Thread.types"

const THREAD_DELETE = gql`
  mutation ThreadDelete($input: ThreadDeleteInput!) {
    threadDelete(input: $input) {
      errors {
        message
        location
        type
      }
    }
  }
`

interface ThreadDeleteMutationData {
  threadDelete: {
    errors: Array<MutationError> | null
  }
}

interface ThreadDeleteMutationVariables {
  input: {
    thread: string
  }
}

const useThreadDeleteMutation = () => {
  const [mutation, { data, error, loading }] = useMutation<
    ThreadDeleteMutationData,
    ThreadDeleteMutationVariables
  >(THREAD_DELETE)

  return {
    data,
    error,
    loading,
    threadDelete: (thread: Thread) => {
      return mutation({
        variables: {
          input: { thread: thread.id },
        },
      })
    },
  }
}

export default useThreadDeleteMutation
