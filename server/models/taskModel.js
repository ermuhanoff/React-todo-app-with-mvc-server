const { Schema, model } = require('mongoose');
const { valiationValues, validationMessages } = require('./constants.js');

const taskSchema = new Schema({
  name: {
    type: String,
    required: [
      true,
      validationMessages.task.name.required,
    ],
    minlength: [
      valiationValues.task.name.min,
      validationMessages.task.name.lengthMin,
    ],
    maxlength: [
      valiationValues.task.name.max,
      validationMessages.task.name.lengthMax,
    ],
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    default: null
  },
  description: {
    type: String,
    maxlength: [
      valiationValues.task.description.max,
      validationMessages.task.description.lengthMax,
    ],
  },
  isDone: {
    type: Boolean,
    default: false
  },
});

module.exports = {
  taskModel: new model('Task', taskSchema),
  taskSchema,
};

// const createTasks = (count, categoryId) => [...Array(parseInt(count, 10))]
//   .map((value, index) => ({
//     id: Date.now() + categoryId + index,
//     name: `Task #${index}`,
//     categoryId: categoryId,
//     description: `This is a task #${index} in category #${categoryId}`,
//     isDone: Math.random() > 0.5,
//   }));