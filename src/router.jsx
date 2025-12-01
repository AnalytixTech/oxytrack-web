// src/router.js
import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import NotFound from "./routes/NotFound";
import Signup from "./routes/Signup";
import Signin from "./routes/Signin";
import Home from "./routes/Home";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Cylinders from "./routes/Cylinders";
import Facilities from "./routes/Facilities";
import Scan from "./routes/Scan";
import Inventory from "./routes/Inventory";

// Protected Home component
const ProtectedHome = () => (
  <ProtectedRoute>
    <Home />
  </ProtectedRoute>
);
// All routes

const rootRoute = createRootRoute(); // Removed the Layout component

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Signin,
});
const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signup",
  component: Signup,
});
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/home",
  component: ProtectedHome,
});
const cylindersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cylinders",
  component: Cylinders,
});
const facilitiesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/facilities",
  component: Facilities,
});

const inventoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/inventory",
  component: Inventory,
});
const scanRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/scan",
  component: Scan,
});
const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "*",
  component: NotFound,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  signupRoute,
  homeRoute,
  cylindersRoute,
  facilitiesRoute,
  inventoryRoute,
  scanRoute,
  notFoundRoute,
]);

export const router = createRouter({ routeTree });
