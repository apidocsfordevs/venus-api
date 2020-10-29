"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergePatchBodyParser = void 0;
const restify_errors_1 = require("restify-errors");
const requestContentTypeMergePatch = 'application/merge-patch+js';
exports.mergePatchBodyParser = (req, resp, next) => {
    if (req.getContentType() === requestContentTypeMergePatch && req.method == 'PATCH') {
        try {
            req.body = JSON.parse(req.body);
        }
        catch (error) {
            return next(new restify_errors_1.BadRequestError(`Invalid Content ${error.message}`));
        }
    }
    return next();
};
