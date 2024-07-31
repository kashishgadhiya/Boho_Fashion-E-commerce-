import React, { useEffect, useState } from 'react';
import Loading from './Loading'; // Assuming you have a Loading component

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:4000/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className='mt-5'>
      <p className='text-xl py-1 font-semibold my-5'>Users</p>
      {loading ? (
        <Loading />
      ) : (
        <div className='overflow-x-auto'>
          <table className='min-w-full bg-white'>
            <thead>
              <tr className='w-full bg-gray-200'>
                <th className='py-2 px-4 border-b text-left'>Email</th>
                <th className='py-2 px-4 border-b text-left'>Created At</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className='py-2 px-4 border-b'>{user.email}</td>
                  <td className='py-2 px-4 border-b'>
                    {new Date(user.date).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default User;
