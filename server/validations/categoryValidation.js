const joi = require('joi');
const mongoose = require('mongoose');

const objectId = joi.string().custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.message('Invalid ObjectId');
  }
  return value;
}, 'ObjectId Validation');

const createCategorySchema = {
  body: joi.object().keys({
    name: joi.string().required(),
    nameAr: joi.string().required(),
  }),
};

const updateCategorySchema = {
  params: joi.object().keys({
    id: objectId.required(),
  }),
  body: joi.object().keys({
    name: joi.string().optional(),
    nameAr: joi.string().optional(),
  }),
};

const deleteCategorySchema = {
  params: joi.object().keys({
    id: objectId.required(),
  }),
  body: joi.object().keys({
    pass: joi.string().required(),
  }),
};

module.exports = {
  createCategorySchema,
  updateCategorySchema,
  deleteCategorySchema,
};
