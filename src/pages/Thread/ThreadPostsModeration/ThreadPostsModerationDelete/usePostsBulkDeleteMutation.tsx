import { gql, useMutation } from "@apollo/client"
import { MutationError } from "../../../../types"
import { Post, Thread } from "../../Thread.types"
import { THREAD_QUERY, ThreadData } from "../../useThreadQuery"

const DELETE_THREAD_POSTS = gql`
  mutation PostsBulkDelete($thread: ID!, $posts: [ID!]!, $page: Int) {
    postsBulkDelete(thread: $thread, posts: $posts) {
      deleted
      thread {
        id
        lastPostedAt
        replies
        lastPosterName
        lastPoster {
          id
          name
          slug
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
          posterName
          poster {
            id
            name
            slug
            avatars {
              size
              url
            }
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

interface PostsBulkDeleteMutationData {
  postsBulkDelete: {
    deleted: Array<string>
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

interface PostsBulkDeleteMutationVariables {
  thread: string
  posts: Array<string>
}

const usePostsBulkDeleteMutation = () => {
  const [mutation, { data, error, loading }] = useMutation<
    PostsBulkDeleteMutationData,
    PostsBulkDeleteMutationVariables
  >(DELETE_THREAD_POSTS)

  return {
    data,
    error,
    loading,
    postsBulkDelete: (
      thread: Thread,
      posts: Array<Post>,
      page: number | undefined
    ) => {
      const deletedPosts = posts.map((posts) => posts.id)

      return mutation({
        variables: {
          thread: thread.id,
          posts: deletedPosts,
        },
        update: (cache, { data }) => {
          if (!data || !data.postsBulkDelete) return

          const queryID = page
            ? {
                query: THREAD_QUERY,
                variables: { page, id: thread.id },
              }
            : {
                query: THREAD_QUERY,
                variables: { id: thread.id },
              }

          const query = cache.readQuery<ThreadData>(queryID)
          if (!query?.posts?.results.length) return null

          if (data.postsBulkDelete.posts) {
            cache.writeQuery<ThreadData>({
              ...queryID,
              data: {
                ...query,
                posts: data.postsBulkDelete.posts,
              },
            })
          }
        },
      })
    },
  }
}

export default usePostsBulkDeleteMutation
