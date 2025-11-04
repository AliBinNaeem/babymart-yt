import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router' ///https://youtu.be/sE_F02e76dQ?t=842
import './index.css'
import App from './App.tsx'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <App />,
  // },
  // login
  {
    path: "/login",
    element: <Login />,
  },
  // register
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      
    ]
  }



])

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}/> //https://youtu.be/sE_F02e76dQ?t=858
)
