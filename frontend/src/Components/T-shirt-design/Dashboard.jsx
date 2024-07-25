import React, { useState } from "react";
import Design from "./Design";
import Settings from "./Settings";


const Dashboard = () => {
 
  const [image, setImage] = useState(false);
  const [productdetails, setProductdetails] = useState({
    name: "",
    image: "",
    price: "",
  });

  const firstValue = {
    id:111,
    tshirtcolor: "black",
    uppertext: "This is upper text",
    lowertext: "This is lower text",
    DesignImg: "first",
    textSize: 12,
    textColor :"white",
    price:899
  };

  console.log(firstValue)
  const [infostate, setInfoState] = useState(firstValue);

  const handleColor = (e) => {
    setInfoState((prevState) => ({
        ...prevState,
        tshirtcolor: e.target.id,
    }));
};

  const handleUpperText = (e) => {
    setInfoState((prevState) => ({
      ...prevState,
      uppertext: e.target.value,
    }));
  };

  const handleLowerText = (e) => {
    setInfoState((prevState) => ({
      ...prevState,
      lowertext: e.target.value,
    }));
  };
  const handleTextsize = (e) => {
    setInfoState(prevState => ({
      ...prevState,
      
      textSize:parseInt(e.target.value) }));
  };

  console.log(firstValue.textSize)
  const formatText = () => {
    const size = infostate.textSize;
    return parseInt(size);
  };

  // setInfoState({textColor:e.target.value})
  const handletextcolor = (e)=>{
    setInfoState(prevState => ({
      ...prevState,
      textColor:e.target.value
      }));

  }


 
  console.log(productdetails);


  const handleDesignimg = (e)=>{
    setInfoState(prevState => ({
      ...prevState,
      DesignImg:e.target.id
      }));

  }

  
  return (
    <div className=" mx-auto flex flex-wrap">
      <Design display={infostate} textformat={formatText()} />
      <Settings
        color={handleColor}
        uppertextword={handleUpperText}
        lowertextword={handleLowerText}
        Designimg={handleDesignimg}
        textSizechanges={handleTextsize}
        textColorchanges={handletextcolor}
        display={infostate}
        
       
      />
    </div>
  );
};

export default Dashboard;
