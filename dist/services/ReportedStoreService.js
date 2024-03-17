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
exports.ReportedStoreService = void 0;
const ReportedStore_1 = require("../entities/ReportedStore");
class ReportedStoreService {
    GetReportedStores() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ReportedStore_1.ReportedStore.find({
                    relations: {
                        store: true,
                    },
                });
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred while retrieving wishlist");
            }
        });
    }
    AddReportedStore(userId, req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newReport = new ReportedStore_1.ReportedStore();
                newReport.message = req.body.message;
                newReport.store = parseInt(req.params.id);
                newReport.user = userId;
                yield newReport.save();
                return newReport;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred while saving the Report");
            }
        });
    }
    UpdateReportStatus(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const report = yield ReportedStore_1.ReportedStore.findOne({
                    where: { id: parseInt(req.params.id) },
                });
                if (!report) {
                    return null;
                }
                report.status = req.body.status;
                yield report.save();
                return report;
            }
            catch (error) {
                throw new Error(error instanceof Error ? error.message : "An unknown error occurred");
            }
        });
    }
    RemoveReporte(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const review = yield ReportedStore_1.ReportedStore.delete({
                    id: parseInt(req.params.id),
                });
                if (review.affected === 0) {
                    return null;
                }
                return review;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred while deleting the wishlist");
            }
        });
    }
}
exports.ReportedStoreService = ReportedStoreService;
