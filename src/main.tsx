// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App'
import { UserContextProvider } from './Context/ContextApi'

createRoot(document.getElementById('root')!).render(
  <UserContextProvider>
      <App/>
  </UserContextProvider>,
)
