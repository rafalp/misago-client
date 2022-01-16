import { gql, useMutation } from "@apollo/client"
import { MutationError } from "../types"

const SITE_SETUP = gql`
  mutation SiteSetup($input: SiteSetupInput!) {
    siteSetup(input: $input) {
      errors {
        message
        location
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

interface SiteSetupMutationData {
  siteSetup: {
    errors: Array<MutationError> | null
    user: { id: string; name: string } | null
    token: string | null
  }
}

interface SiteSetupMutationVariables {
  input: {
    forumName: string
    forumIndexThreads: boolean
    name: string
    email: string
    password: string
  }
}

const useSiteSetupMutation = () => {
  return useMutation<SiteSetupMutationData, SiteSetupMutationVariables>(
    SITE_SETUP
  )
}

export default useSiteSetupMutation
