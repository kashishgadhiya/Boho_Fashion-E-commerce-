import React from 'react'
import Sildebar from '../../components/Sildebar'
import AddProduct from '../../components/AddProduct'

import {Routes,Route} from "react-router-dom"
import Listproduct from '../../components/Listproduct'

const Admin = () => {
  return (
    <>

    <div className='lg:flex gap-10'>
      <Sildebar/>
    <Routes>
               <Route path='/' element={  <AddProduct/>}></Route>
               <Route path='/listproduct' element={  <Listproduct/>}></Route>
               </Routes>
    
    </div>
    
      </>
  )
}

export default Admin
