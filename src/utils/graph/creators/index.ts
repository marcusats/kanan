import { GraphQLClient, gql } from 'graphql-request';


const GRAPHQL_ENDPOINT = `https://gateway-arbitrum.network.thegraph.com/api/${process.env.NEXT_PUBLIC_GRAPH_KEY}/subgraphs/id/DHp1g38LR9rKJ5Sx4BCWYUWpNyUT3teBKa6HbbWNwugD` || "http://localhost:4000";

async function isCreator(creatorId: string): Promise<boolean> {
  const query = gql`
  {
    creators( where: {id: "${creatorId}"}) {
      id
    }
  }
  `;

  const graphQLClient = new GraphQLClient(GRAPHQL_ENDPOINT, {
    fetch,
    cache: "no-store",
  });

  try {
    const response: any = await graphQLClient.request(query);
    console.log("GraphQL query response:", response);
    return response.creators.length > 0;
  } catch (error) {
    console.log("GraphQL query error:", error);
    return false; 
  }
}

async function getPendingProposals(creatorId: string): Promise<any[]> {
    const queryPending = gql`
        {
        adContents(where: {status: Pending, targetCreator: "${creatorId}"}) {
          content
          id
          company
        }
      }
    `;
  
    const graphQLClient = new GraphQLClient(GRAPHQL_ENDPOINT, {
        fetch,
        cache: "no-store",
    });
  
    try {
      const response: any = await graphQLClient.request(queryPending);

      console.log("GraphQL query response (Pending):", response);
      return response.adContents.reverse(); // Reverse the array to get the latest one on top
    } catch (error) {
      console.error("GraphQL query error (Pending):", error);
      return []; // Return an empty array if there's an error
    }
}

async function getPost(creatorId: string): Promise<any[]> {
    const queryPending = gql`
        {
        adContents(where: { targetCreator: "${creatorId}"}) {
          content
          id
          company
        }
      }
    `;
  
    const graphQLClient = new GraphQLClient(GRAPHQL_ENDPOINT, {
        fetch,
        cache: "no-store",
    });
  
    try {
      const response: any = await graphQLClient.request(queryPending);

      console.log("GraphQL query response (Pending):", response);


      const parsedAdContents = response.adContents.map((adContent: { content: string; [key: string]: any }) => ({
        ...adContent,
        content: JSON.parse(adContent.content),
      })).reverse();

      return parsedAdContents[0]; 
    } catch (error) {
      console.error("GraphQL query error (Pending):", error);
      return []; 
    
    }
}


async function getApprovedProposals(creatorId: string): Promise<any[]> {
    const queryApproved = gql`
      {
        proposals(where: {status: "Approved", targetCreator: "${creatorId}"}) {
          id
          adContent {
            content
          }
        }
      }
    `;
  
    const graphQLClient = new GraphQLClient(GRAPHQL_ENDPOINT, {
        fetch,
        cache: "no-store",
    });
  
    try {
      const response:any = await graphQLClient.request(queryApproved);
      console.log("GraphQL query response (Approved):", response);
      return response.proposals;
    } catch (error) {
      console.error("GraphQL query error (Approved):", error);
      return []; // Return an empty array if there's an error
    }
}

async function getCreators(): Promise<any[]> {
    const query = gql`
      {
        creators {
          id
          reputation
        }
      }
    `;
  
    const graphQLClient = new GraphQLClient(GRAPHQL_ENDPOINT, {
        fetch,
        cache: "no-store",
    });
  
    try {
      const response:any = await graphQLClient.request(query);
      console.log("GraphQL query response:", response);
      return response.creators;
    } catch (error) {
      console.error("GraphQL query error:", error);
      return []; 
    }
}



export { 
    isCreator, 
    getPendingProposals, 
    getApprovedProposals,
    getCreators,
    getPost
};

