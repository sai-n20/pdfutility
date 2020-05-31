'use strict';

const swaggerDocument = require('../swagger/swagger.json');
const path = require('path');

module.exports = [
    {
        method: 'GET',
        path: '/api-docs',
        handler: function(request, h) {
            return h.file(path.resolve(__dirname, '..', 'swagger', 'index.html'));
        }
    },
    {
        method: 'GET',
        path: '/swagger-ui.css',
        handler: function(request, h) {
            return h.file(path.resolve(__dirname, '..', 'swagger', 'swagger-ui.css'));
        }
    },
    {
        method: 'GET',
        path: '/swagger-ui-bundle.js',
        handler: function(request, h) {
            return h.file(path.resolve(__dirname, '..', 'swagger', 'swagger-ui-bundle.js'));
        }
    },
    {
        method: 'GET',
        path: '/swagger-ui-standalone-preset.js',
        handler: function(request, h) {
            return h.file(path.resolve(__dirname, '..', 'swagger', 'swagger-ui-standalone-preset.js'));
        }
    },
    {
        method: 'GET',
        path: '/favicon-32x32.png',
        handler: function(request, h) {
            return h.file(path.resolve(__dirname, '..', 'swagger', 'favicon-32x32.png'));
        }
    },
    {
        method: 'GET',
        path: '/favicon-16x16.png',
        handler: function(request, h) {
            return h.file(path.resolve(__dirname, '..', 'swagger', 'favicon-16x16.png'));
        }
    },
    {
        method: 'GET',
        path: '/swagger.json',
        handler: function(request, h) {
           return h.response(swaggerDocument); 
        }
    }
]