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
exports.HeroSectionService = void 0;
const SingleFileUploade_1 = require("../utils/SingleFileUploade");
const DeleteImages_1 = require("../utils/DeleteImages");
const Hero_1 = require("../entities/Hero");
class HeroSectionService {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hero = yield Hero_1.Hero.find({});
                // console.log(hero);
                return hero;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred in fetching category");
            }
        });
    }
    getById(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hero = Hero_1.Hero.findOne({
                    where: { id: parseInt(req.params.id) },
                });
                return hero;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred in fetching category");
            }
        });
    }
    add(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Use the utility function to handle file upload
                const imagePath = yield (0, SingleFileUploade_1.uploadFile)(req, "herosection");
                const hero = new Hero_1.Hero();
                hero.slogan = req.body.slogan;
                hero.title = req.body.title;
                hero.content = req.body.content;
                hero.image = imagePath || "";
                try {
                    yield hero.save();
                }
                catch (error) {
                    console.log(error);
                }
                hero.loadImagePath();
                return hero;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred while saving the category");
            }
        });
    }
    update(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const hero = yield Hero_1.Hero.findOneBy({
                id: parseInt(req.params.id),
            });
            let imagePath;
            try {
                imagePath = yield (0, SingleFileUploade_1.uploadFile)(req, "herosection");
            }
            catch (error) {
                imagePath = null;
            }
            const imageTodelete = `public/${hero === null || hero === void 0 ? void 0 : hero.image}`;
            if (imagePath !== null) {
                yield (0, DeleteImages_1.DeleteImage)(imageTodelete);
            }
            if (hero !== null) {
                hero.slogan = req.body.slogan;
                hero.title = req.body.title;
                hero.content = req.body.content;
                hero.image = imagePath !== null && imagePath !== void 0 ? imagePath : hero.image;
            }
            yield (hero === null || hero === void 0 ? void 0 : hero.save());
            hero === null || hero === void 0 ? void 0 : hero.loadImagePath();
            return hero;
        });
    }
    remove(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hero = yield Hero_1.Hero.delete({ id: parseInt(req.params.id) });
                if (hero.affected === 0) {
                    return null;
                }
                return hero;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred while deleting category");
            }
        });
    }
}
exports.HeroSectionService = HeroSectionService;
