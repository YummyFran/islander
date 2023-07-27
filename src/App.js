import React from 'react'
import { Route, createHashRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'

import Game from './pages/Game'

import './styles/styles.css'

const App = () => {

  const router = createHashRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Game />} />
        </>
    )
  )

  return (
    <RouterProvider router={router} />
  )
}

export default App