'use strict';
const appPackage = require(__dirname + '/package.json');
const Boom = require('@hapi/boom');
const Hapi = require('@hapi/hapi');
const colors = require('colors/safe');
const Config = require('config');
const utils = require('./services/utils/utils.js');
const swaggerPaths = require('./routes/swagger.route').map((e) => {
    return e.path;
});


async function start() {

    try {
        // utils.addModels();
        const server = new Hapi.Server(Config.util.toObject(Config.get('server.connection')))

        // await utils.addPolicies(server)
        await server.register(require('@hapi/inert'));

        utils.addRoute(server);
        server.ext('onRequest', (request, h) => {
            if (swaggerPaths.indexOf(request.path) < 0) {
                if (request.headers.authorization !== "Bearer chaplooboys42069") { return Boom.forbidden("ur mome ez"); }
                else { return h.continue; }
            }
            else { return h.continue; }
        });

        await server.start();
        console.log(colors.green('%s %s started on %s'), appPackage.name, appPackage.version, server.info.uri);

        module.exports = server;

    } catch (err) {
        console.log(err)
        process.exit(0)
    }
}

start()