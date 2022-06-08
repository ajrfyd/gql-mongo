import { gql } from 'apollo-server';
import { clients, projects } from '../sampleData.js';

export const typeDefs = gql`
  type Query {
    client(id: ID!): Client
    clients: [Client!]!
    project(id: ID!): Project
    projects: [Project!]!
  }

  type Client {
    id: ID!
    name: String!
    email: String!
    phone: String!
  }

  type Project {
    id: ID!
    clientId: Int!
    name: String!
    description: String!
    status: String!
  }
  
  type Mutation {
    addClient(name: String!, email: String!, phone: String!): Client!
  }
`

export const resolvers = {
  Query: {
    client: (root, args) => {
      return clients.find(client => client.id === args.id);
    },
    clients: () => {
      return clients;
    },
    project: (root, args) => {
      return projects.find(project => project.id === args.id);
    },
    projects: () => {
      return projects;
    }
  }
}