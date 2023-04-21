import React from 'react'
import { Outlet } from 'react-router-dom'
import { Root } from './main.style'

export const Main = () => {
  return (
    <Root>
      <Outlet />
    </Root>
  )
}
