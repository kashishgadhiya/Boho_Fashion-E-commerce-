

import React, { useEffect, useState } from 'react';
import Loading from './Loading'; 


const OrderModal = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center overflow-auto">
      <div className="bg-white p-6 rounded-md shadow-lg w-3/4 max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4 text-[#a00220]">Order Details</h2>
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Customer:</strong> {order.firstName} {order.lastName}</p>
        <p><strong>Email:</strong> {order.email}</p>
        <p><strong>Address:</strong> {order.street}, {order.city}, {order.state}, {order.pinCode}, {order.country}</p>
        <p><strong>Phone Number:</strong> {order.phoneNumber}</p>
        <p><strong>Total Amount:</strong> Rs.{order.totalAmount}</p>
        <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>

        <h3 className="text-lg font-semibold mt-4">Cart Items:</h3>
        <ul className="list-disc list-inside">
          {order.cartItems.map(item => (
            <li key={item.id} className="flex items-center mb-4">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mr-4 rounded-md" />
              <div>
                <p><strong>{item.name}</strong></p>
                <p>Rs.{item.price} x {item.quantity} = Rs.{item.total}</p>
              </div>
            </li>
          ))}
        </ul>

        <button
          className="mt-4 px-4 py-2 bg-[#a00220] text-white font-semibold rounded-md shadow-sm hover:bg-[#a00220]/80 focus:outline-none"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('https://boho-fashion-e-commerce.onrender.com/orders'); 
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <Loading />; 
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (orders.length === 0) {
    return <p>No orders found.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg min-h-screen mt-10">
      <h1 className="text-2xl font-semibold mb-6 text-[#a00220]">All Orders</h1>

      <div className="overflow-x-auto">
        <div className="overflow-y-auto max-h-[80vh]">
          <table className="w-full bg-white border border-gray-200 rounded-md shadow-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-4 border-b">Order ID</th>
                <th className="p-4 border-b">Customer</th>
                <th className="p-4 border-b">Email</th>
                <th className="p-4 border-b">Total Amount</th>
                <th className="p-4 border-b">Date</th>
                <th className="p-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="p-4 border-b">{order._id}</td>
                  <td className="p-4 border-b">{order.firstName} {order.lastName}</td>
                  <td className="p-4 border-b">{order.email}</td>
                  <td className="p-4 border-b">Rs.{order.totalAmount}</td>
                  <td className="p-4 border-b">{new Date(order.date).toLocaleDateString()}</td>
                  <td className="p-4 border-b">
                    <button
                      className="px-4 py-2 bg-[#a00220] text-white font-semibold rounded-md shadow-sm hover:bg-[#a00220]/80 focus:outline-none"
                      onClick={() => setSelectedOrder(order)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedOrder && (
        <OrderModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default AdminOrders;

