
import React, { useEffect, useRef, useState } from 'react';


const Review = () => {
  const [isTitleInView, setIsTitleInView] = useState(false);
  const titleRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsTitleInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, []);

  return (
    <div>
      <h2
        ref={titleRef}
        className={`lg:text-3xl font-semibold py-2 text-center text-2xl mx-auto mt-5 title-animate ${isTitleInView ? 'in-view' : ''}`}
      >
        Voices of Elegance 
      </h2>
      <hr
        className='lg:w-52 h-2 rounded-full text-center mx-auto w-44'
        style={{ backgroundColor: '#a00220' }}
      />
    </div>
  );
};

export default Review;
