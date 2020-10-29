"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMiddleware = exports.saveMiddleware = void 0;
const bcrypt = __importStar(require("bcrypt"));
const environment_1 = require("../../common/environment");
function hash(userDocument, next) {
    const user = userDocument;
    bcrypt.hash(user.password, environment_1.environment.security.salt_rounds)
        .then(hash => {
        user.password = hash;
        next();
    })
        .catch(next);
}
function saveMiddleware(next) {
    const user = this;
    if (!user.isModified('password')) {
        next();
    }
    else {
        hash(user, next);
    }
}
exports.saveMiddleware = saveMiddleware;
function updateMiddleware(next) {
    const updatedDocument = this.getUpdate();
    if (!updatedDocument.password) {
        next();
    }
    else {
        hash(updatedDocument, next);
    }
}
exports.updateMiddleware = updateMiddleware;
