const dotenv = require('dotenv');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
dotenv.config();

main().catch(error => console.log(error));

async function main() {
  await mongoose.connect(`mongodb+srv://diiogomarsalcosta:${process.env.PASSWORD_USER}@cluster0.blhhruo.mongodb.net/?retryWrites=true&w=majority`)
  try {
    console.log("Conectado ao banco de dados")
  } catch (error) {
    console.log("Falha ao se conectar com o banco de dados")
  }
}


module.exports = mongoose