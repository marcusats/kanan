import React, {useState, useEffect} from 'react';
import { useWriteContract } from 'wagmi';
import { adContractAbi } from '@/utils/contracts/Abis/adContract';
import { contractAddress } from '@/utils/contracts/AdContract';
import { getPendingProposals } from '@/utils/graph/creators';


  interface ProposalContent {
    adContent: string;
    imageHash: string;
    link: string;
  }

  interface Proposal {
    id: string;
    content: ProposalContent; 
    company: string;
  }
  
  interface ProposalsComponentProps {
    creatorAddress: string; 
  }
  
const ProposalsComponent: React.FC<ProposalsComponentProps> = ({ creatorAddress }) => {
    const [proposals, setProposals] = useState<Proposal[]>([]);
    const { writeContract } = useWriteContract();
  
    useEffect(() => {
      const fetchProposals = async () => {
        try {
          const fetchedProposals = await getPendingProposals(creatorAddress.toLowerCase());
          // Parse the content of each proposal from JSON string to object
          const parsedProposals = fetchedProposals.map(proposal => ({
            ...proposal,
            content: JSON.parse(proposal.content) as ProposalContent,
          }));
          console.log('parsedProposals', parsedProposals);
          setProposals(parsedProposals);
        } catch (error) {
          console.error("Failed to fetch pending proposals:", error);
          setProposals([]);
        }
      };
  
      if (creatorAddress) {
        fetchProposals();
      }
    }, [creatorAddress]); 

    async function handleApprove(id: string) {
        console.log('Approving proposal...');
        writeContract({
            abi: adContractAbi,
            address: contractAddress,
            functionName: 'approveProposal',
            args: [id],
        });
    }

    async function handleDeny(id: string) {
        console.log('Denying proposal...');
        writeContract({
            abi: adContractAbi,
            address: contractAddress,
            functionName: 'rejectProposal',
            args: [id],
        });
    }
  
    return (
      <div className="">
        {proposals.length > 0 ? (
          proposals.map((proposal, index) => (
            <div key={index} className="flex flex-col items-center justify-center relative mb-4 p-4 bg-white/30 backdrop-blur-lg rounded-lg shadow-lg">
              {/* Use the parsed content for the image source */}
              <img src={`https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${proposal.content.imageHash}`} alt={`Proposal ${index + 1}`} className="w-3/4 h-auto rounded-lg" />
              <div className="flex justify-center mt-3 gap-4">
                <button onClick={()=> handleApprove(proposal.id)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-150">Approve</button>
                <button onClick={()=> handleDeny(proposal.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-150">Deny</button>
              </div>
            </div>
          ))
        ) : (
            <div>
                <p className="mt-11 text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">No pending proposals found...</p>
            </div>
        )}
      </div>
    );
  };
  
  export default ProposalsComponent;