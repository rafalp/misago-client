import { ApolloError, MutationResult, gql, useMutation } from "@apollo/client"
import { useModalContext } from "../../../Context"
import { MutationError } from "../../../types"
import { Thread } from "../Thread.types"
import ThreadModerationClose from "./ThreadModerationClose"
import ThreadModerationOpen from "./ThreadModerationOpen"

const CLOSE_THREAD = gql`
  mutation CloseThread($input: CloseThreadInput!) {
    closeThread(input: $input) {
      errors {
        message
        location
        type
      }
      thread {
        id
        isClosed
      }
    }
  }
`

interface CloseThreadMutationData {
  closeThread: {
    errors: Array<MutationError> | null
    thread: {
      id: string
      isClosed: boolean
    } | null
  }
}

interface CloseThreadMutationVariables {
  input: {
    thread: string
    isClosed: boolean
  }
}

const useCloseThreadMutation = (
  thread: Thread | null,
  isClosed: boolean
): [() => Promise<void>, MutationResult<CloseThreadMutationData>] => {
  const [mutation, state] = useMutation<
    CloseThreadMutationData,
    CloseThreadMutationVariables
  >(CLOSE_THREAD)

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
      const errors = data?.closeThread.errors
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
  return useCloseThreadMutation(thread, true)
}

const useOpenThread = (thread: Thread | null) => {
  return useCloseThreadMutation(thread, false)
}

export { useCloseThread, useOpenThread }
