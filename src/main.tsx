import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { TrainerProvider } from './TrainerContext.tsx'
import routes from './router/routes.tsx'
import { createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'

const router = createBrowserRouter(routes)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <TrainerProvider>
        <RouterProvider router={router} />
      </TrainerProvider>
    </Provider>
  </StrictMode>
)
