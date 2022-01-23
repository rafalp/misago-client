import { gql, useMutation } from "@apollo/client"
import { getSelectionErrors } from "../../../../UI/useSelectionErrors"
import { MutationError } from "../../../../types"
import { Post, Thread } from "../../Thread.types"
import { THREAD_QUERY, ThreadData } from "../../useThreadQuery"

const POST_NOT_FOUND = "value_error.post.not_found"

const DELETE_THREAD_POSTS = gql`
  mutation PostsBulkDelete($thread: ID!, $posts: [ID!]!) {
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

interface PostsBulkDeleteMutationData {
  postsBulkDelete: {
    errors: Array<MutationError> | null
    deleted: Array<string>
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

          const errors = getSelectionErrors<Post>(
            "posts",
            posts,
            data.postsBulkDelete.errors || []
          )

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
          if (!query?.thread?.posts.page?.items.length) return null

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
                      if (
                        errors[post.id] &&
                        errors[post.id].type !== POST_NOT_FOUND
                      ) {
                        return true
                      }

                      return data.postsBulkDelete.deleted.indexOf(post.id) < 0
                    }),
                  },
                },
              },
            },
          })
        },
      })
    },
  }
}

export default usePostsBulkDeleteMutation
