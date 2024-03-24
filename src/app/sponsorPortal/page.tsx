'use client'
import React from 'react';
import Navbar from '@/components/Navbar';
import { useAccount } from 'wagmi';
import PortalComponent from './portal';

const AccountStatus = () => {
  const account = useAccount();

  if (account.status === 'connected') {
    return <PortalComponent address={account.address} />;
  } else {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-2">Please connect your wallet</h1>
      </div>
    );
  }
};

export default function Page() {
  return (
    <div>
        <Navbar />
        <AccountStatus />
    </div>
  );
}