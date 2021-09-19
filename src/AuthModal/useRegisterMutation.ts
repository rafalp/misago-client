import { gql, useMutation } from "@apollo/client"
import { MutationError } from "../types"

const REGISTER = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      errors {
        location
        message
        type
      }
      user {
        id
        name
      }
      token
    }
  }
`

interface RegisterData {
  register: {
    errors: Array<MutationError> | null
    user: {
      id: string
      name: string
    } | null
    token: string | null
  }
}

interface RegisterValues {
  input: {
    name: string
    email: string
    password: string
  }
}

const useRegisterMutation = () => {
  return useMutation<RegisterData, RegisterValues>(REGISTER, {
    errorPolicy: "all",
  })
}

export default useRegisterMutation
