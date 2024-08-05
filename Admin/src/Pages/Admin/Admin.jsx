import React from 'react'
import Sildebar from '../../components/Sildebar'
import AddProduct from '../../components/AddProduct'

import {Routes,Route} from "react-router-dom"
import Listproduct from '../../components/Listproduct'
import User from '../../components/User'
import Order from "../../components/Order"
import Subscribers from '../../components/Subscribers'

const Admin = () => {
  return (
    <>

    <div className='lg:flex gap-10'>
      <Sildebar/>
    <Routes>
               <Route path='/' element={  <AddProduct/>}></Route>
               <Route path='/listproduct' element={  <Listproduct/>}></Route>
               <Route path='/orders' element={  <Order/>}></Route>
               <Route path='/users' element={  <User/>}></Route>
               <Route path='/subscribers' element={  <Subscribers/>}></Route>
               </Routes>
    
    </div>
    
      </>
  )
}

export default Admin
