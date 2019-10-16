const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')
const { 
    userOne, 
    setupDatabase, 
    taskOne,
    taskTwo,
    taskThree,
    userTwo} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create new task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'demo task',
            completed: false
        })
        .expect(201)
    
    const task = await Task.findById(response.body._id)

    expect(task).not.toBeNull()
    expect(task.completed).toBe(false)
})

test('Should get all tasks of user authorization', async () => {
    const response = await request(app)
        .get('/tasks/')
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(200)
    expect(response.body.length).toEqual(2)
})

test('Should not delete other users tasks', async () => {
    const response = await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404)

    const task = await Task.findById(taskOne._id)
    expect(task).not.toBeNull()
})

test('Should update task', async () => {
    const response = await request(app)
        .patch(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            completed: true
        })
        .expect(200)
    expect(response.body.completed).toEqual(true)
})