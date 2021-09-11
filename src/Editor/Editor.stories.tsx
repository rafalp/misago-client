import { MockedProvider } from "@apollo/react-testing"
import { action } from "@storybook/addon-actions"
import { ApolloError } from "apollo-client"
import React from "react"
import * as Yup from "yup"
import { Card, CardFooter, CardFormBody, CardHeader } from "../UI/Card"
import { Field, FieldError, Form, FormFooter } from "../UI/Form"
import { RootContainer } from "../UI/Storybook"
import { ValidationError } from "../UI/ValidationError"
import Editor from "./Editor"
import EditorBody from "./EditorBody"
import EditorMentions from "./EditorMentions"
import EditorPreview from "./EditorPreview"
import EditorPreviewError from "./EditorPreviewError"
import EditorPreviewLoader from "./EditorPreviewLoader"
import EditorTextarea from "./EditorTextarea"
import EditorToolbar from "./EditorToolbar"
import { RICH_TEXT_PREVIEW_QUERY } from "./useRichTextPreviewQuery"

export default {
  title: "Editor",
}

interface ContainerProps {
  value?: string
}

interface EditorFormValues {
  markup: string
}

const submit = action("submitted")

const Container: React.FC<ContainerProps> = ({ children, value }) => {
  const validators = Yup.object().shape({
    markup: Yup.string()
      .required("value_error.missing")
      .min(10, "value_error.any_str.min_length")
      .max(2000, "value_error.any_str.max_length"),
  })

  return (
    <RootContainer>
      <Card>
        <CardHeader title="Editor example" />
        <Form<EditorFormValues>
          defaultValues={{
            markup: value || "",
          }}
          validators={validators}
          onSubmit={({ clearErrors, data }) => {
            clearErrors()
            submit(data.markup)
          }}
        >
          <CardFormBody>
            <Field
              label="Editor field"
              name="markup"
              input={children}
              error={(error, value) => (
                <ValidationError
                  error={error}
                  value={value.trim().length}
                  min={2}
                  max={200}
                >
                  {({ message }) => <FieldError>{message}</FieldError>}
                </ValidationError>
              )}
              labelReaderOnly
            />
          </CardFormBody>
          <CardFooter>
            <FormFooter submitText="Submit" />
          </CardFooter>
        </Form>
      </Card>
    </RootContainer>
  )
}

export const Empty = () => (
  <MockedProvider mocks={[]}>
    <Container>
      <Editor />
    </Container>
  </MockedProvider>
)

export const WithValue = () => (
  <MockedProvider mocks={[]}>
    <Container value="Hello world!">
      <Editor />
    </Container>
  </MockedProvider>
)

export const Disabled = () => (
  <MockedProvider mocks={[]}>
    <Container>
      <Editor disabled={true} />
    </Container>
  </MockedProvider>
)

export const Preview = () => (
  <MockedProvider
    mocks={[
      {
        request: {
          query: RICH_TEXT_PREVIEW_QUERY,
          variables: {
            markup: "Test",
          },
        },
        result: {
          data: {
            richText: [
              {
                id: "aaaa",
                type: "p",
                text: "Hello world!",
              },
              {
                id: "bbbb",
                type: "p",
                text: "I'm a preview!",
              },
            ],
          },
        },
      },
    ]}
  >
    <Container>
      <EditorBody>
        <EditorPreview markup="Test" />
        <EditorToolbar>Toolbar placeholder</EditorToolbar>
      </EditorBody>
    </Container>
  </MockedProvider>
)

export const Mentions = () => (
  <MockedProvider>
    <Container>
      <p>
        Try mentioning <strong>@test</strong>, <strong>@bob</strong> or{" "}
        <strong>@Danger</strong>
      </p>

      <EditorBody>
        <EditorMentions
          mocks={[
            {
              name: "Test",
              fullName: null,
              avatar: {
                size: 32,
                url: "https://placekitten.com/32/32",
              },
            },
            {
              name: "Bob",
              fullName: "Bob Bobertson",
              avatar: {
                size: 32,
                url: "https://placekitten.com/32/32",
              },
            },
            {
              name: "Danger",
              fullName: "Dangerous <u>Dave</u>",
              avatar: {
                size: 32,
                url: "https://placekitten.com/32/32",
              },
            },
          ]}
        >
          <EditorTextarea name="markup" />
        </EditorMentions>
      </EditorBody>
    </Container>
  </MockedProvider>
)

export const PreviewLoader = () => (
  <MockedProvider mocks={[]}>
    <Container>
      <EditorBody>
        <EditorPreviewLoader />
        <EditorToolbar>Toolbar placeholder</EditorToolbar>
      </EditorBody>
    </Container>
  </MockedProvider>
)

export const PreviewQueryError = () => (
  <MockedProvider mocks={[]}>
    <Container>
      <EditorBody>
        <EditorPreviewError error={new ApolloError({})} />
        <EditorToolbar>Toolbar placeholder</EditorToolbar>
      </EditorBody>
    </Container>
  </MockedProvider>
)

export const PreviewNetworkError = () => (
  <MockedProvider mocks={[]}>
    <Container>
      <EditorBody>
        <EditorPreviewError
          error={new ApolloError({ networkError: new Error() })}
        />
        <EditorToolbar>Toolbar placeholder</EditorToolbar>
      </EditorBody>
    </Container>
  </MockedProvider>
)
