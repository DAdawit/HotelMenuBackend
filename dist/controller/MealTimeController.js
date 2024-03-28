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
const MealTimeService_1 = require("../services/MealTimeService");
const AvaliableMealTime_1 = require("../entities/AvaliableMealTime");
const DeleteImages_1 = require("../utils/DeleteImages");
const service = new MealTimeService_1.MealTimeService();
class MealTimeController {
}
_a = MealTimeController;
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
MealTimeController.deleteMealTime = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mealtime = yield AvaliableMealTime_1.AvailableMealTime.findOne({
        where: {
            id: parseInt(req.params.id),
        },
    });
    if (!mealtime) {
        res.status(404).send({ message: "Category not found" });
    }
    service
        .DeleteMealTime(req)
        .then(() => __awaiter(void 0, void 0, void 0, function* () {
        const imagePath = `public/${mealtime === null || mealtime === void 0 ? void 0 : mealtime.image}`;
        // console.log(imagePath);
        yield (0, DeleteImages_1.DeleteImage)(imagePath);
        res.send({ message: "mealTime deleted successfully" });
    }))
        .catch((err) => {
        res.json(err);
    });
});
exports.default = MealTimeController;
