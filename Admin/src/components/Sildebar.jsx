import React from 'react'
import { CiViewList } from "react-icons/ci";
import { MdAddCircleOutline } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { LuMailPlus } from "react-icons/lu";
import { GiLoincloth } from "react-icons/gi";

import { Link } from "react-router-dom";

const Sildebar = () => {
    return (
        <div className='lg:max-w-xl bg-orange-100  lg:h-screen px-6  flex lg:block flex-wrap   '>
            <Link to={'/'} className="">

                <div className='flex gap-3 items-center lg:py-5 lg:text-xl font-semibold px-4 text-lg py-2'>
                    <MdAddCircleOutline />
                    <p> Add Product</p>
                </div>

            </Link>
            <Link to={'/listproduct'} className="">

                <div className='flex gap-3 items-center lg:py-5 lg:text-xl font-semibold px-4 text-lg py-2'>
                <CiViewList  className='font-semibold'/>
                    <p>Product List</p>
                </div>

            </Link>
            <Link to={'/orders'} className="">

                <div className='flex gap-3 items-center lg:py-5 lg:text-xl font-semibold px-4 text-lg py-2'>
                <GiLoincloth   className='font-semibold'/>
                    <p>Order</p>
                </div>

            </Link>
            <Link to={'/users'} className="">

                <div className='flex gap-3 items-center lg:py-5 lg:text-xl font-semibold px-4 text-lg py-2'>
                <FiUsers   className='font-semibold'/>
                    <p>Users</p>
                </div>

            </Link>
            <Link to={'/subscribers'} className="">

                <div className='flex gap-3 items-center lg:py-5 lg:text-xl font-semibold px-4 text-lg py-2'>
                <LuMailPlus 
   className='font-semibold'/>
                    <p>Subscribers</p>
                </div>

            </Link>

        </div>
    )
}

export default Sildebar
