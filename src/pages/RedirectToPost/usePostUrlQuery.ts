import { gql, useQuery } from "@apollo/client"

const POST_URL_QUERY = gql`
  query PostUrl($id: ID!) {
    post(id: $id) {
      url
    }
  }
`

interface PostUrlVariables {
  id: string
}

interface PostUrlData {
  post: {
    url: string
  } | null
}

const usePostUrlQuery = (variables: PostUrlVariables) => {
  return useQuery<PostUrlData, PostUrlVariables>(POST_URL_QUERY, {
    variables,
    fetchPolicy: "network-only",
  })
}

export default usePostUrlQuery
