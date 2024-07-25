import React from 'react'
import logo from "../assets/logo.png"

const Navbar = () => {
  return (
    <div className='lg:h-24 flex item-center h-20  flex-col' style={{backgroundColor:'#a00220'}}>
      <img src={logo} className='lg:w-72  mx-auto  w-52 ' ></img>
      <p className='text-white mx-auto '>Admin Panel</p>
    </div>
  )
}

export default Navbar
