"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDTO = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const users_model_schema_1 = __importDefault(require("./users.model.schema"));
exports.UserDTO = mongoose_1.default.model('User', users_model_schema_1.default);
