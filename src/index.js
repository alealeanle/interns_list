import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import store from './store';
import HomePage from '@pages/HomePage';
import ErrorPage from '@pages/ErrorPage';
import InternDetailPage from './components/pages/InternDetailPage';
import './index.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'interns/:id',
    element: <InternDetailPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    ,
  </React.StrictMode>,
);
