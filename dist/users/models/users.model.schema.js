"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validators_1 = require("../../common/validators");
const users_middleware_1 = require("../middleware/users.middleware");
const userBaseSchema = {
    name: {
        type: String,
        required: true,
        maxlength: 80,
        minlength: 3,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: /[^;/?´<>:'-][\w]+@+[^;/?´<>:'-][\w]+[.][\w]*/
    },
    password: {
        type: String,
        select: false,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'None']
    },
    cpf: {
        type: String,
        required: false,
        validate: {
            validator: validators_1.validateCPF,
            message: '{PATH}: Invalid CPF ({VALUE})'
        }
    }
};
const userSchema = new mongoose_1.default.Schema(userBaseSchema);
userSchema.pre('save', users_middleware_1.saveMiddleware);
userSchema.pre('findOneAndUpdate', users_middleware_1.updateMiddleware);
userSchema.pre('update', users_middleware_1.updateMiddleware);
userSchema.statics.findByEmail = function (email) {
    return this.findOne({ email });
};
exports.default = userSchema;
