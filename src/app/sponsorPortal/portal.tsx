import React,{ useState, useEffect} from 'react';
import CreatorsComponent from './creators';
import RegisterSponsorComponent from './register';
import { isSponsor } from '@/utils/graph/company';

const mockAccountData = {
  name: "John Doe",
  address: "0xABC123XYZ456"
};



const mockCreators = [
  { address: "0xDEF456GHI789", reputation: 85 },
  { address: "0xJKL012MNO345", reputation: 92 },
  { address: "0xJKL012MNO345", reputation: 92 },
  { address: "0xJKL012MNO345", reputation: 92 },
  { address: "0xJKL012MNO345", reputation: 92 },
  { address: "0xJKL012MNO345", reputation: 92 },
];



const PortalComponent = ({ address }: { address: `0x${string}` }) => {


  const [registeredSponsor, setRegisteredSponsor] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkIsRegisteredSponsor = async () => {
        console.log('address', address.toLowerCase());
      const result = await isSponsor(address.toLowerCase());
      console.log('result', result);
      setRegisteredSponsor(result);
      setLoading(false);
    };

    checkIsRegisteredSponsor();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!registeredSponsor) {
    return <RegisterSponsorComponent />;
  }

  return (
    <div className="mb-8 p-7">
      <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-2">Welcome to the Sponsor portal!</h1>
      <div className="text-lg mb-8 mt-4">
        <p><strong>Wallet Address:</strong> {address}</p>
      </div>
      <div className="flex justify-center gap-8">
        <div className="w-3/4 p-6 border-2 border-pink-500 text-center rounded-lg">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-7">Sponsors</h2>
          <CreatorsComponent  />
        </div>
      </div>
    </div>
  );
};

export default PortalComponent;
