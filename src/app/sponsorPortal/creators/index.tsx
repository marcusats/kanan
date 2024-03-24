import React, { useEffect, useState } from 'react';
import { getCreators } from '@/utils/graph/creators';

interface Creator {
  id: string;
  reputation: number;
}

const CreatorsComponent = () => {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const fetchedCreators = await getCreators();
        setCreators(fetchedCreators);
      } catch (error) {
        console.error("Failed to fetch creators:", error);
        setCreators([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCreators();
  }, []);

  if (isLoading) {
    return (
      <div className="mt-11 text-center">
        <p className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
          Loading...
        </p>
      </div>
    );
  }

  if (creators.length === 0) {
    return (
      <div className="mt-11 text-center">
        <p className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
          No creators found.
        </p>
      </div>
    );
  }
  return (
    <div className="flex flex-wrap justify-center gap-4 m-5 mt-10">
      {creators.map((creator, index) => (
        <div key={index} className="w-1/4 p-4 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg border border-gray-200 shadow-lg">
          <p><strong>Address:</strong> {`${creator.id.substring(0, 6)}...`}</p>
          <p><strong>Reputation:</strong> {creator.reputation}</p>
          <a href={`sponsorPortal/proposal/${creator.id}`} className="mt-4 bg-pink-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded transition-colors duration-150 inline-block text-center">Make Proposal</a>
        </div>
      ))}
    </div>
  );
};

export default CreatorsComponent;
