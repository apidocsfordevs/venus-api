"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantRouter = void 0;
const model_router_1 = require("../../common/model-router");
const restaurants_model_1 = require("../models/restaurants.model");
const environment_1 = require("../../common/environment");
class RestaurantRouter extends model_router_1.ModelRouter {
    constructor() {
        super(restaurants_model_1.RestaurantDTO, environment_1.environment.db.restaurants.projection);
        this.findRestaurantMenuOption = (req, res, next) => {
            const { id, menuID } = req.params;
            this.model.find({ _id: id }, { menu: { $elemMatch: { _id: menuID } } })
                .then(this.render(res, next))
                .catch(next);
        };
        this.findAllMenus = (req, res, next) => {
            const { id } = req.params;
            const { page, limit } = this.paginatorOptions(req);
            this.model.findById(id, 'menu')
                .limit(limit)
                .skip((page - 1) * limit)
                .then(this.render(res, next))
                .catch(next);
        };
    }
    envelope(document) {
        let resource = super.envelope(document);
        resource._links.menu = `${this.basePath}/${resource._id}/menu`;
        return resource;
    }
    applyRoutes(application) {
        application.post(`${this.basePath}`, this.save);
        application.get(`${this.basePath}`, this.findAll);
        application.del(`${this.basePath}/:id`, [this.validateId, this.delete]);
        application.get(`${this.basePath}/:id`, [this.validateId, this.findById]);
        application.put(`${this.basePath}/:id`, [this.validateId, this.replace]);
        application.patch(`${this.basePath}/:id`, [this.validateId, this.update]);
        application.get(`${this.basePath}/:id/menu`, [this.validateId, this.findAllMenus]);
        application.get(`${this.basePath}/:id/menu/:menuID`, [this.validateId, this.findRestaurantMenuOption]);
    }
}
exports.restaurantRouter = new RestaurantRouter();
