require('../src/db/mongoose')
const Task = require('../src/models/task')

//5d8ad293a4b5c61c70fd838a

// Task.findByIdAndDelete('5d8ad2b7a4b5c61c70fd838c').then((task) => {
//     console.log(task)
//     return Task.countDocuments({ completed: false })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {

// })

const deleteById = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false })
    return count
}

deleteById("5d8b3cc32c56f497d3016ff3").then(() => {
    console.log("okie")
}).catch((e) => {
    console.log(e)
})