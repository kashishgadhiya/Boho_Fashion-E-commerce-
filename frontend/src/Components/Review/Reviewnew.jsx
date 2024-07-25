
import data from './Review';
import { GiRoundStar } from 'react-icons/gi';


import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", borderRadius: "50%", }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
      
        borderRadius: "50%", 
     
        zIndex: 1, 
      }}
      onClick={onClick}
      />
      
  );
}

function Reviewnew() {

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]}
  return (
    <div className=' slider-container'>
    <h2 className='lg:text-3xl font-semibold py-2 text-center text-2xl mx-auto mt-5'>
    Voices of Elegance
  </h2>
  <hr
    className='lg:w-52 h-2 rounded-full text-center mx-auto w-44 mb-5'
    style={{ backgroundColor: '#a00220' }}
    />
  <p className='text-center my-2'>
    Hear what our customers have to say about their Boho experience. 💖 #
    BOHOtestimonials
  </p>
    <div className=' mx-auto mb-7 w-3/4 '>
      <div className="mt-20">
      <Slider {...settings}>
        {data.map((d) => (
          <div key={d.name} className=" bg-orange-100 lg:h-[380px] text-black rounded-xl p-2 md:h-[450px] h-[500px] ">
            <div className='flex items-center p-2  bg-orange-100 rounded-xl '>
            <div className=' flex justify-center items-center rounded-t-xl gap-5 flex-wrap'>
              <img src={d.img} alt="" className="h-20 w-20 rounded-full"/>
            </div>

            <div className="flex flex-col items-center justify-center gap-1 p-4">
              <p className="text-xl font-semibold">{d.name}</p>
              <div className='flex  text-yellow-400'>
            
                 <GiRoundStar  />
                 <GiRoundStar  />
                 <GiRoundStar  />
                 <GiRoundStar  />
                 <GiRoundStar  />
            </div>
            </div>
            </div>
              <p className="text-center py-3">{d.review}</p>
             
          </div>
        ))}
      </Slider>
      </div>
      
    </div>
        </div>
  );
}



export default Reviewnew;