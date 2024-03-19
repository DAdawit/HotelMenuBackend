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
const DeleteImages_1 = require("../utils/DeleteImages");
const LogoService_1 = require("../services/LogoService");
const Logo_1 = require("../entities/Logo");
const service = new LogoService_1.LogoService();
class LogoController {
    static getLogoById(req, res) {
        service
            .getById(req)
            .then((category) => {
            res.send(category);
        })
            .catch((err) => {
            res.send(err);
        });
    }
}
_a = LogoController;
LogoController.getLogos = (req, res) => {
    service
        .getAll()
        .then((hero) => {
        res.json(hero);
    })
        .catch((err) => [res.send(err)]);
};
LogoController.addLogo = (req, res) => {
    service
        .add(req)
        .then((category) => {
        res.send(category);
    })
        .catch((err) => {
        res.send(err);
    });
};
LogoController.updateLogo = (req, res) => {
    service
        .update(req)
        .then((category) => {
        res.send(category);
    })
        .catch((err) => {
        res.send(err);
    });
};
LogoController.removeLogo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield Logo_1.Logo.findOneBy({
        id: parseInt(req.params.id),
    });
    if (!category) {
        res.status(404).send({ message: "logo not found" });
    }
    else {
        service
            .remove(req)
            .then(() => __awaiter(void 0, void 0, void 0, function* () {
            const imagePath = `public/${category.image}`;
            console.log(imagePath);
            yield (0, DeleteImages_1.DeleteImage)(imagePath);
            res.send({ message: "logo deleted successfully" });
        }))
            .catch((err) => {
            res.send(err);
        });
    }
});
exports.default = LogoController;
