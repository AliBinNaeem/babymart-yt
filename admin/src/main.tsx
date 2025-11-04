import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router' ///https://youtu.be/sE_F02e76dQ?t=842
import './index.css'
import App from './App.tsx'
import Login from './pages/Login.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
])

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}/> //https://youtu.be/sE_F02e76dQ?t=858
)
