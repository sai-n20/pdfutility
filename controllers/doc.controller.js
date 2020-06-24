'use strict';
const Boom = require('@hapi/boom');
const unoconv = require('awesome-unoconv');
const fs = require('fs');
const path = require('path');

module.exports = {
    convertToPDF: async (request, h) => {
        try {
            fs.writeFileSync(path.resolve(__dirname, 'temp.docx'), request.payload["file"]._data);
            unoconv.convert(path.resolve(__dirname, 'temp.docx'), { buffer: true, format: 'pdf' })  // or format: 'html'
                .then(buffer => {
                    // return Buffer
                    fs.unlink(path.resolve(__dirname, 'temp.docx'), function(err) {
                        if(err) { console.error(err); }
                        else { console.log('File deleted'); }
                    })
                    return h.response(buffer).type('application/pdf')
                        .header('Content-Type', 'application/pdf');
                })
                .catch(err => {
                    console.log(err);
                });
        } catch (err) {
            throw Boom.badRequest(err);
        }
    }
}