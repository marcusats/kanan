import { ConnectButton } from '@rainbow-me/rainbowkit';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-gray-700 to-gray-900 text-white p-4 flex justify-between items-center">
        <a href='https://github.com' className="hover:underline">GitHub</a>
      <ConnectButton showBalance={false}  />
    </nav>
  );
};

export default Navbar;

