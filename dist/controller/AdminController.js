"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdminService_1 = require("../services/AdminService");
const userService_1 = require("../services/userService");
const ReportedProductService_1 = require("../services/ReportedProductService");
const userService = new userService_1.UserService();
const service = new AdminService_1.AdminService();
const reportProdService = new ReportedProductService_1.ReportedProductService();
class AdminController {
}
AdminController.getUsers = (req, res) => {
    userService
        .get()
        .then((users) => {
        res.send(users);
    })
        .catch((error) => {
        res.json(error);
    });
};
AdminController.deActivateUser = (req, res) => {
    service
        .DeActivateUser(req)
        .then((user) => {
        res.send(user);
    })
        .catch((err) => {
        res.json(err);
    });
};
AdminController.activateUser = (req, res) => {
    service
        .ActivateUser(req)
        .then((user) => {
        res.send(user);
    })
        .catch((err) => {
        res.json(err);
    });
};
AdminController.getStores = (req, res) => {
    service
        .GetStores()
        .then((stores) => {
        res.send(stores);
    })
        .catch((error) => {
        res.json(error);
    });
};
AdminController.deActivateStore = (req, res) => {
    service
        .DeActivateStore(req)
        .then((user) => {
        res.send(user);
    })
        .catch((err) => {
        res.json(err);
    });
};
AdminController.activateStore = (req, res) => {
    service
        .ActivateStore(req)
        .then((user) => {
        res.send(user);
    })
        .catch((err) => {
        res.json(err);
    });
};
AdminController.getReportedProducts = (req, res) => {
    reportProdService
        .GetReportedProducts()
        .then((stores) => {
        res.send(stores);
    })
        .catch((error) => {
        res.json(error);
    });
};
exports.default = AdminController;
