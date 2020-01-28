import Joi from 'joi';

export default {
  get: {
    id: Joi.string().required(),
  },
}