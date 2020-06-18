import Joi from '@hapi/joi';

export default {
  create: Joi.object({
    user: Joi.string().required(),
    name: Joi.string(),
    room: Joi.number().required(),
    startTime: Joi.date().iso().required(),
    endTime: Joi.date().iso().required(),
  }),
  update: Joi.object({
    bookingId: Joi.number().required(),
    room: Joi.number().required(),
    startTime: Joi.date().iso().required(),
    endTime: Joi.date().iso().required(),    
  })
}