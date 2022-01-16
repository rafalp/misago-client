import { gql, useMutation } from "@apollo/client"
import { getSelectionErrors } from "../../../../UI/useSelectionErrors"
import { Category, MutationError } from "../../../../types"
import { Thread } from "../../Threads.types"
import {
  CATEGORY_THREADS_QUERY,
  THREADS_QUERY,
  ThreadsData,
} from "../../useThreadsQuery"

const THREAD_NOT_EXISTS = "value_error.thread.not_exists"

const THREADS_BULK_DELETE = gql`
  mutation ThreadsBulkDelete($threads: [ID!]!) {
    threadsBulkDelete(threads: $threads) {
      deleted
      errors {
        message
        location
        type
      }
    }
  }
`

interface ThreadsBulkDeleteMutationData {
  threadsBulkDelete: {
    errors: Array<MutationError> | null
    deleted: Array<string>
  }
}

interface ThreadsBulkDeleteMutationVariables {
  threads: Array<string>
}

const useThreadsBulkDeleteMutation = () => {
  const [mutation, { data, error, loading }] = useMutation<
    ThreadsBulkDeleteMutationData,
    ThreadsBulkDeleteMutationVariables
  >(THREADS_BULK_DELETE)

  return {
    data,
    error,
    loading,
    threadsBulkDelete: (
      threads: Array<Thread>,
      category?: Category | null
    ) => {
      return mutation({
        variables: {
          threads: threads.map((thread) => thread.id),
        },
        update: (cache, { data }) => {
          if (!data || !data.threadsBulkDelete) return

          const errors = getSelectionErrors<Thread>(
            "threads",
            threads,
            data.threadsBulkDelete.errors || []
          )

          let queryID = category
            ? {
                query: CATEGORY_THREADS_QUERY,
                variables: { category: category.id },
              }
            : {
                query: THREADS_QUERY,
              }

          const query = cache.readQuery<ThreadsData>(queryID)
          if (!query) return null

          cache.writeQuery<ThreadsData>({
            ...queryID,
            data: {
              ...query,
              threads: {
                ...query.threads,
                items: query.threads.items.filter((thread) => {
                  if (
                    errors[thread.id] &&
                    errors[thread.id].type !== THREAD_NOT_EXISTS
                  ) {
                    return true
                  }

                  return data.threadsBulkDelete.deleted.indexOf(thread.id) < 0
                }),
              },
            },
          })
        },
      })
    },
  }
}

export default useThreadsBulkDeleteMutation
