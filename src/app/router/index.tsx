import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";

const IntroPage = lazy(() => import("@pages/intro"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <IntroPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/main",
        element: <MainPage />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/post-list",
        element: <PostListPage />,
      },
      {
        path: "/post-edit",
        element: <PostEditPage />,
      },
      {
        path: "/post-edit/:postId",
        element: <PostEditPage />,
      },
      {
        path: "/post/:postId",
        element: <PostDetailPage />,
      },
      {
        path: "/movie/:movieId",
        element: <MovieDetailPage />,
      },
      {
        path: "/user",
        element: <UserPage />,
      },
      {
        path: "/awards",
        element: <AwardsPage />,
      },
      {
        path: "/awards/history",
        element: <AwardsHistoryPage />,
      },
      {
        path: "/login/oauth/kakao",
        element: <AuthCodePage />,
      },
      {
        path: "/admin/add",
        element: <AwardsAdminPage />,
      },
    ],
  },
]);
