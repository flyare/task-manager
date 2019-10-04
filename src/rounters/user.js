const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()

        const token = await user.generateAuthToken()

        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findByEmail(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/logoutall', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/me', auth, async (req, res) => {
    try {        
        res.send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/page/:page/:psize', auth, async (req, res) => {
    const page = req.params.page
    const psize = parseInt(req.params.psize)

    try {
        const users = await User.find({}).skip((page - 1) * psize).limit(psize)
        const count = await User.countDocuments()
        res.status(200).send({ users, page, psize, count })
    } catch (error) {
        res.status(500).send(error)
    }
})

router.patch('/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["name", "email", "password", "age"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])

        await req.user.save()       

        res.send(req.user)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/me', auth, async (req, res) => {
    try {
        await req.user.remove()        
        res.send(req.user)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router