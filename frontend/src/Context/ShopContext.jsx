
import React, { createContext, useEffect, useState } from 'react';

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_product, setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Fetch products
    fetch('https://e-commerce-website-h0yp.onrender.com/allproduct')
      .then((response) => response.json())
      .then((data) => setAll_Product(data));

    // Check if user is logged in and admin
    const authToken = localStorage.getItem('auth-token');
    if (authToken) {
      fetch('https://e-commerce-website-h0yp.onrender.com/checkadmin', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Auth-token': authToken,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setIsAdmin(data.isAdmin); 
        })
        .catch((error) => {
          console.error('Error checking admin status:', error);
        });

      // Fetch user's cart items
      fetch('https://e-commerce-website-h0yp.onrender.com/getcart', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Auth-token': authToken,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => setCartItems(data))
        .catch((error) => {
          console.error('Error fetching cart items:', error);
        });
    }
  }, []);

  const addTocart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    if (localStorage.getItem('auth-token')) {
      fetch('https://e-commerce-website-h0yp.onrender.com/addtocart', {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'Auth-token': `${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    if (localStorage.getItem('auth-token')) {
      fetch('https://e-commerce-website-h0yp.onrender.com/removefromcart', {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'Auth-token': `${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find((product) => product.id === Number(item));
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const sortedProducts = [...all_product];
  const sortItems = (criteria) => {
    switch (criteria) {
      case 'lowest':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'highest':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'a-z':
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'z-a':
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
    setAll_Product(sortedProducts);
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addTocart,
    removeFromCart,
    sortItems,
    isAdmin,
  };

  return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
