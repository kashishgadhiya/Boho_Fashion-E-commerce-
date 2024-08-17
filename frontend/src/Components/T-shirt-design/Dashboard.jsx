import React, { useState } from "react";
import Design from "./Design";
import Settings from "./Settings";


const Dashboard = () => {
   const firstValue = {
    id:111,
    tshirtcolor: "black",
    uppertext: "Boho",
    lowertext: "Fashion",
    DesignImg: "first",
    textSize: 12,
    textColor :"white",
    price:899
  };

  
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
