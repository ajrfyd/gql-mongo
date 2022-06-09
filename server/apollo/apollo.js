import { gql } from 'apollo-server';
import { clients, projects } from '../sampleData.js';
import Client from '../models/Client.js';
import Project from '../models/project.js';


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
    clientId: String!
    name: String!
    description: String!
    status: String!
  }
  
  type Mutation {
    addClient(name: String!, email: String!, phone: String!): Client!
    addProject(name: String!, description: String!, status: String!, clientId: String!): Project!
    deleteProject(id: ID!): Project!
  }
`

export const resolvers = {
  Query: {
    client: (root, args) => {
      // return clients.find(client => client.id === args.id);
      return Client.findById(args.id);
    },
    clients: () => {
      // return clients;
      return Client.find();
    },
    project: (root, args) => {
      return projects.find(project => project.id === args.id);
    },
    projects: () => {
      // return projects;
      return Project.find();
    }
  },
  Mutation: {
    addClient: (_, { name, email, phone }) => {
      const client = new Client({
        name,
        email,
        phone
      })
      return client.save();
    },
    addProject: (_, { name, description, status, clientId, }) => {
      const project = new Project({
        name,
        description,
        status,
        clientId
      })
      return project.save();
    },
    deleteProject: (_, { id }) => {
      return Project.findByIdAndRemove(id);
    }
  }
}