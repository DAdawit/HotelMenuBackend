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
const WishLilstService_1 = require("../services/WishLilstService");
const getUserid_1 = require("../utils/getUserid");
const service = new WishLilstService_1.WishLilstService();
class WishListController {
}
_a = WishListController;
WishListController.getwishlists = (req, res, next) => {
    service
        .GetWishlists()
        .then((wishlists) => {
        res.json(wishlists);
    })
        .catch((error) => {
        res.json(error);
    });
};
WishListController.getUserWishlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = yield Promise.resolve((0, getUserid_1.getUserId)(req));
    service
        .userWishlist(userId)
        .then((wishlist) => {
        res.send(wishlist);
    })
        .catch((err) => {
        return res.send(err);
    });
});
WishListController.addToWishlist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = yield Promise.resolve((0, getUserid_1.getUserId)(req));
    service
        .AddToWishList(userId, req.body)
        .then((wishlist) => {
        res.send(wishlist);
    })
        .catch((error) => {
        res.send(error);
    });
});
WishListController.removeFromWishlist = (req, res, next) => {
    service
        .RemoveFromWishlist(req.params.id)
        .then(() => {
        res.send({ message: "product removed from the wishlist successfully" });
    })
        .catch((error) => {
        res.send(error);
    });
};
WishListController.wishListToCArt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = yield Promise.resolve((0, getUserid_1.getUserId)(req));
    service
        .WishListToCart(userId, req)
        .then((cart) => {
        res.send(cart);
    })
        .catch((err) => {
        res.send(err);
    });
});
WishListController.clearWishlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = yield Promise.resolve((0, getUserid_1.getUserId)(req));
    service
        .ClearWishlist(userId)
        .then(() => {
        res.send({ message: "wishlist cleared successfully!" });
    })
        .catch((err) => {
        res.send(err);
    });
});
exports.default = WishListController;
