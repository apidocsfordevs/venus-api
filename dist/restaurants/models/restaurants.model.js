"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantDTO = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const restaurants_model_schema_1 = require("./restaurants.model.schema");
exports.RestaurantDTO = mongoose_1.default.model('Restaurant', restaurants_model_schema_1.restaurantSchema);
