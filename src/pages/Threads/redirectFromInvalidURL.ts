import { PageInfo } from "./Threads.types"
import { CursorData } from "./useCursorParams"

interface Threads {
  edges: Array<any>
  pageInfo: PageInfo
}

interface Category {
  id: string
  slug: string
}

const redirectFromInvalidURL = (
  cursor: CursorData,
  threads: Threads | null,
  category?: Category | null,
  slug?: string
) => {
  if (!threads) return false

  // Redirect away from explicit first page
  if (cursor.before && threads.pageInfo.hasPreviousPage === false) return true

  // Redirect away from explicit empty page
  if ((cursor.after || cursor.before) && threads.edges.length === 0)
    return true

  // Redirect away from invalid slug
  if (category && slug && category.slug !== slug) return true

  return false
}

export default redirectFromInvalidURL
