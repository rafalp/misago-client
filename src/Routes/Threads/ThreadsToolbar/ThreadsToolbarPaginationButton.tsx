import React from "react"
import { Link } from "react-router-dom"
import { ButtonSecondary } from "../../../UI/Button"
import Icon from "../../../UI/Icon"

interface ThreadsToolbarPaginationButtonProps {
  title: string
  icon: string
  url: string | null
}

const ThreadsToolbarPaginationButton: React.FC<ThreadsToolbarPaginationButtonProps> = ({
  title,
  icon,
  url,
}) =>
  url ? (
    <Link
      className={"btn btn-secondary btn-responsive"}
      title={title}
      to={url}
    >
      <Icon icon={icon} fixedWidth />
    </Link>
  ) : (
    <ButtonSecondary icon={icon} responsive disabled />
  )

export default ThreadsToolbarPaginationButton
