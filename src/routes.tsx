import React, { Suspense, Fragment, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import AuthGuard from "./contexts/AuthGuard";

export const RenderRoutes = ({ routes }: any) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      {routes.map((route: any, i: any) => {
        const Guard = route.guard || Fragment;
        const MainLayout = route.layout || Fragment;
        const Component = route.component;
        return (
          <Route
            key={i}
            path={route.path}
            element={
              <Guard>
                <MainLayout>
                  <Component />
                </MainLayout>
              </Guard>
            }
          />
        );
      })}
    </Routes>
  </Suspense>
);

export const routes = [
  {
    path: "/",
    // guard: GuestGuard,
    component: lazy(() => import("./pages/Auth/Login")),
  },
  {
    path: "/login",
    // guard: GuestGuard,
    component: lazy(() => import("./pages/Auth/Login")),
  },
  {
    path: "/register",
    // guard: GuestGuard,
    component: lazy(() => import("./pages/Auth/Register")),
  },
  {
    path: "/ForgotPassword",
    // guard: GuestGuard,
    component: lazy(() => import("./pages/Auth/ForgotPassword")),
  },
  {
    path: "/PhoneCodeValidation",
    // guard: GuestGuard,
    component: lazy(() => import("./pages/Auth/PhoneCodeValidation")),
  },
  {
    path: "/ResetPassword",
    // guard: GuestGuard,
    component: lazy(() => import("./pages/Auth/ResetPassword")),
  },
  {
    path: "/Dashboard",
    guard: AuthGuard,
    component: lazy(() => import("./pages/Dashboard")),
  },
];

export default routes;
