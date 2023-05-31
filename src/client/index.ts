import { ApolloClient, InMemoryCache } from "@apollo/client";

// Initialize a GraphQL client
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://countries.trevorblades.com",
});

export default client;
