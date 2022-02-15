import { gql, useMutation } from "@apollo/client"
import { MutationError } from "../../../../../types"
import { Post } from "../../../Thread.types"
import { THREAD_QUERY, ThreadData } from "../../../useThreadQuery"

const POST_DELETE = gql`
  mutation PostDelete($thread: ID!, $post: ID!, $page: Int) {
    postDelete(thread: $thread, post: $post) {
      thread {
        id
        lastPostedAt
        replies
        lastPosterName
        lastPoster {
          id
          name
          slug
          extra
          avatars {
            size
            url
          }
        }
      }
      posts(page: $page) {
        results {
          id
          richText
          edits
          postedAt
          extra
          posterName
          poster {
            id
            name
            slug
            extra
            avatars {
              size
              url
            }
            extra
          }
        }
        totalPages
        pageInfo {
          number
        }
      }
      errors {
        message
        location
        type
      }
    }
  }
`

interface PostDeleteMutationData {
  postDelete: {
    posts: {
      results: Array<Post>
      totalPages: number
      pageInfo: {
        number: number
      }
    } | null
    errors: Array<MutationError> | null
  }
}

interface PostDeleteMutationVariables {
  thread: string
  post: string
}

const usePostDeleteMutation = () => {
  const [mutation, { data, error, loading }] = useMutation<
    PostDeleteMutationData,
    PostDeleteMutationVariables
  >(POST_DELETE)

  return {
    data,
    error,
    loading,
    postDelete: (threadId: string, post: Post, page: number | undefined) => {
      return mutation({
        variables: {
          thread: threadId,
          post: post.id,
        },
        update: (cache, { data }) => {
          if (!data || !data.postDelete) return

          const queryID = page
            ? {
                query: THREAD_QUERY,
                variables: { page, id: threadId },
              }
            : {
                query: THREAD_QUERY,
                variables: { id: threadId },
              }

          const query = cache.readQuery<ThreadData>(queryID)
          if (!query?.posts?.results.length) return null

          if (data.postDelete.posts) {
            cache.writeQuery<ThreadData>({
              ...queryID,
              data: {
                ...query,
                posts: data.postDelete.posts,
              },
            })
          }
        },
      })
    },
  }
}

export default usePostDeleteMutation
