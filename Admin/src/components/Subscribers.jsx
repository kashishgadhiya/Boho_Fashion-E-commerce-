
import React, { useEffect, useState } from 'react';
import Loading from './Loading'; 

const Subscribers = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [filteredSubscribers, setFilteredSubscribers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('latest');

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://boho-fashion-e-commerce.onrender.com/subscribersdata');
      const data = await response.json();
      setSubscribers(data);
      setFilteredSubscribers(data);
    } catch (error) {
      console.error('Error fetching subscribers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  useEffect(() => {
    let filtered = subscribers.filter(subscriber =>
      subscriber.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortOrder === 'latest') {
      filtered.sort((a, b) => new Date(b.subscribedAt) - new Date(a.subscribedAt));
    } else {
      filtered.sort((a, b) => new Date(a.subscribedAt) - new Date(b.subscribedAt));
    }

    setFilteredSubscribers(filtered);
  }, [searchQuery, sortOrder, subscribers]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <div className='mt-5 w-[90%] mx-10'>
      <h2 className='text-[#a00220] font-semibold text-2xl my-5'>Subscribers</h2>
      <div className='mb-4'>
        <input
          type='text'
          placeholder='Search by email...'
          className='py-2 px-4 border border-gray-300 rounded-lg w-full mb-2'
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <select
          className='py-2 px-4 border border-gray-300 rounded-lg w-full'
          value={sortOrder}
          onChange={handleSortChange}
        >
          <option value='latest'>Latest First</option>
          <option value='earliest'>Earliest First</option>
        </select>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className='overflow-x-auto overflow-y-auto max-h-[80vh]'>
          <table className='min-w-full bg-white border border-gray-300'>
            <thead className='bg-gray-200'>
              <tr>
                <th className='py-2 px-4 border-b text-left text-gray-600'>Email</th>
                <th className='py-2 px-4 border-b text-left text-gray-600'>Subscribed At</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubscribers.length > 0 ? (
                filteredSubscribers.map((subscriber) => (
                  <tr key={subscriber._id} className='hover:bg-gray-100'>
                    <td className='py-2 px-4 border-b'>{subscriber.email}</td>
                    <td className='py-2 px-4 border-b'>
                      {new Date(subscriber.subscribedAt).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan='2' className='py-2 px-4 text-center text-gray-500'>
                    No subscribers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Subscribers;
