import React from "react";

const Design = ({ display, textformat }) => {
  console.log(display.DesignImg);

  return (
    <div>
      <div className="mx-32 relative z-0">
        <img
          src={`${display.tshirtcolor}.jpeg`}
          alt="img tshirt"
          width={400}
          // className='lg:w-6/12'
        ></img>
      </div>
      <p className=" text-xl   my-3    text-center      ">Rs.899</p>

      <div className="text-center absolute lg:top-[22rem] lg:left-[16rem] top-[10rem] left-[11.5rem]">
        <p
          className="text-white capitalize"
          style={{ fontSize: textformat, color: display.textColor }}
        >
          {display.uppertext}
        </p>

        <img
          src={`${display.DesignImg}.jpeg`}
          alt="img tshirt"
          className="w-14 lg:w-36"
        ></img>

        <p
          className="text-white capitalize"
          style={{ fontSize: textformat, color: display.textColor }}
        >
          {display.lowertext}
        </p>
      </div>
    </div>
  );
};

export default Design;
