import { gql, useMutation } from "@apollo/client"
import { MutationError } from "../../../types"
import { Thread } from "../Thread.types"

const THREAD_RENAME = gql`
  mutation ThreadRename($thread: ID!, $title: String!) {
    threadRename(thread: $thread, title: $title) {
      thread {
        id
        title
      }
      errors {
        message
        location
        type
      }
    }
  }
`

interface ThreadRenameMutationData {
  threadRename: {
    errors: Array<MutationError> | null
    thread: {
      id: string
      title: string
    } | null
  }
}

interface ThreadRenameMutationVariables {
  thread: string
  title: string
}

const useThreadRenameMutation = (thread: Thread) => {
  const [mutation, { data, error, loading }] = useMutation<
    ThreadRenameMutationData,
    ThreadRenameMutationVariables
  >(THREAD_RENAME)

  return {
    data,
    error,
    loading,
    threadRename: (title: string) => {
      return mutation({
        variables: {
          title,
          thread: thread.id,
        },
      })
    },
  }
}

export default useThreadRenameMutation
