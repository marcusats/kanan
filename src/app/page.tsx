

import React from 'react';

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col items-start justify-center pl-11 ">
      <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-2">Kanan</h1>
      <p className="text-2xl text-white mt-8 mb-8">Frames as a service</p>
      <div className="space-x-4 ">
        <a href="/creatorPortal" className="bg-white bg-opacity-20 text-white font-semibold py-2 px-4 rounded inline-block">Content creator</a>
        <a href="/sponsorPortal" className="bg-white bg-opacity-20 text-white font-semibold py-2 px-4 rounded inline-block">Sponsor</a>
      </div>
    </div>
  );
}


