import React from 'react'
import AppRoutes from '../shared/Routes'
import { Link } from 'react-router-dom'

export default function App() {
  return <>
    <nav>
      <Link to='/'>主页</Link>
      <Link to='/About'>详情页</Link>
    </nav>
    <AppRoutes/>
  </>
}