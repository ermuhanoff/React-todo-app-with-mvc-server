const valiationValues = {
  category: {
    name: {
      min: 3,
      max: 30, 
    },
  },

  task: {
    name: {
      min: 3,
      max: 50,
    },
    description: {
      max: 250,
    }
  },
};

const validationMessages = {
  category: {
    name: {
      required: 'Category name is required',
      lengthMax: `Category name length must be no more than ${valiationValues.category.name.max} characters`,
      lengthMin: `Category name length must be more than ${valiationValues.category.name.min} characters`,
    },
  },

  task: {
    name: {
      required: 'Task name is required',
      lengthMax: `Task name length must be no more ${valiationValues.task.name.max} characters`,
      lengthMin: `Task name length must be more ${valiationValues.task.name.min} characters`,
    },
    description: {
      lengthMax: `Task description length must be no more than ${valiationValues.task.description.max} characters`,
    }
  },
};

module.exports = {
  valiationValues,
  validationMessages,
};
