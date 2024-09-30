import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { store } from './app/store';
import reportWebVitals from './reportWebVitals';
import { Paths } from './paths';
import { Login } from './pages/login';
import { Signup } from './pages/signup';
import './index.css';

const router = createBrowserRouter([
  {
    path: Paths.home,
    element: <h1>Book Tracker</h1>
  },
  {
    path: Paths.login,
    element: <Login />
  },
  {
    path: Paths.signup,
    element: <Signup />
  }
])

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={ router } />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();