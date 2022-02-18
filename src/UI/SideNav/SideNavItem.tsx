import classnames from "classnames"
import React from "react"
import { Link } from "react-router-dom"
import Icon from "../Icon"

interface SideNavCSSProperties extends React.CSSProperties {
  "--color-theme"?: string | null
}

interface SideNavItemProps {
  className?: string | null
  children: React.ReactNode
  hasChildren?: boolean
  icon?: React.ReactNode
  isActive?: boolean
  isChild?: boolean
  to: string
  style?: SideNavCSSProperties
}

const SideNavItem: React.FC<SideNavItemProps> = ({
  className,
  children,
  hasChildren,
  icon,
  isActive,
  isChild,
  style,
  to,
}) => (
  <li className="nav-item" style={style}>
    <Link
      aria-selected={isActive ? "true" : "false"}
      className={classnames(
        "nav-link",
        {
          "nav-link-child": isChild,
          active: isActive,
        },
        className
      )}
      to={to}
    >
      {icon && <span className="nav-link-icon">{icon}</span>}
      <span className="nav-link-text">{children}</span>
      {hasChildren && <ChildrenIcon />}
    </Link>
  </li>
)

const ChildrenIcon: React.FC = () => (
  <span className="has-children-icon">
    <Icon icon="far fa-plus-square" />
  </span>
)

export default SideNavItem
