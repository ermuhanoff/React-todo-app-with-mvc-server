const { messages } = require('../responses/constants.js');
const taskService = require('../services/taskService.js');

class TaskController {
  async getAllTasks(req, res) {
    res.sendSuccess(await taskService.getAllTasks(req.params.categoryId));
  }

  async getTaskById(req, res) {
    res.sendSuccess(await taskService.getTaskById(req.params.taskId, req.params.categoryId));
  }

  async updateTaskById(req, res) {
    res.sendSuccess(
      await taskService.updateTask(req.params.taskId, req.body),
      messages.TASK_UPDATED
    );
  }

  async removeTaskById(req, res) {
    res.sendSuccess(
      await taskService.removeTaskById(req.params.taskId),
      messages.TASK_REMOVED
    );
  }

  async addTask(req, res) {
    res.sendSuccess(await taskService.addTask(req.body, req.params.categoryId), messages.TASK_CREATED);
  }
}

module.exports = new TaskController();
