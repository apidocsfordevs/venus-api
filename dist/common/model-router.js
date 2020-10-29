"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelRouter = void 0;
const router_1 = require("./router");
const mongoose_1 = __importDefault(require("mongoose"));
const restify_errors_1 = require("restify-errors");
class ModelRouter extends router_1.Router {
    constructor(model, fieldsToSelectAtGetById) {
        super();
        this.model = model;
        this.fieldsToSelectAtGetById = fieldsToSelectAtGetById;
        this.paginatorOptions = (req) => {
            let { page = 1, limit = 5 } = req.query;
            page = Number.parseInt(page);
            limit = Number.parseInt(limit);
            return { page, limit };
        };
        this.validateId = (req, resp, next) => {
            if (!mongoose_1.default.Types.ObjectId.isValid(req.params.id)) {
                next(new restify_errors_1.NotFoundError("Not a valid ID"));
            }
            else {
                next();
            }
        };
        this.findAll = (req, resp, next) => {
            const { page, limit } = this.paginatorOptions(req);
            this.model.find()
                .limit(limit)
                .skip((page - 1) * limit)
                .then(this.renderAll(resp, next, page, limit, this.model.countDocuments().exec()))
                .catch(next);
        };
        this.findById = (req, resp, next) => {
            this.prepareOne(this.model.findById(req.params['id'], this.fieldsToSelectAtGetById)).then(this.render(resp, next)).catch(next);
        };
        this.save = (req, resp, next) => {
            let document = new this.model(req.body);
            document.save().then(this.render(resp, next)).catch(next);
        };
        this.replace = (req, resp, next) => {
            const options = {
                overwrite: true,
                runValidators: true
            };
            this.model.update({ "_id": req.params['id'] }, req.body, options)
                .exec()
                .then(result => {
                if (result.n) {
                    return this.model.findById(req.params['id']);
                }
                throw new restify_errors_1.NotFoundError('Document not found.');
            })
                .then(this.render(resp, next))
                .catch(next);
            return next();
        };
        this.update = (req, resp, next) => {
            const options = {
                new: true,
                runValidators: true
            };
            return this.model.findByIdAndUpdate({ "_id": req.params['id'] }, req.body, options)
                .then(this.render(resp, next))
                .catch(next);
        };
        this.delete = (req, resp, next) => {
            this.model.deleteOne({ "_id": req.params['id'] })
                .exec()
                .then(queryResult => {
                if (queryResult.n) {
                    resp.send(204);
                    return next();
                }
                throw new restify_errors_1.NotFoundError('Document not found.');
            })
                .catch(err => resp.send(500, err));
            return next();
        };
        this.on('beforeRender', document => {
            document.password = 'encrypted';
        });
        this.basePath = `/${model.collection.name}`;
    }
    envelope(document) {
        let resource = Object.assign({ _links: {} }, document.toJSON());
        resource._links.self = `${this.basePath}/${resource._id}`;
        return resource;
    }
    prepareOne(query) {
        return query;
    }
}
exports.ModelRouter = ModelRouter;
