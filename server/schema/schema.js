// const { projects, clients } = require('../sampleData');
import { projects, clients } from '../sampleData.js';
// console.log(clients)
// const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema } = require('graphql');
import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType } from 'graphql';

import Client from '../models/Client.js';
import Project from '../models/project.js';

// client Type
const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString }
  })
});

//project Type
const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve: (parent, args) => {
        console.log(parent)
        // return clients.find(client => client.id === parent.clientId)
        return Client.findById(parent.clientId)
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    clients: {
      type: new GraphQLList(ClientType),
      resolve: (parent, args) => {
        // return clients;
        return Client.find();
      }
    },
    client: {
      type: ClientType,
      args: {
        id: {
          type: GraphQLID
        },
      },
      resolve: (parent, args) => {
        console.log(args);
        // return clients.find(client => client.id === args.id);
        return Client.findById(args.id);
      }
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve: (parent, args) => {
        console.log(parent);
        console.log(args);
        // return projects;
        return Project.find();
      }
    },
    project: {
      type: ProjectType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve: (parent, args) => {
        // return projects.find(project => project.id === args.id);
        return Project.findById(args.id);
      }
    }
  }
});




// module.exports = new GraphQLSchema({
//   query: RootQuery
// })

// Mutations
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addClient: {
      type: ClientType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        phone: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (parent, args) => {
        const client = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone
        })

        return client.save();
      }
    },
    deleteClient: {
      type: ClientType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve: (_, { id }) => {
        return Client.findByIdAndRemove(id);
      }
    },
    addProject: {
      type: ProjectType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: 'ProjectStatus',
            values: {
              new: { value: 'Not Started' },
              progress: { value: 'In Progress' },
              completed: { value: 'Completed' }
            }
          }),
          defaultValue: 'Not Started'
        },
        clientId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve: (_, {name, description, status, clientId}) => {
        const project = new Project({
          name,
          description,
          status,
          clientId
        })
        return project.save();
      }
    },
    deleteProject:  {
      type: ProjectType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve: (root, args) => {
        return Project.findByIdAndRemove(args.id);
      }
    },
    updateProject: {
      type: ProjectType,
      args: {
          id: { type: new GraphQLNonNull(GraphQLID) },
          name: { type: new GraphQLNonNull(GraphQLString) },
          description: { type: new GraphQLNonNull(GraphQLString) },
          status: {
            type: new GraphQLEnumType({
              name: 'ProjectStatusUpdate',
              values: {
                new: { value: 'Not Started' },
                progress: { value: 'In Progress' },
                completed: { value: 'Completed' }
              }
            })
          }
      },
      resolve: (root, args) => {
        return Project.findByIdAndUpdate(args.id, {
          $set: {
            name: args.name,
            description: args.description,
            status: args.status
          },
        },
        {
          new: true
        }
        )
      }
    }
  }
})



const schema = new GraphQLSchema({
  query: RootQuery,
  mutation
})


export default schema;

