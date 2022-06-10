import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          clients: {
            merge(existing, incoming) {
              // console.log(existing);
              // console.log(incoming);
              return incoming;
            }
          },
          projects: {
            merge(exsisting, incoming) {
              return incoming;
            }
          }
        }
      }
    }
  }),
});

export default client;