import { ApolloError, MutationResult, gql, useMutation } from "@apollo/client"
import { useModalContext } from "../../../Context"
import { MutationError } from "../../../types"
import { Thread } from "../Threads.types"
import ThreadsModerationOpen from "./ThreadsModerationOpen"

const THREADS_BULK_OPEN = gql`
  mutation ThreadsBulkOpen($threads: [ID!]!) {
    threadsBulkOpen(threads: $threads) {
      threads {
        id
        isClosed
      }
      errors {
        message
        location
        type
      }
    }
  }
`

interface ThreadsBulkOpenMutationData {
  threadsBulkOpen: {
    threads: Array<{
      id: string
      isClosed: boolean
    }> | null
    errors: Array<MutationError> | null
  }
}

interface ThreadsBulkOpenMutationVariables {
  threads: Array<string>
}

const useThreadsBulkOpen = (
  threads: Array<Thread>
): [() => Promise<void>, MutationResult<ThreadsBulkOpenMutationData>] => {
  const [mutation, state] = useMutation<
    ThreadsBulkOpenMutationData,
    ThreadsBulkOpenMutationVariables
  >(THREADS_BULK_OPEN, {
    variables: {
      threads: threads.map((thread) => thread.id),
    },
  })

  const { openModal } = useModalContext()

  const runMutation = async () => {
    try {
      const { data } = await mutation()
      const errors = data?.threadsBulkOpen.errors
      if (errors) {
        openModal(<ThreadsModerationOpen threads={threads} errors={errors} />)
      }
    } catch (error) {
      if (error instanceof ApolloError) {
        openModal(
          <ThreadsModerationOpen threads={threads} graphqlError={error} />
        )
      }
    }
  }

  return [runMutation, state]
}

export default useThreadsBulkOpen
