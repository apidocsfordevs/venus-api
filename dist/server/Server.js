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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const restify = __importStar(require("restify"));
const environment_1 = require("../common/environment");
const DataBaseInitializer_1 = require("../DataBase/DataBaseInitializer");
const merge_patch_parser_1 = require("./merge-patch.parser");
const error_handler_1 = require("./error.handler");
class Server {
    constructor() {
        this.application = restify.createServer({
            name: environment_1.environment.server.name,
            version: environment_1.environment.server.version
        });
        this.application.use(restify.plugins.queryParser());
        this.application.use(restify.plugins.bodyParser());
        this.application.use(merge_patch_parser_1.mergePatchBodyParser);
        this.application.on('restifyError', error_handler_1.handleError);
    }
    startListening(resolve) {
        this.application.listen(environment_1.environment.server.port, () => {
            resolve(this.application);
        });
    }
    initRoutes(routers = []) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, rejects) => {
                try {
                    this.startListening(resolve);
                    routers.forEach(route => {
                        route.applyRoutes(this.application);
                    });
                }
                catch (error) {
                    rejects(error);
                }
            });
        });
    }
    get address() {
        var _a;
        return JSON.stringify((_a = this.application) === null || _a === void 0 ? void 0 : _a.address());
    }
    bootstrap(routers = []) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield DataBaseInitializer_1.DataBaseInitializer.init();
                return this.initRoutes(routers).then(() => this);
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.Server = Server;
