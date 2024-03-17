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
const CartService_1 = require("../services/CartService");
const getUserid_1 = require("../utils/getUserid");
const service = new CartService_1.CartService();
class CartController {
}
_a = CartController;
CartController.getCartItems = (req, res, next) => {
    service
        .getcartItems()
        .then((carts) => {
        res.json(carts);
    })
        .catch((error) => {
        res.json(error);
    });
};
CartController.getUserCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = yield Promise.resolve((0, getUserid_1.getUserId)(req));
    service
        .userCart(userId)
        .then((cart) => {
        res.send(cart);
    })
        .catch((err) => {
        return res.send(err);
    });
});
CartController.addToCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = yield Promise.resolve((0, getUserid_1.getUserId)(req));
    service
        .AddTocart(userId, req)
        .then((cart) => {
        res.send(cart);
    })
        .catch((error) => {
        res.send(error);
    });
});
CartController.removeFromCart = (req, res, next) => {
    service
        .RemoveFromCart(req.params.id)
        .then(() => {
        res.send({ message: "product removed from the cart successfully" });
    })
        .catch((error) => {
        res.send(error);
    });
};
CartController.AddQuantity = (req, res) => {
    service
        .addQuantity(req.params.id)
        .then((cart) => {
        res.send(cart);
    })
        .catch((error) => {
        res.send(error);
    });
};
CartController.SubtractQuantity = (req, res) => {
    service
        .subtractQuantity(req.params.id)
        .then((cart) => {
        res.send(cart);
    })
        .catch((error) => {
        res.send(error);
    });
};
CartController.cartToWishlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = yield Promise.resolve((0, getUserid_1.getUserId)(req));
    service
        .CartToWishlist(userId, req)
        .then((cart) => {
        res.send(cart);
    })
        .catch((err) => {
        res.send(err);
    });
});
CartController.clearCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = yield Promise.resolve((0, getUserid_1.getUserId)(req));
    service
        .ClearCart(userId)
        .then(() => {
        res.send({ message: "cart cleared successfully!" });
    })
        .catch((err) => {
        res.send(err);
    });
});
exports.default = CartController;
