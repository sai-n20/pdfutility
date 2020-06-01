'use strict';
const Boom = require('@hapi/boom');
const pdflib = require('pdf-lib').PDFDocument;
const degrees = require('pdf-lib').degrees;
const stream = require('stream');

module.exports = {
    stitchImage: async (request, h) => {
        try {
            const pdfDoc = await pdflib.create();
            for (var i = 0; i < request.payload["image"].length; i++) {
                const imageBytes = request.payload["image"][i]._data;
                let image;
                if(request.payload["image"][i].hapi.headers["content-type"] === "image/jpeg") { image = await pdfDoc.embedJpg(imageBytes); }
                else if(request.payload["image"][i].hapi.headers["content-type"] === "image/png") { image = await pdfDoc.embedPng(imageBytes); }
                else { return Boom.badRequest("Only JPG and PNG supported!"); }
                const page = pdfDoc.addPage();
                const jpgDims = image.scale(0.5);
                if (image.width > image.height) {
                    if (page.getHeight() < jpgDims.width) {
                        const scale = page.getHeight() / image.width;
                        const newDims = image.scale(scale);
                        page.drawImage(image, {
                            x: page.getWidth() - (page.getWidth() - newDims.height) / 2,
                            y: 0,
                            width: newDims.width,
                            height: newDims.height, rotate: degrees(90)
                        });
                        page.setRotation(degrees(90));
                    }
                    else {
                        page.drawImage(image, {
                            x: page.getWidth() - (page.getWidth() - jpgDims.height) / 2,
                            y: 0,
                            width: jpgDims.width,
                            height: jpgDims.height, rotate: degrees(90)
                        });
                        page.setRotation(degrees(90));
                    }
                }
                else {
                    if (page.getHeight() < jpgDims.height) {
                        const scale = page.getHeight() / image.height;
                        const newDims = image.scale(scale);
                        page.drawImage(image, {
                            x: page.getWidth() / 2 - newDims.width / 2,
                            y: page.getHeight() / 2 - newDims.height / 2,
                            width: newDims.width,
                            height: newDims.height
                        });
                    }
                    else {
                        page.drawImage(image, {
                            x: page.getWidth() / 2 - jpgDims.width / 2,
                            y: page.getHeight() / 2 - jpgDims.height / 2,
                            width: jpgDims.width,
                            height: jpgDims.height
                        });
                    }
                }
            }
            const bufferStream = new stream.PassThrough();
            const pdfBytes = await pdfDoc.save();
            bufferStream.end(pdfBytes);
            return h.response(bufferStream).type('application/pdf')
            .header('Content-Type', 'application/pdf');
        } catch (err) {
            throw Boom.badRequest(err);
        }
    }
}