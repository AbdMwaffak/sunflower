const joi = require('joi');
const mongoose = require('mongoose');

const objectId = joi.string().custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.message('Invalid ObjectId');
  }
  return value;
}, 'ObjectId Validation');

const createArticleSchema = {
  body: joi.object().keys({
    description: joi.string(),
    descriptionAr: joi.string(),
  }),
};

const updateArticleSchema = {
  params: joi.object().keys({
    id: objectId.required(),
  }),
  body: joi.object().keys({
    description: joi.string().optional(),
    descriptionAr: joi.string().optional(),
  }),
};

const deleteArticleSchema = {
  params: joi.object().keys({
    id: objectId.required(),
  }),
  body: joi.object().keys({
    pass: joi.string().required(),
  }),
};

const likeArticleSchema = {
  params: joi.object().keys({
    id: objectId.required(),
  }),
};
module.exports = {
  createArticleSchema,
  updateArticleSchema,
  deleteArticleSchema,
  likeArticleSchema,
};
