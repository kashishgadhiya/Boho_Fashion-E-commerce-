import React from 'react';
import { Link } from "react-router-dom";


const Fail = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <img
          src="/fail.jpg" 
          alt="Failed"
          className="mx-auto mb-4 w-32 h-32 animate-shake" 
        />
        <h2 className="text-xl font-bold mb-2 text-red-600">Payment Failed</h2>
        <p className="text-gray-600 mb-4">There was an issue with your payment. Please try again.</p>
        <Link
          to="/"
          className="inline-block px-6 py-2 text-white rounded-lg hover:bg-white hover:text-[#a00220] hover:border-[#a00220] transition-colors bg-[#a00200]"
          style={{ border: "1px solid #a00220" }}
        >
          Go back to home
        </Link>
      </div>
    </div>
  );
};

export default Fail;
