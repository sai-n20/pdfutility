'use strict';

const PdfController = require('../controllers/pdf.controller');
const DocController = require('../controllers/doc.controller');

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
    {
        method: 'POST',
        path: '/docToPDF',
        config: {
            payload: {
                output: "stream",
                parse: true,
                allow: "multipart/form-data",
                maxBytes: 10 * 1000 * 1000,
                multipart: true
            }
        },
        handler: DocController.convertToPDF
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