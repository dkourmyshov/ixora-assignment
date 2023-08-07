import {
  createBrowserRouter,
  createRoutesFromElements,
  defer,
  RouterProvider
} from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom/client'

import Autos from './components/Autos'
import Models from './components/Models'
import Modifs from './components/Modifs'
import Params from './components/Params'

import './main.css'

const API_PREFIX = 'https://ixora-auto.ru/wipers'

const loader = fragment => defer({
  promise: fetch(API_PREFIX + fragment).then(res => res.json())
})

const router = createBrowserRouter([
  {
    path: '/',
    loader: () => loader('/auto'),
    id: 'autos',
    children: [
      { path: '', exact: true, element: <Autos /> },
      {
        path: 'auto/:autoId',
        loader: ({ params }) => loader(`/model/${params.autoId}`),
        id: 'models',
        children: [
          { path: '', exact: true, element: <Models /> },
          {
            path: 'model/:modelId',
            loader: ({ params }) => loader(`/modif/${params.modelId}`),
            id: 'modifs',
            children: [
              { path: '', exact: true, element: <Modifs />},
              {
                path: 'modif/:modifId',
                loader: ({ params }) => loader(`/param/${params.modifId}`),
                id: 'params',
                element: <Params />
              }
            ]
          }
        ]
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
