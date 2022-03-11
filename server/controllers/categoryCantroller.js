const { messages } = require('../responses/constants.js');
const categoryService = require('../services/categoryService.js');

class CategoryController {
  async getAllCategories(req, res) {
    res.sendSuccess(await categoryService.getAllCategories());
  }

  async getCategoryById(req, res) {
    res.sendSuccess(
      await categoryService.getCategoryById(req.params.categoryId)
    );
  }

  async addCategory(req, res) {
    res.sendSuccess(
      await categoryService.addCategory(req.body),
      messages.CATEGORY_CREATED
    );
  }

  async updateCategoryById(req, res) {
    res.sendSuccess(
      await categoryService.updateCategoryById(req.params.categoryId, req.body),
      messages.CATEGORY_UPDATED
    );
  }

  async removeCategoryById(req, res) {
    res.sendSuccess(
      await categoryService.removeCategoryById(req.params.categoryId),
      messages.CATEGORY_REMOVED
    );
  }
}

module.exports = new CategoryController();