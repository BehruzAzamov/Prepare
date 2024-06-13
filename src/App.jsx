import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { isAuthReady, login } from "./features/userSlice";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import MainLayout from "./layout/MainLayout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ProtectedRoutes from "./components/ProtectedRoutes";
import CreateRecipe from "./pages/CreateRecipe";
import SingleRecipe from "./pages/SingleRecipe";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.currentUser);

  const routes = createBrowserRouter([
    {
      path: '/',
      element: <ProtectedRoutes user={user}><MainLayout /></ProtectedRoutes>,
      children: [
        { index: true, element: <Home /> },
        { path: '/create', element: <CreateRecipe /> },
        { path: '/recipe/:id', element: <SingleRecipe /> } 
      ]
    },
    {
      path: '/login',
      element: user ? <Navigate to="/" /> : <Login />,
      action: loginAction
    },
    {
      path: '/register',
      element: user ? <Navigate to="/" /> : <Register />,
      action: registerAction
    }
  ]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(login(user));
        dispatch(isAuthReady());
      } else {
        dispatch(isAuthReady());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return <>{isAuthReady && <RouterProvider router={routes} />}  </>;
}

export default App;