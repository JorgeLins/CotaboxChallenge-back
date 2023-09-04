const { PrismaClient } = require('@prisma/client');
const express = require('express')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const app = express()
const port = 3001

const prisma = new PrismaClient()
const cors = require('cors');

app.use(cors({
  origin: '*'
}));
 
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

const userRouter = require('./routes/userRoutes.js')
const projectRouter = require('./routes/projectRoutes.js')
const participantRouter = require('./routes/participantRoutes.js')


app.use('/user', userRouter)
app.use('/project', projectRouter)
app.use('/participant', participantRouter)


app.listen(port, () => {

  console.log()
  console.log(`Iniciado na porta ${port}`)
})