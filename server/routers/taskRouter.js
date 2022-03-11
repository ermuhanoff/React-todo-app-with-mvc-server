const express = require('express');

const taskRouter = express.Router();
const taskController = require('../controllers/taskController.js');

taskRouter.get('/:categoryId/tasks/:taskId', taskController.getTaskById);
taskRouter.put('/:categoryId/tasks/:taskId', taskController.updateTaskById);
taskRouter.delete('/:categoryId/tasks/:taskId', taskController.removeTaskById);
taskRouter.get('/:categoryId/tasks', taskController.getAllTasks);
taskRouter.post('/:categoryId/tasks', taskController.addTask);

module.exports = taskRouter;
