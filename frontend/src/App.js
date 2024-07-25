

import NavBar from './Components/NavBar/NavBar';
import {BrowserRouter ,Routes,Route} from "react-router-dom"
import Shop from "./Pages/Home"
import ShopCategory from "./Pages/ShopCategory"
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from "./Pages/LoginSignup"
import Footer from './Components/Footer/Footer';
import Design from "./Components/T-shirt-design/Design"
import Dashboard from './Components/T-shirt-design/Dashboard';
import Email from './Components/Email/Email';

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

    </Routes>
    
    <Footer/>
    </BrowserRouter>



      </>
   
  );
}

export default App;
