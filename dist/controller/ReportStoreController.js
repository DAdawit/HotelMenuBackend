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
const ReportedStoreService_1 = require("../services/ReportedStoreService");
const getUserid_1 = require("../utils/getUserid");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const validationErrorConverter_1 = require("../utils/validationErrorConverter");
const ReportedStore_1 = require("../entities/ReportedStore");
const service = new ReportedStoreService_1.ReportedStoreService();
class ReportStoreController {
}
_a = ReportStoreController;
ReportStoreController.getReportedStores = (req, res) => {
    service
        .GetReportedStores()
        .then((reviews) => {
        res.json(reviews);
    })
        .catch((error) => {
        res.json(error);
    });
};
ReportStoreController.addReportedStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const report = (0, class_transformer_1.plainToInstance)(ReportedStore_1.ReportedStore, req.body);
    const errors = yield (0, class_validator_1.validate)(report);
    const err = (0, validationErrorConverter_1.validationErrorFormater)(errors);
    if (errors.length > 0) {
        res.status(400).send(err);
    }
    const userId = yield Promise.resolve((0, getUserid_1.getUserId)(req));
    service
        .AddReportedStore(userId, req)
        .then((review) => {
        res.send(review);
    })
        .catch((error) => {
        res.send(error);
    });
});
//  form admin
ReportStoreController.updateReportStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    service
        .UpdateReportStatus(req)
        .then((report) => {
        res.send(report);
    })
        .catch((error) => {
        res.send(error);
    });
});
ReportStoreController.removeReporte = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const report = yield ReportedStore_1.ReportedStore.findOne({
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
exports.default = ReportStoreController;
