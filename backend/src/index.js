const { prisma } = require('./generated/prisma-client')
const { GraphQLServer } = require('graphql-yoga')

const Binding = require('prisma-binding')

const resolvers = require('./resolvers')

const server = new GraphQLServer({
  typeDefs: `${__dirname}/schema.graphql`,
  resolvers,
  context: request => ({
    ...request,
    db: new Binding.Prisma({
      typeDefs: `${__dirname}/generated/graphql-schema/prisma.graphql`,
      endpoint: process.env.PRISMA_ENDPOINT
    }),
    prisma
  })
})

server.start().then(() => console.log("🚀 Running @ 4000"))