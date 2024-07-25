import React, { useState } from 'react';
import { TiArrowRightThick } from "react-icons/ti";
const Email = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubscribe = async () => {
    try {
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setMessage('Please enter a valid email address');
        return;
      }

      const response = await fetch('https://e-commerce-website-h0yp.onrender.com/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setIsSubscribed(true);
        setMessage(data.message);
      } else {
        setMessage(data.message || 'Subscription failed');
      }

      setTimeout(() => {
        setIsSubscribed(false);
        setMessage('');
      }, 2000);
    } catch (error) {
      console.error('Error subscribing:', error);
      setMessage('Subscription failed');
    }
  };

  return (
    <>
      <div className=' lg:w-2/4 mx-auto h-2/4 py-5 flex flex-col gap-4  text-white w-full' style={{ backgroundColor: '#a00220' }}>
     
        <p className='text-center text-md'>Subscribe to Our newsletter</p>
        <div className='flex mx-auto  flex-wrap border'>
          <input
            type='email'
            placeholder='Your email id'
            className='lg:w-80 lg:px-3 lg:py-2 border-gray-400 bg-transparent  outline-0  px-4 py-3  mx-auto'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className='text-white cursor-pointer px-4 py-3 mx-auto lg:mt-0 mt-2'
            style={{ backgroundColor: '#a00220' }}
            onClick={handleSubscribe}
          >
            <TiArrowRightThick />
          </button>
        </div>
        {message && <div className='mt-2 mx-auto'>{message}</div>}
      </div>
    </>
  );
};

export default Email;
