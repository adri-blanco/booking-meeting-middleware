import Joi from 'joi';

export default {
  get: {
    id: Joi.string().required(),
  },
  create: {
    type: Joi.string().required(),
  },
}