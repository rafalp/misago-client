import { AvatarData, CategoryBanner, RichText } from "../../types"

export interface Thread {
  id: string
  slug: string
  title: string
  startedAt: string
  lastPostedAt: string
  replies: number
  starterName: string
  lastPosterName: string
  isClosed: boolean
  starter: ThreadPoster | null
  lastPoster: ThreadPoster | null
  category: ThreadCategory
}

export interface ThreadCategory {
  id: string
  name: string
  slug: string
  parent: ThreadCategory | null
  color: string | null
  icon: string | null
  isClosed: boolean
  banner: { full: CategoryBanner; half: CategoryBanner } | null
}

export interface ThreadPoster {
  id: string
  name: string
  slug: string
  avatars: Array<AvatarData>
}

export interface ThreadModerationOptions {
  actions: Array<ModerationAction>
  loading: boolean
}

export interface ModerationAction {
  name: React.ReactNode
  icon: string
  disabled?: boolean
  action: () => Promise<void> | void
}

export interface Post {
  id: string
  poster: Poster | null
  posterName: string
  richText: RichText
  edits: number
  postedAt: string
}

export interface Poster {
  id: string
  name: string
  slug: string
  avatars: Array<AvatarData>
}

export interface Posts {
  results: Array<Post>
  totalPages: number
  pageInfo: {
    number: number
  }
}
