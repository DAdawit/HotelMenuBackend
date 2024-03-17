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
const ReportedProductService_1 = require("../services/ReportedProductService");
const getUserid_1 = require("../utils/getUserid");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const validationErrorConverter_1 = require("../utils/validationErrorConverter");
const ReportedMenu_1 = require("../entities/ReportedMenu");
const service = new ReportedProductService_1.ReportedProductService();
class ReportProductController {
}
_a = ReportProductController;
ReportProductController.getReportedMenu = (req, res) => {
    service
        .GetReportedMenu()
        .then((reviews) => {
        res.json(reviews);
    })
        .catch((error) => {
        res.json(error);
    });
};
ReportProductController.addReportedMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const report = (0, class_transformer_1.plainToInstance)(ReportedMenu_1.ReportedMenu, req.body);
    const errors = yield (0, class_validator_1.validate)(report);
    const err = (0, validationErrorConverter_1.validationErrorFormater)(errors);
    if (errors.length > 0) {
        res.status(400).send(err);
    }
    const userId = yield Promise.resolve((0, getUserid_1.getUserId)(req));
    service
        .AddReportedMenu(userId, req)
        .then((review) => {
        res.send(review);
    })
        .catch((error) => {
        res.send(error);
    });
});
//  form admin
ReportProductController.updateReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    service
        .UpdateReview(req)
        .then((report) => {
        res.send(report);
    })
        .catch((error) => {
        res.send(error);
    });
});
ReportProductController.removeReporte = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const report = yield ReportedMenu_1.ReportedMenu.findOne({
        where: {
            id: parseInt(req.params.id),
        },
    });
    if (!report) {
        res.status(404).send({ message: "report not found" });
    }
    else {
        service
            .RemoveReporte(req)
            .then(() => __awaiter(void 0, void 0, void 0, function* () {
            res.send({ message: "report deleted successfully" });
        }))
            .catch((err) => {
            res.send(err);
        });
    }
});
exports.default = ReportProductController;
