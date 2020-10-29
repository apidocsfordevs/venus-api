"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
const events_1 = require("events");
const restify_errors_1 = require("restify-errors");
class Router extends events_1.EventEmitter {
    envelope(document) {
        return document;
    }
    render(response, next) {
        return (document) => {
            if (document) {
                this.emit('beforeRender', document);
                response.statusCode = 200;
                response.json(document);
            }
            else {
                throw new restify_errors_1.NotFoundError('Document not found.');
            }
            return next();
        };
    }
    renderAll(response, next, page, limit, totalPages) {
        return (documents) => {
            if (documents) {
                documents.forEach((document, index, array) => {
                    this.emit('beforeRender', document);
                    array[index] = this.envelope(document);
                });
                response.statusCode = 200;
                totalPages.then((totalPagesCount) => response.json({ documents, page, limit, totalPagesCount })).catch(next);
            }
            else {
                response.json([]);
            }
            return next();
        };
    }
}
exports.Router = Router;
