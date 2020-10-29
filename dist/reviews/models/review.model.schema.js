"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.reviewSchema = new mongoose_1.default.Schema({
    date: {
        type: Date,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comments: {
        type: String,
        maxlength: 500
    },
    restaurant: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});
