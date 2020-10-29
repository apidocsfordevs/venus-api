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
const Server_1 = require("./server/Server");
const usersConfigs = __importStar(require("./users"));
const restaurantsConfigs = __importStar(require("./restaurants"));
const reviewsConfigs = __importStar(require("./reviews"));
const server = new Server_1.Server();
server.bootstrap([...usersConfigs.routes, ...restaurantsConfigs.routes, ...reviewsConfigs.routes])
    .then(() => {
    console.log(`Server listening on address ${server.address}`);
})
    .catch((err) => {
    console.log(err);
    process.exit(1);
});
