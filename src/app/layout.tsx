
'use client'


import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
 
  base,
  baseSepolia,
  baseGoerli
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import Navbar from '@/components/Navbar';
import "./globals.css";
import '@rainbow-me/rainbowkit/styles.css';




const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [ base,baseSepolia, baseGoerli],
  ssr: false, // If your dApp uses server side rendering (SSR)
});
const queryClient = new QueryClient();


export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
    
    <body>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
          
              {children}
            </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </body>
          
    </html>
  );
}