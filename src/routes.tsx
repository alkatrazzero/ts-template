import * as Pages from'./pages'
import * as Layouts from './layouts'
import { RouteObject } from 'react-router-dom'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layouts.Main />,
    children: [
      {
        path: '',
        element: <Pages.Home />,
      },
    ],
  },
]