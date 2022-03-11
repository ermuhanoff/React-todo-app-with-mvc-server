const { Schema, model } = require('mongoose');
const { valiationValues, validationMessages } = require('./constants.js');

const categoryShema = new Schema({
  name: {
    type: String,
    required: [
      true,
      validationMessages.category.name.required,
    ],
    minlength: [
      valiationValues.category.name.min,
      validationMessages.category.name.lengthMin,
    ],
    maxlength: [
      valiationValues.category.name.max,
      validationMessages.category.name.lengthMax,
    ],
  },
  parentId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    default: null
  },
});

module.exports = {
  categoryModel: new model('Category', categoryShema),
  categoryShema,
};

// const createCategories = async (
//   count,
//   depth = 0,
//   depthDevider = 2,
//   prevIndex = 'root',
//   parentId = null
// ) => {
//   for (let i = 0; i < count; i++) {
//     const category = {
//       name: `Category ${prevIndex}-${i}`,
//       parentId,
//     };

//     const createdCategory = await m.create(category);

//     if (depth && count >= 1) {
//       await createCategories(
//         count / depthDevider,
//         depth - 1,
//         depthDevider,
//         `${prevIndex}-${i}`,
//         createdCategory._id,
//       );
//     }
//   }
// };

// createCategories(10, 2)
