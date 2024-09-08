import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AppQuery from "./AppQuery.tsx"
import "./index.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppQuery />,
  },
])

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
