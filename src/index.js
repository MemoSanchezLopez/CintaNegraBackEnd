dotenv = require('dotenv').config(); //Libreria para acceder a las variables del .env
const { GraphQLServer } = require('graphql-yoga');
const { importSchema } = require('graphql-import');
const { makeExecutableSchema } = require('graphql-tools')
const typeDefs = importSchema('./src/schema.graphql');//Definimos constantes necesarias para GraphQL
const { AuthDirective } = require('./resolvers/directive');
const verifyToken = require('./utils/verifyToken');
const mongoose = require('mongoose'); //Paquete para MongoDB connector

/**
 * Conexion a mondo-db
 */
mongoose.connect(process.env.MONGOURI,
    {useNewUrlParser: true}, (err) => {
        if(!err){
            console.log('Conectado a Mongo exitosamente');
        }
        else{
            console.log('Error al conectar: ' + err);
        }
    }
);

const { getAllReports, reporteByCat, reporteById, userByEmail, userById } = require('./resolvers/Querys');
const { createReport, createUsers, login } = require('./resolvers/Mutations');

const resolvers = {
  Query: {
    getAllReports,
    reporteByCat,
    reporteById,
    userByEmail,
    userById
  },
  Mutation: {
    createReport,
    createUsers,
    login
  }
};


const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  schemaDirectives: {
      auth: AuthDirective
  }
})

//Variable constante para el server de GraphQL
const server = new GraphQLServer({ 
  schema,
  context: async({request}) => verifyToken(request)
})
server.start(() => console.log('Server is running on localhost:4000'))

