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
const OrderService_1 = require("../services/OrderService");
const getUserid_1 = require("../utils/getUserid");
const service = new OrderService_1.OrderService();
class OrderController {
}
_a = OrderController;
OrderController.orderProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = yield Promise.resolve((0, getUserid_1.getUserId)(req));
    service
        .OrderProduct(userId, req)
        .then((cart) => {
        // res.send(cart);
        res.status(201).send({ message: "order placed successfully" });
    })
        .catch((err) => {
        res.send(err);
    });
});
OrderController.userOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = yield Promise.resolve((0, getUserid_1.getUserId)(req));
    service
        .getUserOrders(userId)
        .then((order) => {
        res.send(order);
    })
        .catch((err) => {
        res.send(err);
    });
});
OrderController.cancelFullOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    service
        .CancelFullOrder(req)
        .then(() => {
        res.status(201).send({ message: "Order cancel successfully" });
    })
        .catch((err) => {
        res.send(err);
    });
});
OrderController.cancelOrderItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    service
        .CancelOrderItem(req)
        .then(() => {
        res.status(201).send({ message: "Order Item canceled successfully" });
    })
        .catch((err) => {
        res.send(err);
    });
});
OrderController.changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    service
        .ChangeStatus(req)
        .then((order) => {
        res.status(200).send(order);
    })
        .catch((err) => {
        res.send(err);
    });
});
exports.default = OrderController;
