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
exports.MealTimeService = void 0;
const AvaliableMealTime_1 = require("../entities/AvaliableMealTime");
const SingleFileUploade_1 = require("../utils/SingleFileUploade");
const DeleteImages_1 = require("../utils/DeleteImages");
class MealTimeService {
    GetMealTimes() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mealTimes = yield AvaliableMealTime_1.AvailableMealTime.find();
                return mealTimes;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred on fetching meal times");
            }
        });
    }
    AddMealTime(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("hello mother fucker");
                const imagePath = yield (0, SingleFileUploade_1.uploadFile)(req, "mealtime");
                const mealTime = new AvaliableMealTime_1.AvailableMealTime();
                mealTime.name = req.body.name;
                mealTime.image = imagePath || "";
                console.log(mealTime);
                try {
                    yield mealTime.save();
                }
                catch (error) {
                    console.log(error);
                }
                mealTime.loadImagePath();
                return mealTime;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred on adding meal times");
            }
        });
    }
    GetDetails(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mealTime = yield AvaliableMealTime_1.AvailableMealTime.findOneBy({
                    id: parseInt(req.params.id),
                });
                return mealTime;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred on adding meal times");
            }
        });
    }
    UpdateMealTime(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mealTime = yield AvaliableMealTime_1.AvailableMealTime.findOne({
                    where: {
                        id: parseInt(req.params.id),
                    },
                });
                let imagePath;
                try {
                    imagePath = yield (0, SingleFileUploade_1.uploadFile)(req, "mealtime");
                }
                catch (error) {
                    imagePath = null;
                }
                const imageTodelete = `public/${mealTime === null || mealTime === void 0 ? void 0 : mealTime.image}`;
                if (imagePath !== null) {
                    yield (0, DeleteImages_1.DeleteImage)(imageTodelete);
                }
                if (mealTime !== null) {
                    mealTime.name = req.body.name;
                    mealTime.image = imagePath !== null && imagePath !== void 0 ? imagePath : mealTime.image;
                }
                yield (mealTime === null || mealTime === void 0 ? void 0 : mealTime.save());
                return mealTime;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred on updating meal times");
            }
        });
    }
    DeleteMealTime(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mealTime = yield AvaliableMealTime_1.AvailableMealTime.delete({
                    id: parseInt(req.params.id),
                });
                if (mealTime.affected === 0) {
                    return null;
                }
                return mealTime;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred while deleting product model.");
            }
        });
    }
}
exports.MealTimeService = MealTimeService;
