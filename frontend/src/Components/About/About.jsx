

import React, { useEffect, useRef, useState } from 'react';
import './About.css'; 

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const paragraphRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();  
        }
      },
      { threshold: 0.1 } 
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`p-5 slide-in-section ${isVisible ? 'in-view' : ''}`}
    >
      <h2
        ref={titleRef}
        className={`lg:text-3xl font-semibold py-2 text-center text-2xl mx-auto mt-5 slide-in-title ${isVisible ? 'in-view' : ''}`}
      >
        About BOHO Fashion
      </h2>
      <hr className='lg:w-52 h-2 rounded-full text-center mx-auto w-44' style={{backgroundColor:'#a00220'}}/>
      <p
        ref={paragraphRef}
        className={`my-10 text-lg text-slate-800 slide-in-paragraph ${isVisible ? 'in-view' : ''}`}
      >
        At Boho Fashion, we're more than just a clothing brand for women, men, and more. We're a passionate team committed to helping people feel confident and beautiful every day. Our goal is to make getting dressed fun and expressive, not just a chore. Each piece we make is carefully designed to not only look great but also to make you feel amazing. We love blending old traditions with new styles, creating clothes that bring a sense of history into today's world. Come join us on this exciting journey as we mix classic charm with modern fashion to give you a magical shopping experience.
      </p>
    </section>
  );
};

export default About;
