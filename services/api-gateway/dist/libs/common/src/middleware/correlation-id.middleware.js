"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.correlationIdMiddleware = correlationIdMiddleware;
const crypto_1 = require("crypto");
function correlationIdMiddleware(req, res, next) {
    const existing = req.headers['x-correlation-id'];
    const cid = existing || (0, crypto_1.randomUUID)();
    req.headers['x-correlation-id'] = cid;
    res.setHeader('x-correlation-id', cid);
    next();
}
//# sourceMappingURL=correlation-id.middleware.js.map