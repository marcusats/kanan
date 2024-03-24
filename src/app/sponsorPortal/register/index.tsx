import React, { useState } from 'react';
import { useWriteContract } from 'wagmi'
import { adContractAbi } from '@/utils/contracts/Abis/adContract';
import { contractAddress } from '@/utils/contracts/AdContract';

const RegisterSponsorComponent = () => {
  const [name, setName] = useState('');
  const { writeContract } = useWriteContract();
  const handleRegister = () => {
    
      console.log('Registering as a creator with name:', name);
      writeContract({
          abi: adContractAbi,
          address: contractAddress,
          functionName: 'registerCompany',
          args: [],
      });
 
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mt-10">Register as a Sponsor</h1>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="w-full max-w-xs p-6 border-2 border-pink-500 text-center rounded-lg">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="text-lg p-2 mb-4 w-full border-2 border-pink-500 rounded-lg text-black"
          />
          <button
            onClick={handleRegister}
            className="bg-pink-500 hover:bg-purple-600 text-white font-bold py-2 px-4 w-full rounded transition-colors duration-150"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterSponsorComponent;
