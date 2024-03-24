# Kanan: A Tool for Effortless Frame Ads Creation and leverage conent creators.
 Kanan, the forefront of advertising innovation, designed to empower sponsors with a seamless, no-code solution for crafting compelling Frame Ads. This application is a testament to the power of modern web technologies, combining the strengths of the Pinata Farcaster API, The Graph, IPFS, and the Base Network to revolutionize the way advertising is managed within Farcaster.


## Features
- **No-Code Proposal Creation**: Utilize the Pinata Farcaster API to effortlessly create ad frames within a user-friendly interface, making advertising frames accessible to all.
- **Smart Contract Integration**: Leverage The Graph for decentralized information management, ensuring that proposal data is seamlessly encoded into smart contracts and stored with transparency on IPFS.
- **Real-Time Data Display**: Dynamically display proposal details on the frontend, offering users immediate access to the information they need, when they need it.
- **Cost-Effective Operations**: Benefit from the efficiency of the Base Network for submitting frames, optimizing operational costs without compromising on performance.


## Getting Started
To get started with Kanan, follow these simple steps:
1. **Set up the Development Environment**:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

2. **Run the Development Server**:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

3. **Access the Application**: Open your browser and navigate to `http://localhost:3000` to access the Kanan application.

## Accessing Frame Ads
To view an active advertisement post under a specific creator, use the following endpoint by passing the creator's wallet ID as a parameter:
```bash
http://localhost:3000/api/frame?id=<creator_wallet_id>
```
Replace `<creator_wallet_id>` with the actual wallet ID of the creator whose advertisement post you wish to view. This feature allows you to directly access and display the advertisement frames associated with a particular creator, showcasing the dynamic capabilities of Kanan in real-time advertisement management.

### Local Frame Testing
For local testing of frame ads, you can utilize the FrameGear tool available in the OnChainKit repository. FrameGear provides a convenient way to simulate and test frame ads locally before deploying them to a live environment. This tool can be particularly useful for developers looking to ensure the integrity and functionality of their frame ads within the Kanan ecosystem.

To get started with FrameGear for local frame testing, visit the OnChainKit repository on GitHub:

[@coinbase/onchainkit/tree/main/framegear](https://github.com/coinbase/onchainkit/tree/main/framegear)


Follow the instructions provided in the repository to set up and use FrameGear for your local development needs. This will allow you to preview and debug your frame ads in a controlled environment, ensuring they perform as expected when deployed.

## Editing and Contribution
To contribute to Kanan or customize it for your needs:

- For detailed customization, refer to the documentation of the integrated technologies:

  - [Pinata Farcaster API](https://pinata.cloud/documentation#Farcaster)
  - [The Graph](https://thegraph.com/docs/en/)
  - [IPFS](https://docs.ipfs.io/)
  - [Base Network](https://basenetwork.org/)
  - [Viem](https://viem.sh/)


## Acknowledgments
This project was developed as part of the EthGlobal Frameworks Hackathon, showcasing the potential of combining cutting-edge technologies to create innovative solutions in the advertising domain.