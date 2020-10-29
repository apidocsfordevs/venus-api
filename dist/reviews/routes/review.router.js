"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRouter = void 0;
const model_router_1 = require("../../common/model-router");
const review_model_1 = require("../models/review.model");
const environment_1 = require("../../common/environment");
class ReviewRouter extends model_router_1.ModelRouter {
    constructor() {
        super(review_model_1.ReviewDTO, environment_1.environment.db.reviews.projection);
    }
    envelope(document) {
        let resource = super.envelope(document);
        const restaurantId = resource.restaurant._id ? resource.restaurant._id : resource.restaurant;
        resource._links.restaurant = `/restaurant/${restaurantId}`;
        return resource;
    }
    prepareOne(query) {
        return query
            .populate('user', 'name')
            .populate('restaurant', 'name');
    }
    applyRoutes(application) {
        application.post(`${this.basePath}`, this.save);
        application.get(`${this.basePath}`, this.findAll);
        application.del(`${this.basePath}/:id`, [this.validateId, this.delete]);
        application.get(`${this.basePath}/:id`, [this.validateId, this.findById]);
    }
}
exports.reviewRouter = new ReviewRouter();
