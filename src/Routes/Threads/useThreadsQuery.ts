import { gql, useLazyQuery, useQuery, useSubscription } from "@apollo/client"
import { DocumentNode } from "graphql"
import React from "react"
import { PageInfo, Thread } from "./Threads.types"

const THREADS_FRAGMENTS = `
  fragment ThreadsListThreadPoster on User {
    id
    name
    slug
    avatars {
      size
      url
    }
  }

  fragment ThreadsListThreadCategory on Category {
    id
    name
    slug
    color
    icon
  }
`

const THREADS_FIELDS = `
  edges {
    node {
      id
      title
      slug
      startedAt
      lastPostedAt
      replies
      starterName
      lastPosterName
      isClosed
      category {
        ...ThreadsListThreadCategory
        parent {
          ...ThreadsListThreadCategory
        }
      }
      starter {
        ...ThreadsListThreadPoster
      }
      lastPoster {
        ...ThreadsListThreadPoster
      }
    }
  }
  pageInfo {
    hasNextPage
    hasPreviousPage
    startCursor
    endCursor
  }
`

export const THREADS_QUERY = gql`
  ${THREADS_FRAGMENTS}

  query Threads($first: Int, $last: Int, $after: ID, $before: ID) {
    threads(
      first: $first,
      last: $last,
      after: $after,
      before: $before,
    ) {
      ${THREADS_FIELDS}
    }
  }
`

const THREADS_UPDATES_SUBSCRIPTION = gql`
  subscription ThreadsUpdates($category: ID) {
    threads(category: $category)
  }
`

export interface ThreadsData {
  threads: {
    edges: Array<{ node: Thread }>
    pageInfo: PageInfo
    __typename: string
  }
}

interface ThreadsVariables {
  category?: string | null
  after?: string | null
  before?: string | null
}

interface ThreadsUpdatesData {
  threads: string
}

interface ThreadsUpdatesVariables {
  category?: string | null
}

export const useBaseThreadsQuery = <TData extends ThreadsData>(
  query: DocumentNode,
  variables: ThreadsVariables
) => {
  const result = useQuery<TData, ThreadsVariables>(query, {
    variables,
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  })

  const [updatedThreads, setUpdatedThreadsState] = React.useState<{
    ids: Array<string>
    length: number
  }>({ ids: [], length: 0 })

  useSubscription<ThreadsUpdatesData, ThreadsUpdatesVariables>(
    THREADS_UPDATES_SUBSCRIPTION,
    {
      skip: variables.after !== null || variables.before !== null,
      shouldResubscribe: !!result.data?.threads,
      variables: variables ? { category: variables.category } : undefined,
      onSubscriptionData: ({ subscriptionData: { data } }) => {
        if (!data) return
        const { threads: id } = data
        if (updatedThreads.ids.indexOf(id) !== -1) return

        setUpdatedThreadsState((state) => {
          return {
            ids: [...state.ids, id],
            length: state.length + 1,
          }
        })
      },
    }
  )

  const [fetchUpdatedThreads, updateResult] = useLazyQuery<
    TData,
    ThreadsVariables
  >(query, {
    fetchPolicy: "no-cache",
    notifyOnNetworkStatusChange: true,
    variables: variables ? { category: variables.category } : undefined,
    onCompleted: (data) => {
      setUpdatedThreadsState({
        ids: [],
        length: 0,
      })

      result.updateQuery((previousResult) => {
        return mergeUpdatedThreadsResults(previousResult, data)
      })
    },
  })

  return {
    ...result,
    fetchUpdatedThreads,
    updatedThreads: updatedThreads.length,
    updatingThreads: updateResult.loading,
    update: {
      threads: updatedThreads.length,
      loading: updateResult.loading,
      fetch: fetchUpdatedThreads,
    },
  }
}

const mergeUpdatedThreadsResults = <TData extends ThreadsData>(
  previousResult: TData,
  updatedResult: TData
) => {
  const updatedIds = updatedResult.threads.edges.map(({ node: { id } }) => id)
  const edges = [
    ...updatedResult.threads.edges,
    ...previousResult.threads.edges.filter(
      ({ node: { id } }) => updatedIds.indexOf(id) === -1
    ),
  ]

  return {
    ...updatedResult,
    threads: {
      edges,
      pageInfo: previousResult.threads.pageInfo,
      __typename: previousResult.threads.__typename,
    },
  }
}

interface ThreadsQueryParams {
  after: string | null
  before: string | null
  first: number | null
  last: number | null
}

export const useThreadsQuery = (variables: ThreadsQueryParams) => {
  return useBaseThreadsQuery<ThreadsData>(THREADS_QUERY, variables)
}

interface CategoryQueryParams extends ThreadsQueryParams {
  id: string
}

export const CATEGORY_THREADS_QUERY = gql`
  ${THREADS_FRAGMENTS}

  fragment ThreadsListCategory on Category {
    id
    name
    slug
  }

  query CategoryThreads(
    $category: ID!, $first: Int, $last: Int, $after: ID, $before: ID
  ) {
    category(id: $category) {
      ...ThreadsListCategory
      threads
      posts
      parent {
        ...ThreadsListCategory
      }
    }
    threads(
      category: $category,
      first: $first,
      last: $last,
      after: $after,
      before: $before,
    ) {
      ${THREADS_FIELDS}
    }
  }
`

interface CategoryThreadsData extends ThreadsData {
  category: {
    id: string
    name: string
    slug: string
    threads: number
    posts: number
    parent: {
      id: string
      name: string
      slug: string
    } | null
  }
}

export const useCategoryThreadsQuery = (variables: CategoryQueryParams) => {
  return useBaseThreadsQuery<CategoryThreadsData>(CATEGORY_THREADS_QUERY, {
    category: variables.id,
    after: variables.after,
    before: variables.before,
  })
}
