import { ApolloProvider } from "@apollo/client"
import ReactDOM from "react-dom"
import App from "./App"
import { client } from "./apolloClient"
import setupPlugins from "./plugins"
import * as serviceWorker from "./serviceWorker"
import "./styles/index.scss"

setupPlugins()

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
