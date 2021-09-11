import { withKnobs, boolean } from "@storybook/addon-knobs"
import React from "react"
import { CardContainer, Matrix, RootContainer } from "../Storybook"
import {
  Button,
  ButtonDanger,
  ButtonInverse,
  ButtonLink,
  ButtonPrimary,
  ButtonSecondary,
  ButtonSuccess,
  ButtonWarning,
  ButtonOutlineDanger,
  ButtonOutlinePrimary,
  ButtonOutlineSecondary,
  ButtonOutlineSuccess,
  ButtonOutlineWarning,
} from "."
import { ButtonProps } from "./Button.types"

export default {
  title: "UI/Button",
  decorators: [withKnobs],
}

const blockKnob = () => boolean("Block", false)
const smallKnob = () => boolean("Small", false)

const buttons: Array<[string, React.FC<ButtonProps>]> = [
  ["Default", Button],
  ["Link", ButtonLink],
  ["Primary", ButtonPrimary],
  ["Secondary", ButtonSecondary],
  ["Success", ButtonSuccess],
  ["Warning", ButtonWarning],
  ["Danger", ButtonDanger],
  ["Inverse", ButtonInverse],
]

const outlineButtons: Array<[string, React.FC<ButtonProps>]> = [
  ["Outline Primary", ButtonOutlinePrimary],
  ["Outline Secondary", ButtonOutlineSecondary],
  ["Outline Success", ButtonOutlineSuccess],
  ["Outline Warning", ButtonOutlineWarning],
  ["Outline Danger", ButtonOutlineDanger],
]

export const TextOnly = () => {
  const block = blockKnob()
  const small = smallKnob()

  const items = buttons.map(([name, Component]) => [
    {
      name,
      component: <Component block={block} text="Lorem ipsum" small={small} />,
    },
    {
      name: name + " loading",
      component: (
        <Component block={block} text="Lorem ipsum" small={small} loading />
      ),
    },
    {
      name: name + " disabled",
      component: (
        <Component block={block} text="Lorem ipsum" small={small} disabled />
      ),
    },
  ])

  return (
    <>
      <RootContainer nopadding>
        <Matrix items={items} />
      </RootContainer>
      <CardContainer nopadding>
        <Matrix items={items} />
      </CardContainer>
    </>
  )
}

export const OutlineTextOnly = () => {
  const block = blockKnob()
  const small = smallKnob()

  const items = outlineButtons.map(([name, Component]) => [
    {
      name,
      component: <Component block={block} text="Lorem ipsum" small={small} />,
    },
    {
      name: name + " loading",
      component: (
        <Component block={block} text="Lorem ipsum" small={small} loading />
      ),
    },
    {
      name: name + " disabled",
      component: (
        <Component block={block} text="Lorem ipsum" small={small} disabled />
      ),
    },
  ])

  return (
    <>
      <RootContainer nopadding>
        <Matrix items={items} />
      </RootContainer>
      <CardContainer nopadding>
        <Matrix items={items} />
      </CardContainer>
    </>
  )
}

export const IconOnly = () => {
  const block = blockKnob()
  const small = smallKnob()

  const items = buttons.map(([name, Component]) => [
    {
      name,
      component: (
        <Component block={block} icon="far fa-comment-alt" small={small} />
      ),
    },
    {
      name: name + " loading",
      component: (
        <Component
          block={block}
          icon="far fa-comment-alt"
          small={small}
          loading
        />
      ),
    },
    {
      name: name + " disabled",
      component: (
        <Component
          block={block}
          icon="far fa-comment-alt"
          small={small}
          disabled
        />
      ),
    },
  ])

  return (
    <>
      <RootContainer nopadding>
        <Matrix items={items} />
      </RootContainer>
      <CardContainer nopadding>
        <Matrix items={items} />
      </CardContainer>
    </>
  )
}

export const OutlineIconOnly = () => {
  const block = blockKnob()
  const small = smallKnob()

  const items = outlineButtons.map(([name, Component]) => [
    {
      name,
      component: (
        <Component block={block} icon="far fa-comment-alt" small={small} />
      ),
    },
    {
      name: name + " loading",
      component: (
        <Component
          block={block}
          icon="far fa-comment-alt"
          small={small}
          loading
        />
      ),
    },
    {
      name: name + " disabled",
      component: (
        <Component
          block={block}
          icon="far fa-comment-alt"
          small={small}
          disabled
        />
      ),
    },
  ])

  return (
    <>
      <RootContainer nopadding>
        <Matrix items={items} />
      </RootContainer>
      <CardContainer nopadding>
        <Matrix items={items} />
      </CardContainer>
    </>
  )
}

export const IconAndText = () => {
  const block = blockKnob()
  const small = smallKnob()

  const items = buttons.map(([name, Component]) => [
    {
      name,
      component: (
        <Component
          block={block}
          icon="far fa-comment-alt"
          text="Start thread"
          small={small}
        />
      ),
    },
    {
      name: name + " loading",
      component: (
        <Component
          block={block}
          icon="far fa-comment-alt"
          text="Start thread"
          small={small}
          loading
        />
      ),
    },
    {
      name: name + " disabled",
      component: (
        <Component
          block={block}
          icon="far fa-comment-alt"
          text="Start thread"
          small={small}
          disabled
        />
      ),
    },
  ])

  return (
    <>
      <RootContainer nopadding>
        <Matrix items={items} />
      </RootContainer>
      <CardContainer nopadding>
        <Matrix items={items} />
      </CardContainer>
    </>
  )
}

export const OutlineIconAndText = () => {
  const block = blockKnob()
  const small = smallKnob()

  const items = outlineButtons.map(([name, Component]) => [
    {
      name,
      component: (
        <Component
          block={block}
          icon="far fa-comment-alt"
          text="Start thread"
          small={small}
        />
      ),
    },
    {
      name: name + " loading",
      component: (
        <Component
          block={block}
          icon="far fa-comment-alt"
          text="Start thread"
          small={small}
          loading
        />
      ),
    },
    {
      name: name + " disabled",
      component: (
        <Component
          block={block}
          icon="far fa-comment-alt"
          text="Start thread"
          small={small}
          disabled
        />
      ),
    },
  ])

  return (
    <>
      <RootContainer nopadding>
        <Matrix items={items} />
      </RootContainer>
      <CardContainer nopadding>
        <Matrix items={items} />
      </CardContainer>
    </>
  )
}
