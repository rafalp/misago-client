import React from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import { RouteNotFound } from "../../UI/RouteError"
import * as urls from "../../urls"
import ThreadRedirectToLastPost from "./ThreadRedirectToLastPost"
import ThreadRedirectToPost from "./ThreadRedirectToPost"
import ThreadPosts from "./ThreadPosts"

const Thread: React.FC = () => (
  <Switch>
    <Route
      path={urls.thread({ id: ":id", slug: ":slug" })}
      component={ThreadPosts}
      exact
    />
    <Route
      path={urls.threadLastPost({ id: ":id", slug: ":slug" })}
      component={ThreadRedirectToLastPost}
      exact
    />
    <Route
      path={urls.threadPost({ id: ":id", slug: ":slug" }, { id: ":postId" })}
      component={ThreadRedirectToPost}
      exact
    />
    <Route
      path={
        (urls.thread({ id: ":id", slug: ":slug" }) + "1/") as "/t/:id/:slug/1/"
      }
      render={({ match }) => (
        <Redirect
          to={urls.thread({
            id: match.params.id,
            slug: match.params.slug,
          })}
        />
      )}
      exact
    />
    <Route
      path={urls.thread({ id: ":id", slug: ":slug" }) + ":page/"}
      component={ThreadPosts}
      exact
    />
    <Route component={RouteNotFound} />
  </Switch>
)

export default Thread
