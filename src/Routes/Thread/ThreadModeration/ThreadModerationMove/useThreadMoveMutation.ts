import { gql, useMutation } from "@apollo/client"
import { MutationError } from "../../../../types"
import { Thread, ThreadCategory } from "../../Thread.types"

const THREAD_MOVE = gql`
  mutation ThreadMove($thread: ID!, $category: ID!) {
    threadMove(thread: $thread, category: $category) {
      thread {
        id
        category {
          id
          name
          slug
          color
          icon
          isClosed
          banner {
            full {
              align
              background
              height
              url
            }
            half {
              align
              background
              height
              url
            }
          }
          parent {
            id
            name
            slug
            color
            icon
          }
        }
      }
      errors {
        message
        location
        type
      }
    }
  }
`

interface ThreadMoveMutationData {
  threadMove: {
    thread: {
      id: string
      category: ThreadCategory
    } | null
    errors: Array<MutationError> | null
  }
}

interface ThreadMoveMutationVariables {
  thread: string
  category: string
}

const useThreadMoveMutation = () => {
  const [mutation, { data, error, loading }] = useMutation<
    ThreadMoveMutationData,
    ThreadMoveMutationVariables
  >(THREAD_MOVE)

  return {
    data,
    error,
    loading,
    threadMove: (thread: Thread, category: string) => {
      return mutation({
        variables: {
          category,
          thread: thread.id,
        },
      })
    },
  }
}

export default useThreadMoveMutation
