import { ApolloError, MutationResult, gql, useMutation } from "@apollo/client"
import { useModalContext } from "../../../Context"
import { MutationError } from "../../../types"
import { Thread } from "../Threads.types"
import ThreadsModerationClose from "./ThreadsModerationClose"

const THREADS_BULK_CLOSE = gql`
  mutation ThreadsBulkClose($threads: [IDD]!) {
    threadsBulkClose(threads: $threads) {
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

interface ThreadsBulkCloseMutationData {
  threadsBulkClose: {
    threads: Array<{
      id: string
      isClosed: boolean
    }> | null
    errors: Array<MutationError> | null
  }
}

interface ThreadsBulkCloseMutationVariables {
  threads: Array<string>
}

const useThreadsBulkClose = (
  threads: Array<Thread>
): [() => Promise<void>, MutationResult<ThreadsBulkCloseMutationData>] => {
  const [mutation, state] = useMutation<
    ThreadsBulkCloseMutationData,
    ThreadsBulkCloseMutationVariables
  >(THREADS_BULK_CLOSE, {
    variables: {
      threads: threads.map((thread) => thread.id),
    },
  })

  const { openModal } = useModalContext()

  const runMutation = async () => {
    try {
      const { data } = await mutation()
      const errors = data?.threadsBulkClose.errors
      if (errors) {
        openModal(<ThreadsModerationClose threads={threads} errors={errors} />)
      }
    } catch (error) {
      if (error instanceof ApolloError) {
        openModal(
          <ThreadsModerationClose threads={threads} graphqlError={error} />
        )
      }
    }
  }

  return [runMutation, state]
}

export default useThreadsBulkClose
