const dotenv = require('dotenv').config(); //Libreria para acceder a las variables del .env
const { GraphQLServer } = require('graphql-yoga');
const { importSchema } = require('graphql-import');
const typeDefs = importSchema('./src/schema.graphql');//Definimos constantes necesarias para GraphQL
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

const { getAllReports, reporteByCat } = require('./resolvers/Querys');
const { createReport, createUsers } = require('./resolvers/Mutations');

const resolvers = {
  Query: {
    getAllReports,
    reporteByCat
  },
  Mutation: {
    createReport,
    createUsers
  }
};

//Variable constante para el server de GraphQL
const server = new GraphQLServer({ typeDefs, resolvers })
server.start(() => console.log('Server is running on localhost:4000'))

