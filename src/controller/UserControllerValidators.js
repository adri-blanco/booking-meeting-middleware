import Joi from '@hapi/joi';

export default {
  get: Joi.object({
    id: Joi.string().required(),
  }),
}