const {Schema, model} = require('mongoose')

const schema = new Schema({
    name : {type: String, required: true},
    lastName: {type: String, required: true},
    dateOfBirth: {type: String, required: true},
    password: {type: String, required: true}
})

module.exports = model('User', schema)