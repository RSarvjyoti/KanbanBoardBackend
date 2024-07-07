const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');

const taskSchema = new Schema({
    title : { type : String, required : true },
    description : { type : String, required : true },
    dueDate : { type : Date , required : true },
    status : { type : String, enum : ['todo', 'inprogress', 'done'] , default : 'todo'},
    createdBy : { type: mongoose.Schema.Types.ObjectId, ref : 'user', required : true },
    createdAt : { type : Date, default : Date.now }
})

const taskModel = model('tasks', taskSchema);

module.exports = taskModel;