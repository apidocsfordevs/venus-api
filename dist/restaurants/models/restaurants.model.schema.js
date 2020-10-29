"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const menuSchema = new mongoose_1.default.Schema({
    name: {
        required: true,
        type: String,
    },
    price: {
        type: Number,
        required: true
    }
});
exports.restaurantSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    menu: {
        type: [menuSchema],
        select: false,
        default: []
    }
});
