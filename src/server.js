require('express-async-errors')
const express = require('express')
const app = express()
const AppError = require('./utils/AppError')
const router = require('./routes/authController')

app.use(express.json());
app.use('/auth', router)

app.use((error, req, res, next) => {
  if(error instanceof AppError) {
   return res.status(error.statusCode).json({
    status: 'error',
    message: error.message
   })
  }
   return res.status(500).json({
   status: 'error',
    message: 'Internal server error',
   })
  })

const PORT = 3000;
app.listen(PORT, () => console.log(`🌸 Server listening on PORT:${PORT}`));
