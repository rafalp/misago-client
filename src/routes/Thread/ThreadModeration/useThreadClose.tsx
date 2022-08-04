import { ApolloError, MutationResult, gql, useMutation } from "@apollo/client"
import { useModalContext } from "../../../Context"
import { MutationError } from "../../../types"
import { Thread } from "../Thread.types"
import ThreadModerationClose from "./ThreadModerationClose"

const THREAD_CLOSE = gql`
  mutation ThreadClose($thread: ID!) {
    threadClose(thread: $thread) {
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

interface ThreadCloseMutationData {
  threadClose: {
    errors: Array<MutationError> | null
    thread: {
      id: string
      isClosed: boolean
    } | null
  }
}

interface ThreadCloseMutationVariables {
  thread: string
}

const useThreadClose = (
  thread: Thread | null
): [() => Promise<void>, MutationResult<ThreadCloseMutationData>] => {
  const [mutation, state] = useMutation<
    ThreadCloseMutationData,
    ThreadCloseMutationVariables
  >(THREAD_CLOSE)

  const { openModal } = useModalContext()

  const runMutation = async () => {
    if (!thread) return

    try {
      const { data } = await mutation({
        variables: {
          thread: thread.id,
        },
      })
      const errors = data?.threadClose.errors
      if (errors) {
        openModal(<ThreadModerationClose errors={errors} />)
      }
    } catch (error) {
      if (error instanceof ApolloError) {
        openModal(<ThreadModerationClose graphqlError={error} />)
      }
    }
  }

  return [runMutation, state]
}

export default useThreadClose
