'use strict';

const PdfController = require('../controllers/pdf.controller');

module.exports = [
    {
        method: 'POST',
        path: '/images',
        config: {
            payload: {
                output: "stream",
                parse: true,
                allow: "multipart/form-data",
                maxBytes: 30 * 1000 * 1000,
                multipart: true
            }
        },
        handler: PdfController.stitchImage
    },
    // {
    //     method: 'PUT',
    //     path: '/user/{id}',
    //     handler: UserController.update,
    //     options: {
    //         validate: {
    //             params: {
    //                 id: Joi.required()
    //             },
    //             options: {
    //                 abortEarly: false,
    //                 allowUnknown: true
    //             }
    //         },
    //         auth: false
    //     }
    // }
]