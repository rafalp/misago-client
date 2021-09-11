import React from "react"

const useTransition = (open: boolean) => {
  const [display, setDisplay] = React.useState(open)
  const [fade, setFade] = React.useState(open)

  React.useEffect(() => {
    if (open) {
      setDisplay(true)
      const timeout = window.setTimeout(() => setFade(true), 100)
      return () => window.clearTimeout(timeout)
    }

    setFade(false)
    const timeout = window.setTimeout(() => setDisplay(false), 300)
    return () => window.clearTimeout(timeout)
  }, [open])

  return { display, fade }
}

export default useTransition
