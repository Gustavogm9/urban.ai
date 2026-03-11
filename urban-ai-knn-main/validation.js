// validation.js
const Joi = require("joi");

const propertySchema = Joi.object({
    id: Joi.number().integer().required(),
    lat: Joi.number().min(-90).max(90).required(),
    lng: Joi.number().min(-180).max(180).required(),
    metroDistance: Joi.number().min(0).required(),
    amenitiesCount: Joi.number().integer().min(0).required()
});

const eventSchema = Joi.object({
    name: Joi.string().min(1).required(),
    lat: Joi.number().min(-90).max(90).required(),
    lng: Joi.number().min(-180).max(180).required()
});

const pricingRequestSchema = Joi.object({
    property: propertySchema.required(),
    event: eventSchema.required(),
    basePrice: Joi.number().min(0).required()
});

function validatePricingRequest(req, res, next) {
    const { error } = pricingRequestSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            error: "Dados de entrada inválidos.",
            details: error.details.map(d => d.message)
        });
    }

    next();
}

module.exports = {
    validatePricingRequest
};
