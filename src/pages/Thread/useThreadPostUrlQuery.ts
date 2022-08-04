import { gql, useQuery } from "@apollo/client"

const THREAD_POST_URL_QUERY = gql`
  query ThreadPostUrl($id: ID!, $postId: ID!) {
    thread(id: $id) {
      id
      post(id: $postId) {
        url
      }
    }
  }
`

interface ThreadPostUrlVariables {
  id: string
  postId: string
}

interface ThreadPostUrlData {
  thread: {
    post: {
      url: string
    } | null
  } | null
}

const useThreadPostUrlQuery = (variables: ThreadPostUrlVariables) => {
  return useQuery<ThreadPostUrlData, ThreadPostUrlVariables>(
    THREAD_POST_URL_QUERY,
    {
      variables,
      fetchPolicy: "network-only",
    }
  )
}

export default useThreadPostUrlQuery
