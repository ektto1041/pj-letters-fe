import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import LoadingPage from "@/pages/loading";
import { NotFoundPage } from "@/pages/not-found";
import IntroPage from "@/pages/intro";
import TreePage from "@/pages/tree";
import FriendList from "@/pages/friend-list";
import NewCardPage from "@/pages/new-card";
import CardPage from "@/pages/card";

// const IntroPage = lazy(() => import("@pages/intro"));
// const TreePage = lazy(() => import("@pages/tree"));
// const FriendListPage = lazy(() => import("@pages/friend-list"));
// const NewCardPage = lazy(() => import("@pages/new-card"));
// const CardPage = lazy(() => import("@pages/card"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <IntroPage />,
      },
      {
        path: "/tree/:userId",
        element: <TreePage />,
      },
      {
        path: "/friend-list",
        element: <FriendList />,
      },
      {
        path: "/new-card/:userId/:treeId",
        element: <NewCardPage />,
      },
      {
        path: "/card/:letterId",
        element: <CardPage />,
      },
    ],
  },
]);

export const RouteProvider = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};
