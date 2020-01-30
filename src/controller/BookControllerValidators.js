import Joi from 'joi';

export default {
  create: {
    user: Joi.string().required(),
    name: Joi.string(),
    room: Joi.number().required(),
    startTime: Joi.date().iso().required(),
    endTime: Joi.date().iso().required(),
  },
  update: {
    bookingId: Joi.number().required(),
    room: Joi.number().required(),
    startTime: Joi.date().iso().required(),
    endTime: Joi.date().iso().required(),    
  }
}