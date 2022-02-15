import { gql, useQuery } from "@apollo/client"

const THREAD_LAST_POST_URL_QUERY = gql`
  query ThreadLastPostUrl($id: ID!) {
    thread(id: $id) {
      id
      lastPost {
        url
      }
    }
  }
`

interface ThreadLastPostUrlVariables {
  id: string
}

interface ThreadLastPostUrlData {
  thread: {
    lastPost: {
      url: string
    } | null
  } | null
}

const useThreadLastPostUrlQuery = (variables: ThreadLastPostUrlVariables) => {
  return useQuery<ThreadLastPostUrlData, ThreadLastPostUrlVariables>(
    THREAD_LAST_POST_URL_QUERY,
    {
      variables,
      fetchPolicy: "network-only",
    }
  )
}

export default useThreadLastPostUrlQuery
