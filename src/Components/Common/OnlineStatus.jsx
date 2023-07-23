import React, { useState, useEffect } from 'react';

const OnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  console.log('online mode=-===================', isOnline)

  return (
    <div>
      <h1 className='text-red-600 font-bold text-xl'>You are offline</h1>
    </div>
  );
};

export default OnlineStatus;
