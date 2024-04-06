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
const HeroSectionService_1 = require("../services/HeroSectionService");
const DeleteImages_1 = require("../utils/DeleteImages");
const Hero_1 = require("../entities/Hero");
const service = new HeroSectionService_1.HeroSectionService();
class HeroController {
    static getHeroSectionById(req, res) {
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
_a = HeroController;
HeroController.getHeroSection = (req, res) => {
    service
        .getAll()
        .then((hero) => {
        res.json(hero);
    })
        .catch((err) => [res.send(err)]);
};
HeroController.AdminHeroSection = (req, res) => {
    service
        .AdmingetAll()
        .then((hero) => {
        res.json(hero);
    })
        .catch((err) => [res.send(err)]);
};
HeroController.addHeroSection = (req, res) => {
    service
        .add(req)
        .then((category) => {
        res.send(category);
    })
        .catch((err) => {
        res.send(err);
    });
};
HeroController.updateHeroSection = (req, res) => {
    service
        .update(req)
        .then((category) => {
        res.send(category);
    })
        .catch((err) => {
        res.send(err);
    });
};
HeroController.removeHeroSection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield Hero_1.Hero.findOneBy({
        id: parseInt(req.params.id),
    });
    if (!category) {
        res.status(404).send({ message: "hero not found" });
    }
    else {
        service
            .remove(req)
            .then(() => __awaiter(void 0, void 0, void 0, function* () {
            const imagePath = `public/${category.image}`;
            console.log(imagePath);
            yield (0, DeleteImages_1.DeleteImage)(imagePath);
            res.send({ message: "hero deleted successfully" });
        }))
            .catch((err) => {
            res.send(err);
        });
    }
});
exports.default = HeroController;
