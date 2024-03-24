import { GraphQLClient, gql } from 'graphql-request';


// const GRAPHQL_ENDPOINT = `https://gateway-testnet-arbitrum.network.thegraph.com/api/${process.env.NEXT_PUBLIC_GRAPH_KEY}/subgraphs/id/9GKpp7H8dUJJb8oazZhcrswqgjHSfKRYCuP1Lc9XZw4A` || "http://localhost:4000";
const GRAPHQL_ENDPOINT = "https://api.studio.thegraph.com/query/43248/kanan-subgraph/version/latest";
async function isSponsor(SponsorId: string): Promise<boolean> {
  const query = gql`
  {
    companies( where: {id: "${SponsorId}"}) {
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
    return response.companies.length > 0;
  } catch (error) {
    console.log("GraphQL query error:", error);
    return false; 
  }
}


export { isSponsor };

