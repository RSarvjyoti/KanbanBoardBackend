const taskModel = require('../models/taskModel');

//  new task
const createTask = async (req, res) => {
    const { title, description, dueDate, status, createdBy } = req.body;

    const task = new taskModel({
        title,
        description,
        dueDate,
        status: status || 'todo', 
        createdBy
    });

    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// pagination
const getTask = async (req, res) => {
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10; 

    try {
        const tasks = await taskModel.find()
            .skip((page - 1) * limit) 
            .limit(limit); 

        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update an existing task
const updateTask = async (req, res) => {
    const { title, description, dueDate, status, createdBy } = req.body;

    try {
        const task = await taskModel.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Update task fields
        task.title = title;
        task.description = description;
        task.dueDate = dueDate;
        task.status = status || task.status; 
        task.createdBy = createdBy || task.createdBy; 

        const updatedTask = await task.save();
        res.json(updatedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a task by ID
const deleteTask = async (req, res) => {
    try {
        const task = await taskModel.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await task.remove();
        res.json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { createTask, getTask, updateTask, deleteTask };
