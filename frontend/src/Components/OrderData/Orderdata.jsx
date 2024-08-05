import React, { useState, useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import { loadStripe } from '@stripe/stripe-js';

function Orderdata() {
  const { getTotalCartAmount, all_product, cartItems } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    pinCode: '',
    country: '',
    phoneNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveAndProceed = async () => {
    try {
      const orderData = {
        formData,
        cartItems: cartDetails,
        totalAmount: getTotalCartAmount(),
      };

      // Save order address
      const response = await fetch('https://boho-fashion-e-commerce.onrender.com/save-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error(`Error saving order: ${response.statusText}`);
      }

      // Proceed to payment
      const cardDetails = all_product
        .map(product => {
          if (cartItems[product.id] > 0) {
            return {
              id: product.id,
              name: product.name,
              price: product.price,
              quantity: cartItems[product.id],
              total: product.price * cartItems[product.id],
              image: product.image
            };
          }
          return null;
        })
        .filter(item => item !== null);

      const stripe = await loadStripe('pk_test_51PgV8VGFvdjb00UZ5njNHVglF5yyvu2tcp642MU5WLXgLcC30Yxwi4iIu8OE24XgKMt463tFakzs32Lpdo5ydrnb00qVYhXhWN');
      
      if (!stripe) {
        console.error('Stripe failed to load.');
        return;
      }

      const paymentResponse = await fetch("https://boho-fashion-e-commerce.onrender.com/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products: cardDetails })
      });

      if (!paymentResponse.ok) {
        throw new Error(`Error creating checkout session: ${paymentResponse.statusText}`);
      }

      const session = await paymentResponse.json();

      const result = await stripe.redirectToCheckout({
        sessionId: session.id
      });

      if (result.error) {
        console.error('Stripe redirect error:', result.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const cartDetails = all_product
    .map(product => {
      if (cartItems[product.id] > 0) {
        return {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: cartItems[product.id],
          total: product.price * cartItems[product.id],
          image: product.image
        };
      }
      return null;
    })
    .filter(item => item !== null);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg min-h-screen mt-10">
      <h1 className="text-2xl font-semibold mb-6 text-[#a00220]">Order Details</h1>

      {/* Order Form */}
      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="firstName">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First name"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#a00220] focus:border-[#a00220] sm:text-sm h-9 border outline-none px-3"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="lastName">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last name"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#a00220] focus:border-[#a00220] sm:text-sm h-9 border outline-none px-3"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#a00220] focus:border-[#a00220] sm:text-sm h-9 border outline-none px-3"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="street">
              Street/Building Name
            </label>
            <input
              type="text"
              id="street"
              name="street"
              value={formData.street}
              onChange={handleChange}
              placeholder="Street/Building Name"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#a00220] focus:border-[#a00220] sm:text-sm h-9 border outline-none px-3"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="city">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#a00220] focus:border-[#a00220] sm:text-sm h-9 border outline-none px-3"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="state">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="State"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#a00220] focus:border-[#a00220] sm:text-sm h-9 border outline-none px-3"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="pinCode">
              Pin Code
            </label>
            <input
              type="text"
              id="pinCode"
              name="pinCode"
              value={formData.pinCode}
              onChange={handleChange}
              placeholder="Pin code"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#a00220] focus:border-[#a00220] sm:text-sm h-9 border outline-none px-3"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="country">
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Country"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#a00220] focus:border-[#a00220] sm:text-sm h-9 border outline-none px-3"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="phoneNumber">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone number"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#a00220] focus:border-[#a00220] sm:text-sm h-9 border outline-none px-3"
              required
            />
          </div>
        </div>

        <div className="my-14">
          <h1 className="text-2xl my-2 font-medium">Cart Totals</h1>
          <div className="flex justify-between my-2">
            <p>Subtotal</p>
            <p>Rs.{getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="flex justify-between my-2">
            <p>Shipping Fee</p>
            <p>Free</p>
          </div>
          <hr />
          <div className="flex justify-between my-2">
            <p>Total</p>
            <strong>Rs.{getTotalCartAmount()}</strong>
          </div>
          <hr />
          <button
            type="button"
            className="px-4 py-2 bg-[#a00220] text-white font-semibold rounded-md shadow-sm hover:bg-[#a00220]/80 focus:outline-none focus:ring-2 focus:ring-[#a00220] mt-6"
            onClick={handleSaveAndProceed}
          >
            Save & Proceed To Payment
          </button>
        </div>
      </form>
    </div>
  );
}

export default Orderdata;
