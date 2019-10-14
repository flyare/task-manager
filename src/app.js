const express = require('express')
require('./db/mongoose')
const hbs = require('hbs')

const userRouter = require('./rounters/user')
const taskRouter = require('./rounters/task')
const uiRouter = require('./rounters/ui')

const app = express()

app.use(express.json())

app.use('/', uiRouter)
app.use('/users', userRouter)
app.use('/tasks', taskRouter)

module.exports = app