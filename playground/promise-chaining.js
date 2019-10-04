require('../src/db/mongoose')
const User = require('../src/models/user')

// User.findByIdAndUpdate('5d89db945586373704c0052c', { age: 23 }).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 23 })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {

// })

const updateById = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count
}

updateById("5d89db945586373704c0052c", 46).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})