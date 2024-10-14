import { ConfigProvider, theme } from "antd";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { AddBook } from "./pages/add-book";
import { Auth } from "./features/auth/auth";
import { Book } from "./pages/book";
import { Books } from "./pages/books";
import { EditBook } from "./pages/edit-book";
import { Login } from "./pages/login";
import { Paths } from "./paths";
import { Signup } from "./pages/signup";
import "./index.css";
import { Status } from "./pages/status";
import { store } from "./app/store";

const router = createBrowserRouter([
  {
    path: Paths.home,
    element: <Books />,
  },
  {
    path: Paths.login,
    element: <Login />,
  },
  {
    path: Paths.signup,
    element: <Signup />,
  },
  {
    path: Paths.bookAdd,
    element: <AddBook />,
  },
  {
    path: `${Paths.status}/:status`,
    element: <Status />,
  },
  {
    path: `${Paths.book}/:id`,
    element: <Book />,
  },
  {
    path: `${Paths.bookEdit}/:id`,
    element: <EditBook />,
  },
]);

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
        }}
      >
        <Auth>
          <RouterProvider router={router} />
        </Auth>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
