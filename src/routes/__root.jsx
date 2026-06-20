import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

const RootLayout = () => {
  return (
    <>
      <nav className="app-nav">
        <Link
          to="/stopwatch"
          className="nav-tab"
          activeProps={{ className: "nav-tab nav-tab--active" }}
        >
          Stopwatch
        </Link>
        <Link
          to="/timer"
          className="nav-tab"
          activeProps={{ className: "nav-tab nav-tab--active" }}
        >
          Timer
        </Link>
      </nav>
      <Outlet />
    </>
  );
};

export const Route = createRootRoute({ component: RootLayout });
