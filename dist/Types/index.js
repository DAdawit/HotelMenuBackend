"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = exports.MealTime = exports.OrderStatus = exports.ReviewStatus = void 0;
var ReviewStatus;
(function (ReviewStatus) {
    ReviewStatus["OnReview"] = "onReview";
    ReviewStatus["Approved"] = "approved";
    ReviewStatus["Rejected"] = "rejected";
})(ReviewStatus || (exports.ReviewStatus = ReviewStatus = {}));
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["placed"] = "placed";
    OrderStatus["processing"] = "processing";
    OrderStatus["shipped"] = "shipped";
    OrderStatus["delivered"] = "delivered";
    OrderStatus["canceled"] = "canceled";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
var MealTime;
(function (MealTime) {
    MealTime["Breakfast"] = "breakfast";
    MealTime["Lunch"] = "lunch";
    MealTime["Dinner"] = "dinner";
})(MealTime || (exports.MealTime = MealTime = {}));
var Roles;
(function (Roles) {
    Roles["waiter"] = "waiter";
    Roles["admin"] = "admin";
    Roles["kitchen"] = "kitchen";
})(Roles || (exports.Roles = Roles = {}));
