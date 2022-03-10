const Joi = require('joi');
module.exports = {
    validateParam: (schema, name) => {
        return (req, res, next) => {
            const result = schema.validate({ param: req['params'][name] });
            if (result.error) {
                return res.status(400).json(result.error)
            } else {
                if (!req.value)
                    req.value = {};
                if (!req.value['params'])
                    req.value['params'] = {};
                req.value['params'][name] = result.value.param;
                next();
            }
        }
    },

    validateBody: (schema) => {
        return(req,res,next) => {
            const result = schema.validate(req.body);
            if (result.error){
                return res.status(400).json(result.error)
            } else {
                if (!req.value)
                    req.value = {};
                if (!req.value['body'])
                    req.value['body'] = {};
                req.value['body'] = result.value;
                next();
            }
        }
    },

    schemas: {
        categorySchema: Joi.object().keys({
            name: Joi.string().required()
        }),

        categoryProductSchema: Joi.object().keys({
            name: Joi.string().required(),
            description: Joi.string().required()
        }),

        productSchema: Joi.object().keys({
            category: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            name: Joi.string().required(),
            description: Joi.string().required()
        }),

        putProductSchema: Joi.object().keys({
            name: Joi.string().required(),
            description: Joi.string().required()
        }),

        idSchema: Joi.object().keys({
            param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        })
    }
}
