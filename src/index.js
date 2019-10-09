const express = require('express')
require('./db/mongoose')
const hbs = require('hbs')

const userRouter = require('./rounters/user')
const taskRouter = require('./rounters/task')
const uiRouter = require('./rounters/ui')

const app = express()

const port = process.env.PORT

console.log(process.env.SG_API_KEY)
console.log("JWT_KEY ",process.env.JWT_KEY)

const multer = require('multer')
const upload = multer({
    dest: 'images'
})

app.post('/upload', upload.single('avatar'), (req, res) => {
    res.send()
})

app.use(express.json())

app.use('/', uiRouter)
app.use('/users', userRouter)
app.use('/tasks', taskRouter)

app.listen(port, () => {
    console.log('Server online on port', port)
})