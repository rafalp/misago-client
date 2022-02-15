import React from "react"
import useSelection from "../../UI/useSelection"
import { Thread } from "./Threads.types"

const useThreadsSelection = (edges?: Array<{ node: Thread }>) => {
  const nodes = React.useMemo(() => edges?.map(({ node }) => node), [edges])
  return useSelection<Thread>(nodes)
}

export default useThreadsSelection
