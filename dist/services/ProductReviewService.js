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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductReviewService = void 0;
const Review_1 = require("../entities/Review");
class ProductReviewService {
    GetProductReviews(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Review_1.Review.find({
                    relations: {
                        menu: true,
                    },
                });
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred while retrieving wishlist");
            }
        });
    }
    AddProductReview(userId, req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const review = yield Review_1.Review.findOne({
                    where: {
                        menu: {
                            id: parseInt(req.params.id),
                        },
                        user: {
                            id: userId,
                        },
                    },
                });
                if (review) {
                    review.rate = req.body.rate;
                    review.comment = req.body.comment;
                    review.edited = true;
                    yield review.save();
                    return review;
                }
                else {
                    const newReview = new Review_1.Review();
                    newReview.rate = req.body.rate;
                    newReview.comment = req.body.comment;
                    newReview.menu = parseInt(req.params.id);
                    newReview.user = userId;
                    yield newReview.save();
                    return newReview;
                }
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred while saving the product review");
            }
        });
    }
    RemoveReview(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const review = yield Review_1.Review.delete({ id: parseInt(req.params.id) });
                if (review.affected === 0) {
                    return null;
                }
                return review;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred while deleting the wishlist");
            }
        });
    }
    UpdateReview(userId, req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const review = yield Review_1.Review.findOne({
                    where: { id: parseInt(req.params.id), user: { id: userId } },
                });
                if (!review) {
                    return null;
                }
                review.comment = req.body.comment;
                review.rate = req.body.rate;
                review.edited = false;
                yield review.save();
                return review;
            }
            catch (error) {
                throw new Error(error instanceof Error ? error.message : "An unknown error occurred");
            }
        });
    }
}
exports.ProductReviewService = ProductReviewService;
