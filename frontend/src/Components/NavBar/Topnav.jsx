

import React, { useEffect, useState, useRef } from 'react';


const Topnav = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.1 });

    if (navRef.current) {
      observer.observe(navRef.current);
    }

    return () => {
      if (navRef.current) {
        observer.unobserve(navRef.current);
      }
    };
  }, []);

  return (
    <div style={{ backgroundColor: '#a00220' }} className='text-white capitalize p-2 text-center w-screen'>
      <div ref={navRef} className={`scroll-container ${isVisible ? 'title-animate in-view' : 'title-animate'}`}>
        <div className='scroll-text'>
          <span>FREE DELIVERY ON ALL ORDERS</span>
         
        </div>
      </div>
    </div>
  );
}

export default Topnav;
