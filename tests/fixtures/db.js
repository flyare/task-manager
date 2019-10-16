const mongosee = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')

const userOneId = new mongosee.Types.ObjectId

const userOne = {
    _id: userOneId,
    name: 'vanvu',
    email: 'vanvu@gmail.com',
    password: 'Mypass1111!',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_KEY)
    }]
}

const userTwoId = new mongosee.Types.ObjectId

const userTwo = {
    _id: userTwoId,
    name: 'jest',
    email: 'jest@gmail.com',
    password: 'Mypass1111!',
    tokens: [{
        token: jwt.sign({ _id: userTwoId }, process.env.JWT_KEY)
    }]
}

const taskOne = {
    _id: new mongosee.Types.ObjectId,
    description: 'First Task',
    completed: false,
    owner: userOne._id
}

const taskTwo = {
    _id: new mongosee.Types.ObjectId,
    description: 'Second Task',
    completed: false,
    owner: userTwo._id
}

const taskThree = {
    _id: new mongosee.Types.ObjectId,
    description: 'Three Task',
    completed: true,
    owner: userTwo._id
}

const setupDatabase = async () => {
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}

module.exports = {
    setupDatabase,
    userOneId,
    userTwoId,
    userOne,
    userTwo,
    taskOne,
    taskTwo,
    taskThree
}