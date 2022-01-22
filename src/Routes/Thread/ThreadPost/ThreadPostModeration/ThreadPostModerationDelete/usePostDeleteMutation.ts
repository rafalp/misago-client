import { gql, useMutation } from "@apollo/client"
import { MutationError } from "../../../../../types"
import { Post } from "../../../Thread.types"
import { THREAD_QUERY, ThreadData } from "../../../useThreadQuery"

const POST_DELETE = gql`
  mutation PostDelete($thread: ID!, $post: ID!) {
    postDelete(thread: $thread, post: $post) {
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
          extra
          avatars {
            size
            url
          }
        }
        posts {
          pagination {
            pages
          }
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
    deleted: boolean
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
          if (!query?.thread?.posts.page?.items.length) return null

          if (data.postDelete.deleted) {
            const deletedId = post.id

            cache.writeQuery<ThreadData>({
              ...queryID,
              data: {
                ...query,
                thread: {
                  ...query.thread,
                  posts: {
                    ...query.thread.posts,
                    page: {
                      ...query.thread.posts.page,
                      items: query.thread.posts.page.items.filter((post) => {
                        return post.id != deletedId
                      }),
                    },
                  },
                },
              },
            })
          }
        },
      })
    },
  }
}

export default usePostDeleteMutation
