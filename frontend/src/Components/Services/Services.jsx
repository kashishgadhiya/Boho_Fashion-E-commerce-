import React from 'react'
import { FaTruck } from "react-icons/fa";
import { FaUnlockAlt } from "react-icons/fa";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";

const Services = () => {
  return (
    <div className='flex lg:justify-between my-10 mt-10 flex-wrap items-center justify-center gap-5 '>
      <div  style={{color:"#a00220"}} className='flex items-center justify-center flex-col'>
      <FaTruck style={{ fontSize: '5rem', color:"rgb(185 28 28)" , border :"5px solid rgb(185 28 28)", borderRadius:"50%", padding:"10px"}} />
      <p className='text-xl font-semibold mx-auto'>Quality & Safe shipping</p>
      </div>
      <div  style={{color:"#a00220"}} className='flex items-center justify-center flex-col'>
      <FaUnlockAlt  style={{ fontSize: '5rem', color:"rgb(185 28 28)" , border :"5px solid rgb(185 28 28)", borderRadius:"50%", padding:"10px"}} />
      <p className='text-xl font-semibold mx-auto'>Secure Payments</p>
      </div>
      <div  style={{color:"#a00220"}} className='flex items-center justify-center flex-col'>
      <RiMoneyRupeeCircleFill style={{ fontSize: '5rem', color:"rgb(185 28 28)" , border :"5px solid rgb(185 28 28)", borderRadius:"50%", padding:"10px"}} />
      <p className='text-xl font-semibold mx-auto'>Best price guarantee</p>
      </div>
    </div>
  )
}

export default Services
