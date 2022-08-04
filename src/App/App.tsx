import React from "react"
import { BrowserRouter } from "react-router-dom"
import { BodyScroll } from "../BodyScroll"
import {
  AuthContext,
  AuthModalProvider,
  BodyScrollLockProvider,
  CategoriesContext,
  ForumStatsContext,
  ModalConsumer,
  ModalProvider,
  SettingsContext,
  ToastsProvider,
} from "../Context"
import RouteLoader from "../UI/RouteLoader"
import RouteErrorBoundary from "../UI/RouteErrorBoundary"
import Router from "../routes"
import AppDataQuery from "./AppDataQuery"
import AppErrorBoundary from "./AppErrorBoundary"
import AppLanguageLoader from "./AppLanguageLoader"

const Navbar = React.lazy(() => import("../Navbar"))
const SiteWizard = React.lazy(() => import("../SiteWizard"))
const Toasts = React.lazy(() => import("../Toasts"))
const AuthChangedAlert = React.lazy(() => import("../AuthChangedAlert"))
const AuthModal = React.lazy(() => import("../AuthModal"))

const App: React.FC = () => {
  return (
    <AppErrorBoundary>
      <BrowserRouter>
        <BodyScrollLockProvider>
          <BodyScroll />
          <AppDataQuery>
            {({ data: { auth, categories, forumStats, settings } }) => (
              <AppLanguageLoader language="en">
                <AuthContext.Provider value={auth}>
                  <CategoriesContext.Provider value={categories}>
                    <SettingsContext.Provider value={settings}>
                      <ToastsProvider>
                        <ForumStatsContext.Provider value={forumStats}>
                          <AuthModalProvider>
                            <ModalProvider>
                              {settings && settings.enableSiteWizard ? (
                                <React.Suspense fallback={<RouteLoader />}>
                                  <SiteWizard />
                                </React.Suspense>
                              ) : (
                                <>
                                  <React.Suspense fallback={<div />}>
                                    <AuthChangedAlert user={auth} />
                                  </React.Suspense>
                                  <React.Suspense fallback={<div />}>
                                    <Navbar settings={settings} user={auth} />
                                    <Toasts />
                                  </React.Suspense>
                                  <RouteErrorBoundary>
                                    <Router />
                                  </RouteErrorBoundary>
                                  <React.Suspense fallback={<div />}>
                                    <AuthModal settings={settings} />
                                  </React.Suspense>
                                </>
                              )}
                              <ModalConsumer />
                            </ModalProvider>
                          </AuthModalProvider>
                        </ForumStatsContext.Provider>
                      </ToastsProvider>
                    </SettingsContext.Provider>
                  </CategoriesContext.Provider>
                </AuthContext.Provider>
              </AppLanguageLoader>
            )}
          </AppDataQuery>
        </BodyScrollLockProvider>
      </BrowserRouter>
    </AppErrorBoundary>
  )
}

export default App
