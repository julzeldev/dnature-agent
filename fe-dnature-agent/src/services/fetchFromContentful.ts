import { GraphQLClient } from "graphql-request";

// Define environment variables with TypeScript typings
const SPACE_ID = import.meta.env.VITE_CONTENTFUL_SPACE_ID as string;
const TOKEN_ACCESS = import.meta.env.VITE_CONTENTFUL_DELIVERY_API_KEY as string;

if (!SPACE_ID || !TOKEN_ACCESS) {
  throw new Error("Missing Contentful environment variables");
}

// Endpoint URL for Contentful GraphQL API
const endpoint = `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}`;

// Initialize the GraphQL client with headers
const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${TOKEN_ACCESS}`,
  },
});

// Define TypeScript types for query and variables
interface FetchFromContentfulVariables {
  [key: string]: unknown;
}

interface FetchFromContentful {
  <T>(query: string, variables?: FetchFromContentfulVariables): Promise<T>;
}

// Fetch function with TypeScript typing for the response
const fetchFromContentful: FetchFromContentful = async <T>(
  query: string,
  variables?: FetchFromContentfulVariables
) => {
  try {
    const data = await graphQLClient.request<T>(query, variables);
    return data;
  } catch (error) {
    console.error("Error fetching data from Contentful:", error);
    throw error;
  }
};

export { fetchFromContentful };
