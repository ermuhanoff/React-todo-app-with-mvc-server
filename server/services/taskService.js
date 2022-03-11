const { taskModel } = require('../models/taskModel.js');
const { categoryModel } = require('../models/categoryModel.js');
const BaseError = require('../errors/BaseError');
class TaskService {
  constructor() {
    this.updateOptions = { runValidators: true };
  }

  async getAllTasks(categoryId) {
    console.log(categoryId);
    const foundCategory = await categoryModel.findOne({ _id: categoryId });

    if (!foundCategory) {
      throw BaseError.createNotFountError();
    }

    return taskModel.find({ categoryId });
  }
  
  async getTaskById(taskId, categoryId) {
    const foundCategory = await categoryModel.findOne({ _id: categoryId });

    if (!foundCategory) {
      throw BaseError.createNotFountError();
    }

    const foundTask = await taskModel.findOne({ _id: taskId });

    if (!foundTask) {
      throw BaseError.createNotFountError();
    }

    return foundTask;
  }

  async removeTaskById(taskId) {
    const deletedMeta = await taskModel.deleteOne({ _id: taskId });

    if (deletedMeta.deletedCount === 0) {
      throw BaseError.createNotFountError();
    }
  }

  async updateTask(taskId, taskData) {
    const updatedMeta = await taskModel.updateOne({ _id: taskId }, taskData, this.updateOptions);

    if (updatedMeta.modifiedCount === 0) {
      throw BaseError.createNotFountError();
    }
  }

  async addTask(taskData, categoryId) {
    const foundCategory = await categoryModel.findOne({ _id: categoryId });

    if (!foundCategory) {
      throw BaseError.createNotFountError();
    }

    return taskModel.create(taskData);
  }
}

module.exports = new TaskService();
