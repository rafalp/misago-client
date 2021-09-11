import { ApolloError } from "apollo-client"
import React from "react"
import { ErrorMessage, GraphQLErrorMessage } from "../../../../UI/Error"
import GraphQLErrorRenderer from "../../../../UI/GraphQLErrorRenderer"
import {
  ModalAlert,
  ModalCloseFooter,
  ModalErrorBody,
} from "../../../../UI/Modal"
import RootError from "../../../../UI/RootError"
import useRootError from "../../../../UI/useRootError"
import { useSelectionErrors } from "../../../../UI/useSelectionErrors"
import { MutationError } from "../../../../types"
import { SelectedThread } from "../../Threads.types"
import ThreadsModerationErrorHeader from "./ThreadsModerationErrorHeader"
import ThreadsModerationErrorThreads from "./ThreadsModerationErrorThreads"

interface ThreadsModerationErrorProps {
  graphqlError?: ApolloError | null
  errors?: Array<MutationError> | null
  forDelete?: boolean
  threads?: Array<SelectedThread>
  close: () => void
}

const ThreadsModerationError: React.FC<ThreadsModerationErrorProps> = ({
  graphqlError,
  errors,
  forDelete,
  threads,
  close,
}) => {
  const hasRootError = !!useRootError(errors)
  const { errors: threadsErrors } = useSelectionErrors<SelectedThread>(
    "threads",
    threads,
    errors || []
  )

  if (hasRootError) {
    return (
      <RootError dataErrors={errors}>
        {({ message }) => (
          <>
            <ModalErrorBody
              header={<ThreadsModerationErrorHeader forDelete={forDelete} />}
              message={message}
            />
            <ModalCloseFooter close={close} />
          </>
        )}
      </RootError>
    )
  }

  if (graphqlError) {
    return (
      <>
        <ModalErrorBody
          header={<ThreadsModerationErrorHeader forDelete={forDelete} />}
          message={
            <GraphQLErrorRenderer
              error={graphqlError}
              networkError={<GraphQLErrorMessage />}
              queryError={<ErrorMessage />}
            />
          }
        />
        <ModalCloseFooter close={close} />
      </>
    )
  }

  if (threads) {
    return (
      <>
        <ModalAlert>
          <ThreadsModerationErrorHeader
            forDelete={forDelete}
            threads={threads}
            threadsErrors={threadsErrors}
          />
        </ModalAlert>
        <ThreadsModerationErrorThreads
          errors={threadsErrors}
          threads={threads}
        />
        <ModalCloseFooter close={close} />
      </>
    )
  }

  return null
}

export default ThreadsModerationError
