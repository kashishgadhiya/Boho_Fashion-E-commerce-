

import React from 'react';
import Email from '../Email/Email';

const Footer = () => {
  return (
    <footer className=" text-white text-center py-4 bottom-0 mt-2" style={{backgroundColor:"#a00220"}}>
      <Email/>
      
      <div className="container mx-auto">
        <p className='text-center py-2'>Copyright &copy; 2024 - All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;




