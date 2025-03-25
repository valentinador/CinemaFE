import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import FilmsList from "./pages/FilmsList/FilmsList";
import Login from "./pages/Login/Login";
import AddFilmForm from "./components/AddFilmForm/AddFilmForm";
import { Provider } from "react-redux"; // Importa il Provider da react-redux
import { store } from "./store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Navigate to="/films" replace />,
      },
      {
        path: "/films",
        element: <FilmsList/>,
      },
      {
        path: "/login",
        element: <Login/>,
      },
      {
        path: "/addfilm",
        element: <AddFilmForm/>,
      }
    ],

  },
]);
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
      <Provider store={store}> 

    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
