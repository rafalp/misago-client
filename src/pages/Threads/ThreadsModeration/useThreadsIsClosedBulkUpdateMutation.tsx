import { ApolloError, MutationResult, gql, useMutation } from "@apollo/client"
import { useModalContext } from "../../../Context"
import { MutationError } from "../../../types"
import { Thread } from "../Threads.types"
import ThreadsModerationClose from "./ThreadsModerationClose"
import ThreadsModerationOpen from "./ThreadsModerationOpen"

const THREADS_IS_CLOSED_BULK_UPDATE = gql`
  mutation ThreadsIsClosedBulkUpdate($input: ThreadsIsClosedBulkUpdateInput!) {
    threadsIsClosedBulkUpdate(input: $input) {
      updated
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

interface ThreadsIsClosedBulkUpdateMutationData {
  threadsIsClosedBulkUpdate: {
    updated: boolean
    threads: Array<{
      id: string
      isClosed: boolean
    }> | null
    errors: Array<MutationError> | null
  }
}

interface ThreadsIsClosedBulkUpdateMutationVariables {
  input: {
    threads: Array<string>
    isClosed: boolean
  }
}

const useThreadsIsClosedBulkUpdateMutation = (
  threads: Array<Thread>,
  isClosed: boolean
): [
  () => Promise<void>,
  MutationResult<ThreadsIsClosedBulkUpdateMutationData>
] => {
  const [mutation, state] = useMutation<
    ThreadsIsClosedBulkUpdateMutationData,
    ThreadsIsClosedBulkUpdateMutationVariables
  >(THREADS_IS_CLOSED_BULK_UPDATE, {
    variables: {
      input: {
        isClosed,
        threads: threads.map((thread) => thread.id),
      },
    },
  })

  const { openModal } = useModalContext()

  const runMutation = async () => {
    const ErrorModal = isClosed
      ? ThreadsModerationClose
      : ThreadsModerationOpen

    try {
      const { data } = await mutation()
      const errors = data?.threadsIsClosedBulkUpdate.errors
      if (errors) {
        openModal(<ErrorModal threads={threads} errors={errors} />)
      }
    } catch (error) {
      if (error instanceof ApolloError) {
        openModal(<ErrorModal threads={threads} graphqlError={error} />)
      }
    }
  }

  return [runMutation, state]
}

const useThreadsBulkClose = (threads: Array<Thread>) => {
  return useThreadsIsClosedBulkUpdateMutation(threads, true)
}

const useThreadsBulkOpen = (threads: Array<Thread>) => {
  return useThreadsIsClosedBulkUpdateMutation(threads, false)
}

export { useThreadsBulkClose, useThreadsBulkOpen }
