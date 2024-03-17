"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const ProductReviewService_1 = require("../services/ProductReviewService");
const getUserid_1 = require("../utils/getUserid");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const validationErrorConverter_1 = require("../utils/validationErrorConverter");
const Review_1 = require("../entities/Review");
const service = new ProductReviewService_1.ProductReviewService();
class ProductRateingController {
}
_a = ProductRateingController;
ProductRateingController.getProductReviews = (req, res) => {
    service
        .GetProductReviews(parseInt(req.params.id))
        .then((reviews) => {
        res.json(reviews);
    })
        .catch((error) => {
        res.json(error);
    });
};
ProductRateingController.addProductReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const review = (0, class_transformer_1.plainToInstance)(Review_1.Review, req.body);
    const errors = yield (0, class_validator_1.validate)(review);
    const err = (0, validationErrorConverter_1.validationErrorFormater)(errors);
    if (errors.length > 0) {
        res.status(400).send(err);
    }
    const userId = yield Promise.resolve((0, getUserid_1.getUserId)(req));
    service
        .AddProductReview(userId, req)
        .then((review) => {
        res.send(review);
    })
        .catch((error) => {
        res.send(error);
    });
});
ProductRateingController.removeReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = yield Promise.resolve((0, getUserid_1.getUserId)(req));
    const review = yield Review_1.Review.findOne({
        where: { id: parseInt(req.params.id), user: { id: userId } },
    });
    if (!review) {
        return res
            .status(404)
            .send({ message: "You are not authorized to delete this review" });
    }
    else {
        service
            .RemoveReview(req)
            .then(() => {
            res.send({ message: "Review removed successfully" });
        })
            .catch((error) => {
            res.send(error);
        });
    }
});
ProductRateingController.updateReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = yield Promise.resolve((0, getUserid_1.getUserId)(req));
    const review = yield Review_1.Review.findOne({
        where: { id: parseInt(req.params.id), user: { id: userId } },
    });
    if (!review) {
        return res
            .status(404)
            .send({ message: "You are not authorized to update this review" });
    }
    else {
        service
            .UpdateReview(userId, req)
            .then((review) => {
            res.send(review);
        })
            .catch((error) => {
            res.send(error);
        });
    }
});
exports.default = ProductRateingController;
