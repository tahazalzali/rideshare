"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metricsHandler = metricsHandler;
exports.metricsMiddleware = metricsMiddleware;
const prom_client_1 = require("prom-client");
const register = new prom_client_1.Registry();
(0, prom_client_1.collectDefaultMetrics)({ register });
function metricsHandler(_req, res) {
    res.set('Content-Type', register.contentType);
    res.end(register.metrics());
}
function metricsMiddleware(_req, _res, next) {
    next();
}
//# sourceMappingURL=metrics.middleware.js.map