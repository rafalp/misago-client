import { gql, useMutation } from "@apollo/client"
import { MutationError } from "../types"

const USER_CREATE = gql`
  mutation UserCreate($input: UserCreateInput!) {
    userCreate(input: $input) {
      user {
        id
        name
      }
      token
      errors {
        location
        message
        type
      }
    }
  }
`

interface UserCreateData {
  userCreate: {
    errors: Array<MutationError> | null
    user: {
      id: string
      name: string
    } | null
    token: string | null
  }
}

interface UserCreateValues {
  input: {
    name: string
    email: string
    password: string
  }
}

const useUserCreateMutation = () => {
  return useMutation<UserCreateData, UserCreateValues>(USER_CREATE, {
    errorPolicy: "all",
  })
}

export default useUserCreateMutation
