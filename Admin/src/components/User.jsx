import React, { useEffect, useState } from 'react';
import Loading from './Loading';

const User = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('latest');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://boho-fashion-e-commerce.onrender.com/users');
      const data = await response.json();
      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    let filtered = users.filter(user =>
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortOrder === 'latest') {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else {
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    setFilteredUsers(filtered);
  }, [searchQuery, sortOrder, users]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <div className='mt-5 px-4 sm:px-6 lg:px-8 w-full'>
      <h2 className='text-[#a00220] font-semibold text-xl sm:text-2xl my-5'>All Users</h2>
      <div className='mb-4 flex flex-col sm:flex-row sm:items-center sm:space-x-4'>
        <input
          type='text'
          placeholder='Search by email...'
          className='py-2 px-4 border border-gray-300 rounded-lg mb-2 sm:mb-0 w-full sm:w-1/2 lg:w-1/3'
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <select
          className='py-2 px-4 border border-gray-300 rounded-lg w-full sm:w-1/2 lg:w-1/3'
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
        <div className='overflow-x-auto overflow-y-auto max-h-[70vh]'>
          <table className='min-w-full bg-white border border-gray-300'>
            <thead className='bg-gray-200'>
              <tr>
                <th className='py-2 px-4 border-b text-left text-gray-600 text-xs sm:text-sm'>Email</th>
                <th className='py-2 px-4 border-b text-left text-gray-600 text-xs sm:text-sm'>Created At</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user._id} className='hover:bg-gray-100'>
                    <td className='py-2 px-4 border-b text-xs sm:text-sm'>{user.email}</td>
                    <td className='py-2 px-4 border-b text-xs sm:text-sm'>
                      {new Date(user.date).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan='2' className='py-2 px-4 text-center text-gray-500'>
                    No users found
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

export default User;




