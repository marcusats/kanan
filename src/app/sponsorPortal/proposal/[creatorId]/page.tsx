'use client'
import React, { useState } from 'react';
import { useWriteContract } from 'wagmi'
import { PinataFDK } from "pinata-fdk";
import { adContractAbi } from '@/utils/contracts/Abis/adContract';
import { contractAddress } from '@/utils/contracts/AdContract';
import { parseUnits } from 'viem'
import { useRouter } from 'next/navigation';


interface ProposalForm {
  image: File | null;
  link: string;
  imageUrl: string;
  paymentOffer: string;
}

const ProposalFormComponent = ({
    params,
  }: {
    params: { creatorId: string };
  }) => {

    const [form, setForm] = useState<ProposalForm>({ image: null, link: '', imageUrl: '', paymentOffer: '' });
    const [isLoading, setIsLoading] = useState(false);
    const fdk = new PinataFDK();
    const { writeContract } = useWriteContract()
    const router = useRouter();
  async function pinFileToIPFS(file:File) {
    try {
        setIsLoading(true);
        const formData = new FormData();
   
        formData.append("file", file);
        const pinataMetadata = JSON.stringify({
            name: "Marco", 
        });
        formData.append("pinataMetadata", pinataMetadata);
        const pinataOptions = JSON.stringify({
            cidVersion: 0, 
        });
        formData.append("pinataOptions", pinataOptions);
        const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
            },
            body: formData,
        });
        const resData = await res.json();
        console.log(resData);
        return resData;
    } catch (error) {
        console.log(error);
    } finally {
        setIsLoading(false);
    }
}


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setForm({ ...form, image: file, imageUrl: URL.createObjectURL(file) });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
        const ipfsRes = await pinFileToIPFS(form.image as File);
      
        const frameMetadata = fdk.getFrameMetadata({
            image: { url: `https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${ipfsRes.IpfsHash}` },
            aspect_ratio: "1.91:1",
            buttons: [
            { label: 'Visit Website', action: "link", target: form.link },
            ]
        });

        const res = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                adContent: frameMetadata,
                link: form.link,
                imageHash: ipfsRes.IpfsHash,
            }),
        });
        const resData = await res.json();
    
        await writeContract({
            abi: adContractAbi,
            address: contractAddress,
            functionName: 'submitProposal',
            value: parseUnits(form.paymentOffer, 9),
            args: [resData.IpfsHash.toString() , parseUnits(form.paymentOffer, 9),params.creatorId.toLowerCase()]
        });

       
      
    } catch (error) {
      console.error('Error submitting the proposal:', error);
      alert('Failed to submit proposal. Please try again.');
    } finally {
      setIsLoading(false);
      router.push(`/sponsorPortal`);
    }
  };


  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-2">Make a Proposal</h1>
        <p className="text-lg text-gray-700 mb-4">to {params.creatorId}</p>
      </div>
      {form.imageUrl && <img src={form.imageUrl} alt="Uploaded" className="mb-4 max-w-xs" />}
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="image">
              Upload Image
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="image" type="file" name="image" onChange={handleImageChange} />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="link">
              Website Link
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="link" type="text" placeholder="https://example.com" name="link" value={form.link} onChange={handleChange} />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="paymentOffer">
              Payment Offer (ETH)
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="paymentOffer" type="text" placeholder="0.0" name="paymentOffer" value={form.paymentOffer} onChange={handleChange} />
          </div>
        </div>
        <div className="flex justify-center">
          <button className={`shadow ${isLoading ? 'bg-gray-500' : 'bg-pink-500 hover:bg-purple-600'} focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded`} type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Make Proposal'}
          </button>
        </div>
      </form>
      
    </div>
  );
};

export default ProposalFormComponent;
