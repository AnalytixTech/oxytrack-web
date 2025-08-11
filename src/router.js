// src/router.js
import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import NotFound from "./routes/NotFound";
import Signup from "./routes/Signup";
import Signin from "./routes/Signin";
import Dashboard from "./routes/Dashboard";

// All routes

const rootRoute = createRootRoute(); // Removed the Layout component

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Signup,
});
const signinRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signin",
  component: Signin,
});
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: Dashboard,
});
const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "*",
  component: NotFound,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  signinRoute,
  dashboardRoute,
  notFoundRoute,
]);

export const router = createRouter({ routeTree });
