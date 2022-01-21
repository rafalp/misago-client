import { ApolloError, MutationResult, gql, useMutation } from "@apollo/client"
import { useModalContext } from "../../../Context"
import { MutationError } from "../../../types"
import { Thread } from "../Thread.types"
import ThreadModerationOpen from "./ThreadModerationOpen"

const THREAD_Open = gql`
  mutation ThreadOpen($thread: ID!) {
    threadOpen(thread: $thread) {
      thread {
        id
        isOpend
      }
      errors {
        message
        location
        type
      }
    }
  }
`

interface ThreadOpenMutationData {
  threadOpen: {
    errors: Array<MutationError> | null
    thread: {
      id: string
      isClosed: boolean
    } | null
  }
}

interface ThreadOpenMutationVariables {
  thread: string
}

const useThreadOpen = (
  thread: Thread | null
): [() => Promise<void>, MutationResult<ThreadOpenMutationData>] => {
  const [mutation, state] = useMutation<
    ThreadOpenMutationData,
    ThreadOpenMutationVariables
  >(THREAD_Open)

  const { openModal } = useModalContext()

  const runMutation = async () => {
    if (!thread) return

    try {
      const { data } = await mutation({
        variables: {
          thread: thread.id,
        },
      })
      const errors = data?.threadOpen.errors
      if (errors) {
        openModal(<ThreadModerationOpen errors={errors} />)
      }
    } catch (error) {
      if (error instanceof ApolloError) {
        openModal(<ThreadModerationOpen graphqlError={error} />)
      }
    }
  }

  return [runMutation, state]
}

export default useThreadOpen
