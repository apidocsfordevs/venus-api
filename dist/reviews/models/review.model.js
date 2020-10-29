"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewDTO = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const review_model_schema_1 = require("./review.model.schema");
exports.ReviewDTO = mongoose_1.default.model('Reviews', review_model_schema_1.reviewSchema);
