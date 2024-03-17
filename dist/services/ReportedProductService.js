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
exports.ReportedProductService = void 0;
const ReportedMenu_1 = require("../entities/ReportedMenu");
const Menu_1 = require("../entities/Menu");
class ReportedProductService {
    GetReportedMenu() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ReportedMenu_1.ReportedMenu.find({});
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred while retrieving wishlist");
            }
        });
    }
    AddReportedMenu(userId, req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield Menu_1.Menu.findOne({
                    where: { id: parseInt(req.params.id) },
                });
                if (!product) {
                    return null;
                }
                const newReport = new ReportedMenu_1.ReportedMenu();
                newReport.message = req.body.message;
                newReport.menu = parseInt(req.params.id);
                newReport.user = userId;
                try {
                    yield newReport.save();
                }
                catch (error) {
                    console.log("erorr on saving");
                }
                return newReport;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred while saving the Report");
            }
        });
    }
    UpdateReview(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const report = yield ReportedMenu_1.ReportedMenu.findOne({
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
                const review = yield ReportedMenu_1.ReportedMenu.delete({
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
exports.ReportedProductService = ReportedProductService;
