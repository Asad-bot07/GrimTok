// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App'
import { UserContextProvider } from './Context/ContextApi'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import OutputPage from './OutputPage'
// import { OutputPage } from './Components/Output'

const router = createBrowserRouter(createRoutesFromElements(
  <Route>
      <Route path='' element={<App/>} />
      <Route path='/output' element={<OutputPage/>} />
  </Route>
))


createRoot(document.getElementById('root')!).render(
  <UserContextProvider>
    <RouterProvider router={router}/>
  </UserContextProvider>
)
