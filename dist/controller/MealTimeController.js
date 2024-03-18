"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MealTimeService_1 = require("../services/MealTimeService");
const service = new MealTimeService_1.MealTimeService();
class MealTimeController {
}
MealTimeController.getMealTimes = (req, res) => {
    service
        .GetMealTimes()
        .then((mealTimes) => {
        res.send(mealTimes);
    })
        .catch((err) => {
        res.json(err);
    });
};
MealTimeController.addMealTime = (req, res) => {
    service
        .AddMealTime(req)
        .then((mealTime) => {
        res.send(mealTime);
    })
        .catch((err) => {
        res.json(err);
    });
};
MealTimeController.getDetails = (req, res) => {
    service
        .GetDetails(req)
        .then((mealTime) => {
        res.send(mealTime);
    })
        .catch((err) => {
        res.json(err);
    });
};
MealTimeController.updateMealTime = (req, res) => {
    service
        .UpdateMealTime(req)
        .then((mealTime) => {
        res.send(mealTime);
    })
        .catch((err) => {
        res.json(err);
    });
};
MealTimeController.deleteMealTime = (req, res) => {
    service
        .DeleteMealTime(req)
        .then(() => {
        res.send({ message: "mealTime deleted successfully" });
    })
        .catch((err) => {
        res.json(err);
    });
};
exports.default = MealTimeController;
