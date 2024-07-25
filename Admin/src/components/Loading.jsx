
import React from 'react';
import './Loading.css'; 

const Loading = () => {
  return (
    <div className='loading-overlay'>
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center justify-center bg-opacity-50 rounded-lg p-8">
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
          <div className="mt-4 text-white text-lg font-semibold">Loading...</div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
