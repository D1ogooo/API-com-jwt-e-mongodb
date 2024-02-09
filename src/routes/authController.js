const express = require('express')
const { hash, compare } = require('bcryptjs')
const User = require('../models/model');
const jwt = require('jsonwebtoken')
const router = express.Router();
const AppError = require('../utils/AppError')

router.post('/signup', async (req, res) => {
 const { username, email, password, confirmPassword } = req.body
 
 if(!username || !email || !password || !confirmPassword) {
  throw new AppError("Todos os campos devem ser preenchidos.")
 }

 if(password !== confirmPassword) {
  throw new AppError("As senhas declaradas não coincidem")
 }
 
 const checkUserExists = await User.findOne({ email: email })

 if(checkUserExists) {
  throw new AppError("O email declarado já existe.")
 }

 try {
  const encryptedPassword = await hash(password, 8)
  const encryptedConfirmPassword = await hash(confirmPassword, 8)
  const createUser = await User.create({ username, email, password: encryptedPassword , confirmPassword: encryptedConfirmPassword})
  res.status(200).send(createUser)
 } catch {
  throw new AppError("Ocorreu um erro interno")
 }
})

router.post('/signin', async (req, res) => {
 const { username, email, password } = req.body;

 if(!username || !email || !password) {
  throw new AppError("Todos os campos devem ser preenchidos.")
 }
 
 const checkUserExists = await User.findOne({email: email});
 if(!checkUserExists) {
  throw new AppError("Credenciais inválidas");
 }

 const validPassword = await compare(password, checkUserExists.password)

 if(!validPassword) {
  throw new AppError("Credenciais inválidas.");
 }

 const payload = {
  userId: checkUserExists._id,
  userName: checkUserExists.username,
  userEmail: checkUserExists.email,
 }

 const secretKey = `${process.env.JWT_SECRET_KEY}`
 const token = jwt.sign(payload, secretKey, { expiresIn: '2h'})
 try {
  res.status(200).json({
  status: 'success',
  token: token,
  })
 } catch(error) {
  throw new AppError(error);
 }
})

module.exports = router
