import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../compoents/Home"
import About from "../compoents/About"

// export const PAGES = [
//   {path: '/', component: Home},
//   {path: '/about', component: About},
// ]

const AppRoutes = () => (
  <Routes>
    <Route path={'/'} element={<Home/>} />
    <Route path={'/about'} element={<About/>} />
  </Routes>
)

export default AppRoutes;