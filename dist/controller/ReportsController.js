"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ReportService_1 = require("../services/ReportService");
const service = new ReportService_1.ReportService();
class ReportsController {
    static index(req, res) {
        service.Index().then((result) => {
            res.status(200).send(result);
        });
    }
    static menusByCategory(req, res) {
        service.IenusByCategory().then((result) => {
            res.status(200).send(result);
        });
    }
    static menusBySubCategory(req, res) {
        service.IenusBySubCategory().then((result) => {
            res.status(200).send(result);
        });
    }
    static menusBymealtime(req, res) {
        service.MenusBymealtime().then((result) => {
            res.status(200).send(result);
        });
    }
}
exports.default = ReportsController;
