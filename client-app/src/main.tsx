
import ReactDOM from 'react-dom/client'
import 'semantic-ui-css/semantic.min.css'
import './app/layout/styles.css'
import 'react-calendar/dist/Calendar.css'
import { StoreContext, store } from './app/stores/store'
import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/router/route'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
      <RouterProvider router={router} />
    </StoreContext.Provider>
  </React.StrictMode>
    
)
