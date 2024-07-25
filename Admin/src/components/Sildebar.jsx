import React from 'react'
import { CiViewList } from "react-icons/ci";
import { MdAddCircleOutline } from "react-icons/md";

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

        </div>
    )
}

export default Sildebar
