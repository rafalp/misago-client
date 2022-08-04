import React from "react"
import ThreadReplyError from "./ThreadReplyError"

interface ThreadReplyErrorBoundaryProps {
  children: React.ReactNode
}

class ThreadReplyErrorBoundary extends React.Component<ThreadReplyErrorBoundaryProps> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) return <ThreadReplyError />
    return this.props.children
  }
}

export default ThreadReplyErrorBoundary
