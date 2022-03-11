const express = require('express');

const taskRouter = require('./taskRouter.js');
const categoryController = require('../controllers/categoryCantroller.js');
const authorize = require('../middlewares/authorize.js');

const categoryRouter = express.Router();

categoryRouter.use('/categories', authorize);
categoryRouter.use('/categories', taskRouter);
categoryRouter.put('/categories/:categoryId', categoryController.updateCategoryById);
categoryRouter.delete('/categories/:categoryId', categoryController.removeCategoryById);
categoryRouter.get('/categories', categoryController.getAllCategories);
categoryRouter.post('/categories', categoryController.addCategory);


module.exports = categoryRouter;
