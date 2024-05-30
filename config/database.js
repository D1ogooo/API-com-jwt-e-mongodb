const { MongoClient } = require("mongodb");
require('dotenv').config();

async function main() {
  try {
    const password = process.env.MONGODB_PASSWORD; // qualquer variavel de ambiente que você for botar
    const connectionString = `mongodb+srv://diiogomarsalcosta:${process.env.PASSWORD_USER}@cluster0.nayh0ez.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    const client = new MongoClient(connectionString);
    await client.connect()
    console.log("Conectado ao banco de dados")
  } catch (error) {
    console.log(error.stack);
  }
}



module.exports = main;
