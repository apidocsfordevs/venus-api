"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataBaseInitializer = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const environment_1 = require("../common/environment");
class DataBaseInitializer {
    static init() {
        let uri = environment_1.environment.db.url;
        uri = uri.replace('"', "").replace('"', "");
        return mongoose_1.default.connect(uri, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }
}
exports.DataBaseInitializer = DataBaseInitializer;
