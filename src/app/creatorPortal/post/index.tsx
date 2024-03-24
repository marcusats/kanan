import React, {useState, useEffect} from 'react';
import { useWriteContract } from 'wagmi';
import { adContractAbi } from '@/utils/contracts/Abis/adContract';
import { contractAddress } from '@/utils/contracts/AdContract';
import { getApprovedProposals } from '@/utils/graph/creators';

interface Post {
    id: string;
    adContent: AdContent;
}

interface AdContent {
    img: string; 
    link: string; 
}


interface PostComponentProps {
    creatorAddress: string; 
}


const PostComponent: React.FC<PostComponentProps> = ({ creatorAddress }) => {
    const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const fetchedProposals = await getApprovedProposals(creatorAddress.toLowerCase());
        setPosts(fetchedProposals);
      } catch (error) {
        console.error("Failed to fetch approved proposals:", error);
        setPosts([]);
      }
    };

    if (creatorAddress) {
      fetchProposals();
    }
  }, [creatorAddress]);

    return (
      <div>
       {posts.length > 0 ? (
        posts.map((proposal, index) => (
          <div key={index} className="flex flex-col items-center justify-center relative mb-4 p-4 bg-white/30 backdrop-blur-lg rounded-lg shadow-lg">
            <img src={proposal.adContent.img} alt={`Approved Proposal ${index + 1}`} className="w-3/4 h-auto rounded-lg cursor-pointer" />
          </div>
        ))
      ) : (
        <div>
          <p className="mt-11 text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">No approved proposals found...</p>
        </div>
      )}
      </div>
    );
};

export default PostComponent;