'use strict';
const Boom = require('@hapi/boom');
const pdflib = require('pdf-lib').PDFDocument;
const degrees = require('pdf-lib').degrees;
const stream = require('stream');

module.exports = {
    stitchImage: async (request, h) => {
        if (request.headers.keystring !== "chaplooboys42069") { return Boom.forbidden("ur mome ez"); }
        try {
            const pdfDoc = await pdflib.create();
            for (var i = 0; i < request.payload["image"].length; i++) {
                const jpgImageBytes = request.payload["image"][i]._data;
                const jpgImage = await pdfDoc.embedJpg(jpgImageBytes);
                const page = pdfDoc.addPage();
                const jpgDims = jpgImage.scale(0.5);
                if (jpgImage.width > jpgImage.height) {
                    if (page.getHeight() < jpgDims.width) {
                        const scale = page.getHeight() / jpgImage.width;
                        const newDims = jpgImage.scale(scale);
                        page.drawImage(jpgImage, {
                            x: page.getWidth() - (page.getWidth() - newDims.height) / 2,
                            y: 0,
                            width: newDims.width,
                            height: newDims.height, rotate: degrees(90)
                        });
                        page.setRotation(degrees(90));
                    }
                    else {
                        page.drawImage(jpgImage, {
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
                        const scale = page.getHeight() / jpgImage.height;
                        const newDims = jpgImage.scale(scale);
                        page.drawImage(jpgImage, {
                            x: page.getWidth() / 2 - newDims.width / 2,
                            y: page.getHeight() / 2 - newDims.height / 2,
                            width: newDims.width,
                            height: newDims.height
                        });
                    }
                    else {
                        page.drawImage(jpgImage, {
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