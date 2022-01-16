import { ApolloError, MutationResult, gql, useMutation } from "@apollo/client"
import { useModalContext } from "../../../Context"
import { MutationError } from "../../../types"
import { Thread } from "../Thread.types"
import ThreadModerationClose from "./ThreadModerationClose"
import ThreadModerationOpen from "./ThreadModerationOpen"

const THREAD_IS_CLOSED_UPDATE = gql`
  mutation ThreadIsClosedUpdate($input: ThreadIsClosedUpdateInput!) {
    threadIsClosedUpdate(input: $input) {
      thread {
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

interface ThreadIsClosedUpdateMutationData {
  threadIsClosedUpdate: {
    errors: Array<MutationError> | null
    thread: {
      id: string
      isClosed: boolean
    } | null
  }
}

interface ThreadIsClosedUpdateMutationVariables {
  input: {
    thread: string
    isClosed: boolean
  }
}

const useThreadIsClosedUpdate = (
  thread: Thread | null,
  isClosed: boolean
): [() => Promise<void>, MutationResult<ThreadIsClosedUpdateMutationData>] => {
  const [mutation, state] = useMutation<
    ThreadIsClosedUpdateMutationData,
    ThreadIsClosedUpdateMutationVariables
  >(THREAD_IS_CLOSED_UPDATE)

  const { openModal } = useModalContext()

  const runMutation = async () => {
    if (!thread) return

    const ErrorModal = isClosed ? ThreadModerationClose : ThreadModerationOpen

    try {
      const { data } = await mutation({
        variables: {
          input: {
            isClosed,
            thread: thread.id,
          },
        },
      })
      const errors = data?.threadIsClosedUpdate.errors
      if (errors) {
        openModal(<ErrorModal errors={errors} />)
      }
    } catch (error) {
      if (error instanceof ApolloError) {
        openModal(<ErrorModal graphqlError={error} />)
      }
    }
  }

  return [runMutation, state]
}

const useCloseThread = (thread: Thread | null) => {
  return useThreadIsClosedUpdate(thread, true)
}

const useOpenThread = (thread: Thread | null) => {
  return useThreadIsClosedUpdate(thread, false)
}

export { useCloseThread, useThreadIsClosedUpdate, useOpenThread }
