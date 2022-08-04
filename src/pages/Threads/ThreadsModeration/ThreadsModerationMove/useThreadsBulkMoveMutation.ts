import { gql, useMutation } from "@apollo/client"
import { MutationError } from "../../../../types"
import { Thread, ThreadCategory } from "../../Threads.types"

const THREADS_BULK_MOVE = gql`
  mutation ThreadsBulkMove($threads: [ID!]!, $category: ID!) {
    threadsBulkMove(threads: $threads, category: $category) {
      updated
      threads {
        id
        category {
          id
          name
          slug
          color
          icon
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

interface ThreadsBulkMoveMutationData {
  threadsBulkMove: {
    updated: Array<string>
    threads: Array<{
      id: string
      category: ThreadCategory
    }> | null
    errors: Array<MutationError> | null
  }
}

interface ThreadsBulkMoveMutationVariables {
  threads: Array<string>
  category: string
}

const useThreadsBulkMoveMutation = () => {
  const [mutation, { data, error, loading }] = useMutation<
    ThreadsBulkMoveMutationData,
    ThreadsBulkMoveMutationVariables
  >(THREADS_BULK_MOVE)

  return {
    data,
    error,
    loading,
    threadsBulkMove: (threads: Array<Thread>, category: string) => {
      return mutation({
        variables: {
          category,
          threads: threads.map((thread) => thread.id),
        },
      })
    },
  }
}

export default useThreadsBulkMoveMutation
