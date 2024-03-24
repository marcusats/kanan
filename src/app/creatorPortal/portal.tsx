import React, { useState, useEffect } from 'react';
import ProposalsComponent from './proposals';
import PostComponent from './post';
import RegisterCreatorComponent from './register';
import { isCreator } from '@/utils/graph/creators';



const PortalComponent = ({ address }: { address: `0x${string}` }) => {
  const [registeredCreator, setRegisteredCreator] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkIsRegisteredCreator = async () => {
      const result = await isCreator(address.toLowerCase());
      console.log('result', result);
      setRegisteredCreator(result);
      setLoading(false);
    };

    checkIsRegisteredCreator();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!registeredCreator) {
    return <RegisterCreatorComponent />;
  }


  return (
    <div className="mb-8 p-7">
      <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-2">Welcome to the Creator portal!</h1>
      <div className="text-lg mb-6 mt-12">
        <p><strong>Wallet Address:</strong> {address}</p>
      </div>
      <div className="flex justify-center gap-8">
        <div className="w-1/2 p-6 border-2 border-pink-500 text-center rounded-lg">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-2">Proposals</h2>
          <ProposalsComponent creatorAddress={address} />
        </div>
        <div className="w-1/2 p-6 border-2 border-pink-500 text-center rounded-lg">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-2">Active Posts</h2>
          <PostComponent creatorAddress={address} />
        </div>
      </div>
    </div>
  );
};

export default PortalComponent;
