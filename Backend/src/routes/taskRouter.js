const { Router } = require('express');
const { createTask, getTask, updateTask, deleteTask } = require('../controller/taskController');
const isAdmin = require('../middileware/taskValidation');

const taskRouter = Router();

taskRouter.post('/', createTask);
taskRouter.get('/', getTask);
taskRouter.put('/:id', isAdmin, updateTask);
taskRouter.delete('/:id', deleteTask);

module.exports = taskRouter;