const { categoryModel } = require('../models/categoryModel.js');
const { taskModel } = require('../models/taskModel.js');
const BaseError = require('../errors/BaseError');
class CategoryService {
  constructor() {
    this.updateOptions = { runValidators: true };
  }

  getAllCategories() {
    return categoryModel.find().sort('name');
  }
  
  async getCategoryById(categoryId) {
    const foundCategory = await categoryModel.findOne({ id: categoryId });

    if (!foundCategory) {
      throw BaseError.createNotFountError();
    }

    return foundCategory;
  }
  
  async removeCategoryById(categoryId) {
    const deletedCategoryMeta = await categoryModel.deleteOne({ _id: categoryId });

    await taskModel.deleteMany({ categoryId: categoryId });

    if (deletedCategoryMeta.deletedCount === 0) {
      throw BaseError.createNotFountError();
    }
  }
  
  async updateCategoryById(categoryId, categoryData) {
    const updatedMeta = await categoryModel.updateOne({ _id: categoryId }, categoryData, this.updateOptions);

    if (updatedMeta.modifiedCount === 0) {
      throw BaseError.createNotFountError();
    }
  }
  
  addCategory(categoryData) {
    return categoryModel.create(categoryData);
  }
}

module.exports = new CategoryService();
