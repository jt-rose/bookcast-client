import React from 'react'
import "../styles/NavBar.css"
const NavBar = () => {
  return (
    <>
    <div className="navbar">
      <img src="../images/bookcastlogo.png"/>
      <div className="navlinks">
        <a href="/">Home</a>
        <a href="/">Discover</a>
        <a href="/">Recent Lists</a>
        <a href="/">Profile</a>
      </div>
    </div>
    </>
  )
}
export default NavBar
