const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')

const userOne = {
    name: 'vanvu',
    email: 'vanvu@gmail.com',
    password: 'Mypass1111!'
}

beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()
})

test("Should signup a new user", async () => {
    await request(app).post("/users").send({
        name: 'phanhoangduc',
        email: 'flyare@gmail.com',
        password: 'Mypass1111!'
    }).expect(201)
})

test("Should login a user existing", async () => {
    await request(app).post("/login").send({
        email: 'vanvu@gmail.com',
        password: 'Mypass1111!'
    }).expect(200)
})