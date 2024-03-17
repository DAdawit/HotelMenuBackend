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
exports.OrderService = void 0;
const Cart_1 = require("../entities/Cart");
const Order_1 = require("../entities/Order");
const OrderItems_1 = require("../entities/OrderItems");
const DeliveryAddress_1 = require("../entities/DeliveryAddress");
const DBHelpers_1 = require("../utils/DBHelpers");
class OrderService {
    OrderProduct(userId, req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cartItems = yield Cart_1.Cart.find({
                    where: {
                        user: {
                            id: userId,
                        },
                    },
                    relations: {
                        menu: true,
                        color: true,
                    },
                });
                // console.log("hello mother", cartItems);
                const orderId = this.generateOrderId();
                const address = new DeliveryAddress_1.DeliveryAddress();
                address.user = userId;
                address.fullName = req.body.fullName;
                address.phoneNumber = req.body.phoneNumber;
                address.country = req.body.country;
                address.city = req.body.city;
                address.street = req.body.street;
                address.lat = req.body.useCurrentLocation ? req.body.lat : null;
                address.long = req.body.useCurrentLocation ? req.body.long : null;
                address.default = req.body.default ? req.body.default : false;
                try {
                    yield address.save();
                }
                catch (error) {
                    console.log("Error on saving address");
                }
                yield address.save();
                // cartItems.map(async (storeCart) => {
                //   const order = new Order();
                //   order.user = userId as any;
                //   order.order_id = orderId;
                //   order.deliveryAddress = address;
                //   try {
                //     await order.save();
                //   } catch (error) {
                //     console.log("Error saving order");
                //   }
                //   storeCart.map(async (cartItems) => {
                //     console.log("order id", order.id);
                //     const item = new OrderItem();
                //     item.color = cartItems.color?.id as any;
                //     item.quantity = cartItems.quantity;
                //     item.menu = cartItems.menu.id as any;
                //     item.order = order.id as any;
                //     item.subTotal = cartItems.quantity * cartItems.menu.price;
                //     try {
                //       await item.save();
                //     } catch (error) {
                //       console.log("Error saving order item");
                //     }
                //   });
                // });
                yield (0, DBHelpers_1.clearCart)(userId);
                return true;
            }
            catch (error) {
                throw new Error(error instanceof Error ? error.message : "An unknown error occurred");
            }
        });
    }
    getUserOrders(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield Order_1.Order.find({
                    where: { user: { id: userId } },
                    relations: {
                        ordersItems: { menu: true, color: true },
                    },
                });
                return null;
                // return orders as UserOrdersOutI[];
            }
            catch (error) {
                throw new Error(error instanceof Error ? error.message : "An unknown error occurred");
            }
        });
    }
    CancelFullOrder(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield Order_1.Order.delete({ id: parseInt(req.params.id) });
                if (order.affected === 0) {
                    return null;
                }
                return order;
            }
            catch (error) {
                throw new Error(error instanceof Error ? error.message : "An unknown error occurred");
            }
        });
    }
    CancelOrderItem(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield OrderItems_1.OrderItem.delete({ id: parseInt(req.params.id) });
                if (order.affected === 0) {
                    return null;
                }
                return order;
            }
            catch (error) {
                throw new Error(error instanceof Error ? error.message : "An unknown error occurred");
            }
        });
    }
    ChangeStatus(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield Order_1.Order.findOne({
                    where: { id: parseInt(req.params.id) },
                });
                if (order === null) {
                    return null;
                }
                order.status = req.body.status;
                order.save();
                return order;
            }
            catch (error) {
                throw new Error(error instanceof Error ? error.message : "An unknown error occurred");
            }
        });
    }
    generateOrderId() {
        return Math.random().toString(36).substr(2, 18);
    }
    separateCartItemsByStore(cartItems) {
        const groupedByStoreId = cartItems.reduce((acc, item) => {
            const storeId = item.product.store.id;
            if (!acc[storeId]) {
                acc[storeId] = [];
            }
            acc[storeId].push(item);
            return acc;
        }, {});
        return Promise.resolve(Object.values(groupedByStoreId));
    }
}
exports.OrderService = OrderService;
