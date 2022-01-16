import { gql, useMutation } from "@apollo/client"
import { MutationError } from "../../../../types"
import { Thread, ThreadCategory } from "../../Thread.types"

const THREAD_CATEGORY_UPDATE = gql`
  mutation ThreadCategoryUpdate($input: ThreadCategoryUpdateInput!) {
    threadCategoryUpdate(input: $input) {
      errors {
        message
        location
        type
      }
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
    }
  }
`

interface ThreadCategoryUpdateMutationData {
  threadCategoryUpdate: {
    errors: Array<MutationError> | null
    thread: {
      id: string
      category: ThreadCategory
    } | null
  }
}

interface ThreadCategoryUpdateMutationVariables {
  input: {
    thread: string
    category: string
  }
}

const useThreadCategoryUpdateMutation = () => {
  const [mutation, { data, error, loading }] = useMutation<
    ThreadCategoryUpdateMutationData,
    ThreadCategoryUpdateMutationVariables
  >(THREAD_CATEGORY_UPDATE)

  return {
    data,
    error,
    loading,
    threadCategoryUpdate: (thread: Thread, category: string) => {
      return mutation({
        variables: {
          input: { category, thread: thread.id },
        },
      })
    },
  }
}

export default useThreadCategoryUpdateMutation
