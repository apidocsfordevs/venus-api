"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const model_router_1 = require("../../common/model-router");
const users_model_1 = require("../models/users.model");
const environment_1 = require("../../common/environment");
class UsersRouter extends model_router_1.ModelRouter {
    constructor() {
        super(users_model_1.UserDTO, environment_1.environment.db.users.projection);
        this.findByEmail = (req, resp, next) => {
            const { email } = req.query;
            let { page = 1, limit = 5 } = req.query;
            page = Number.parseInt(page);
            limit = Number.parseInt(limit);
            if (email) {
                this.model.findByEmail(email)
                    .then(users => [users])
                    .then(this.renderAll(resp, next, page, limit, this.model.countDocuments().exec()))
                    .catch(next);
            }
            else {
                next();
            }
        };
    }
    applyRoutes(application) {
        application.get(`${this.basePath}`, [this.findByEmail, this.findAll]);
        application.get(`${this.basePath}/:id`, [this.validateId, this.findById]);
        application.post(`${this.basePath}`, this.save);
        application.put(`${this.basePath}/:id`, [this.validateId, this.replace]);
        application.patch(`${this.basePath}/:id`, [this.validateId, this.update]);
        application.del(`${this.basePath}/:id`, [this.validateId, this.delete]);
    }
}
exports.usersRouter = new UsersRouter();
