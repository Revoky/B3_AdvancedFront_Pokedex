import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { TrainerProvider } from './TrainerContext.tsx'
import routes from './router/routes.tsx'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter(routes)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TrainerProvider>
      <RouterProvider router={router} />
    </TrainerProvider>
  </StrictMode>
)
