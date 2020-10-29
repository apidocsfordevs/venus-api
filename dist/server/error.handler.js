"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
exports.handleError = (req, resp, err, done) => {
    Object.defineProperty(err, 'toJSON', {
        enumerable: false,
        configurable: false,
        writable: true,
        value: 'static'
    });
    err.toJSON = () => {
        return {
            message: err.message
        };
    };
    switch (err.name) {
        case 'MongoError':
            if (err.code === 11000) {
                err.statusCode = 400;
            }
            break;
        case 'ValidationError':
            err.statusCode = 400;
            const messages = [];
            for (const errorName in err.errors) {
                messages.push({
                    message: err.errors[errorName].message
                });
            }
            err.toJSON = () => {
                return {
                    errors: messages
                };
            };
            break;
    }
    done();
};
