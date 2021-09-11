import classnames from "classnames"
import React from "react"

interface CardBannerProps {
  align: string
  background: string
  className?: string | null
  height: number
  url: string
  mobile?: boolean
  desktop?: boolean
}

const CardBanner: React.FC<CardBannerProps> = ({
  align,
  background,
  className,
  height,
  url,
  mobile,
  desktop,
}) => (
  <div
    className={classnames(
      "card-banner",
      { "d-md-none": mobile, "d-none d-md-block": desktop },
      className
    )}
    style={{
      height,
      backgroundColor: background,
      backgroundImage: "url(" + url + ")",
      backgroundSize: "cover",
      backgroundPositionX: align,
      backgroundPositionY: "center",
    }}
  />
)

export default CardBanner
