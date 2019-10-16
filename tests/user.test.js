const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { userOneId, userOne, setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)

test("Should add new user", async () => {
    const response = await request(app).post('/users/').send({
        name: "ducphan",
        email: "flyare@gmail.com",
        password: "hd1234567!"
    }).expect(201)

    const userRes = response.body.user

    const user = await User.findById(userRes._id)
    expect(user).not.toBeNull()

    expect(userRes.name).toBe('ducphan')
    expect(userRes.email).toBe('flyare@gmail.com')

    expect(userRes).toMatchObject({
        name: "ducphan",
        email: "flyare@gmail.com"
    })

    expect(userRes.password).not.toBe('hd1234567!')
})

test("Should login a user existing", async () => {
    const response = await request(app).post("/users/login").send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(userOneId)

    expect(response.body.token).toBe(user.tokens[1].token)
})

test("Should login fail with User not exist", async () => {
    await request(app).post("/users/login").send({
        email: "usernotexist@gmail.com",
        password: "usernotexist"
    }).expect(400)
})

test("Should get profile user", async () => {
    await request(app)
        .get("/users/me")
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test("Should cant get profile user without token", async () => {
    await request(app)
        .get("/users/me")
        .send()
        .expect(401)
})

test("Should delete account for user", async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test("Should can not delete account for user unauthorization", async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('Should upload avatar user', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/banner-1920.jpg')
        .expect(200)
    const user = await User.findById(userOneId)

    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'Phan Hoang Duc',
            age: 50,
            email: 'phanhoangduc@gmail.com'
        })
        .expect(200)

    const user = await User.findById(userOneId)

    expect(user).toMatchObject({
        name: 'Phan Hoang Duc',
        age: 50,
        email: 'phanhoangduc@gmail.com'
    })
})

test('Should can not update invalid user filed', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: '',
            age: "dad",
            email: 'phanhoangducgmail.com'
        })
        .expect(400)
})

test('Should can not update user unauthorization', async () => {
    await request(app)
        .patch('/users/me')        
        .send({
            name: '',
            age: "dad",
            email: 'phanhoangducgmail.com'
        })
        .expect(401)
})