
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import black from "../Assets/black.jpeg";
import blue from "../Assets/blue_t-shirt.jpeg";
import green from "../Assets/green_t-shirtt.jpeg";
import red from "../Assets/red_t-shirt.jpeg";
import white from "../Assets/whitw_t-shirt.jpeg";

const Settings = ({ color, uppertextword, lowertextword, textSizechanges, textColorchanges, display, Designimg }) => {
    
    const {addTocart} = useContext(ShopContext)
    const navigate = useNavigate();

    const handleSave = async () => {
        try {
    
            const response = await fetch('https://e-commerce-website-h0yp.onrender.com/addProductDesign', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    tshirtcolor: display.tshirtcolor,
                    uppertext: display.uppertext,
                    lowertext: display.lowertext,
                    textSize: display.textSize,
                    textColor: display.textColor,
                    Designimg: display.Designimg,
                    price:display.price,
                }),
            });

            if (!response.ok) {
                throw new Error('Error saving product design');
            }
            if (localStorage.getItem('auth-token')) {
               
              
              
                alert('Product design saved successfully');
            
            } else {
                alert('Please login to Save design');
              
          
            }

        } catch (error) {
            console.error('Error saving product design:', error);
            alert('Failed to save product design');
        }
    };



    return (
        <div className="mx-auto lg:mx-0 px-2">
            <h3 className='font-semibold text-2xl my-2'>Settings</h3>
            <h4 className='text-lg my-1'>Change T-shirt Color : </h4>
            <div className='flex  gap-3 item-center cursor-pointer'>
                <img onClick={color} src={red} alt='t-shirt img' width={50} id='red'></img>
                <img onClick={color} src={blue} alt='t-shirt img' width={50} id="blue"></img>
                <img onClick={color} src={white} alt='t-shirt img' width={50} id="white"></img>
                <img onClick={color} src={green} alt='t-shirt img' width={50} id="green"></img>
                <img onClick={color} src={black} alt='t-shirt img' width={50} id="black"></img>
            </div>
            <hr />
            <div className='my-2'>
                <h4 className='text-lg my-1'>Write Text : </h4>
                <input type='text' placeholder='Upper text' name="uppertext" value={display.uppertext} onChange={uppertextword} style={{ wordWrap: 'break-word' }} className='rounded-full px-2 bg-transparent outline-0 border py-2 mx-1'></input>
                <input type='text' placeholder='Lower text' name="lowertext" value={display.lowertext} onChange={lowertextword} className='rounded-full px-2 bg-transparent outline-0 border py-2 '></input>
            </div>
            <hr />
            <div className='my-3'>
                <h4 className='text-lg my-1'>Upload Image : </h4>
                <div className='flex  gap-3 item-center cursor-pointer my-2'>
                    <img onClick={Designimg} src={'/first.jpeg'} alt=' img' width={70} id='first' ></img>
                    <img onClick={Designimg} src={'/sec.jpeg'} alt=' img' width={70} id='sec'></img>
                    <img onClick={Designimg} src={'/third.jpeg'} alt=' img' width={70} id='third'></img>
                    <img onClick={Designimg} src={'/four.jpeg'} alt=' img' width={70} id='four'></img>
                    <img onClick={Designimg} src={'/five.jpeg'} alt=' img' width={70} id='five'></img>
                </div>
                <div className='flex  gap-3 item-center cursor-pointer'>
                    <img onClick={Designimg} src={'/six.jpeg'} alt=' img' width={70} id='six'></img>
                    <img onClick={Designimg} src={'/seven.jpeg'} alt=' img' width={70} id='seven'></img>
                    <img onClick={Designimg} src={'/eight.jpeg'} alt=' img' width={70} id='eight'></img>
                    <img onClick={Designimg} src={'/nine.jpeg'} alt=' img' width={70} id='nine'></img>
                    <img onClick={Designimg} src={'/ten.jpeg'} alt=' img' width={70} id='ten'></img>
                </div>
            </div>
            <h4 className='text-lg my-1'>Text Size : </h4>
            <input onChange={textSizechanges} type="range" min='10' max='20' value={display.textSize} className='my-1' />
            <hr className="my-2" />
            <div>
                <h4 className='text-lg my-1 r'>Text Color : </h4>
                <select value={display.textColor} onChange={textColorchanges} className="outline-0 border">
                    <option>White</option>
                    <option>Black</option>
                    <option>Blue</option>
                    <option>Yellow</option>
                    <option>GreenYellow</option>
                    <option>IndianRed</option>
                    <option>RoyalBlue</option>
                    <option>SlateGrey</option>
                    <option>Salmon</option>
                    <option>LightPink</option>
                    <option>Indigo</option>
                    <option>DarkTurquoise</option>
                </select>
            </div>
            <hr />
         <button onClick={handleSave} className='border-2 px-4 py-2 text-white lg:my-5 my-2 hover:border-0' style={{ backgroundColor: '#a00220' }}> Save & BUY IT NOW </button> 
            {/* <button
            type="button"
            className="px-4 py-2 bg-[#a00220] text-white font-semibold rounded-md shadow-sm hover:bg-[#a00220]/80 focus:outline-none focus:ring-2 focus:ring-[#a00220] mt-6"
            onClick={handleSaveAndProceed}
          >
            Save & Proceed To Payment
          </button> */}
            
        </div>
    );
};

export default Settings;


