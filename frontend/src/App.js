

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from './Components/Footer/Footer';
import NavBar from './Components/NavBar/NavBar';
import Dashboard from './Components/T-shirt-design/Dashboard';
import Cart from './Pages/Cart';
import Shop from "./Pages/Home";
import LoginSignup from "./Pages/LoginSignup";
import Product from './Pages/Product';
import ShopCategory from "./Pages/ShopCategory";
import Fail from "./Components/CardItem/Fail";
import Success from "./Components/CardItem/Success";

function App() {
  return (
    <>
    <BrowserRouter>
    
    <NavBar/>
    <Routes>
               <Route path='/' element={<Shop/>}></Route>
               <Route path='/men' element={<ShopCategory category="men"/>}></Route>
               <Route path='/women' element={<ShopCategory category="women"/>}></Route>
  
               <Route path='/product' element={<Product/>}>
                <Route path=':productId'element={<Product/>}></Route>
               </Route>
               <Route path='/cart' element={<Cart/>}></Route>
               <Route path='/make' element={<Dashboard/>}></Route>
               <Route path='/login' element={<LoginSignup/>}></Route>
               <Route path='/cart' element={<Cart/>}></Route>
               <Route path='/success' element={<Success/>}></Route>
               <Route path='/fail' element={<Fail/>}></Route>

    </Routes>
    
    <Footer/>
    </BrowserRouter>



      </>
   
  );
}

export default App;
