const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = express.Router()

router.post('/', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(500).send(e)
    }
})

// GET /tasks/
// Get /tasks?limit=3&skip=0
// Get /tasks?sortBy=createdAt:desc

router.get('/', auth, async (req, res) => {
    const match = {}
    const sort = {}

    if (req.query.completed) {
        match.completed = req.query.completed === "true"
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(":")
        sort[parts[0]] = parts[1] === "desc" ? -1 : 1
    }

    try {
        // const tasks = await Task.find({ owner: req.user._id })
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()        
        res.status(200).send(req.user.tasks)
    } catch (error) {
        res.status(400).send(e)
    }
})

router.get('/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findOne({ _id, owner: req.user._id })
        res.status(200).send(task)
    } catch (error) {
        res.status(500).send(e)
    }
})

router.patch('/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["completed", "desciption"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!'})
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id})
        
        if (!task) {
            return res.status(404).send({ error: 'Can not found!'})
        }

        updates.forEach((update)=> task[update] = req.body[update])
        
        await task.save()

        res.send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        // const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }       

        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router