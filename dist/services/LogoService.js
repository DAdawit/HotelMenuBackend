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
exports.LogoService = void 0;
const SingleFileUploade_1 = require("../utils/SingleFileUploade");
const DeleteImages_1 = require("../utils/DeleteImages");
const Logo_1 = require("../entities/Logo");
class LogoService {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const logos = yield Logo_1.Logo.find({});
                // console.log(logos);
                return logos;
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
                const logo = Logo_1.Logo.findOne({
                    where: { id: parseInt(req.params.id) },
                });
                return logo;
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
                const imagePath = yield (0, SingleFileUploade_1.uploadFile)(req, "logos");
                const logo = new Logo_1.Logo();
                logo.name = req.body.name;
                logo.image = imagePath || "";
                try {
                    yield logo.save();
                }
                catch (error) {
                    console.log(error);
                }
                logo.loadImagePath();
                return logo;
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
            const logo = yield Logo_1.Logo.findOneBy({
                id: parseInt(req.params.id),
            });
            let imagePath;
            try {
                imagePath = yield (0, SingleFileUploade_1.uploadFile)(req, "logos");
            }
            catch (error) {
                imagePath = null;
            }
            const imageTodelete = `public/${logo === null || logo === void 0 ? void 0 : logo.image}`;
            if (imagePath !== null) {
                yield (0, DeleteImages_1.DeleteImage)(imageTodelete);
            }
            if (logo !== null) {
                logo.name = req.body.name;
                logo.image = imagePath !== null && imagePath !== void 0 ? imagePath : logo.image;
            }
            yield (logo === null || logo === void 0 ? void 0 : logo.save());
            logo === null || logo === void 0 ? void 0 : logo.loadImagePath();
            return logo;
        });
    }
    remove(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const logo = yield Logo_1.Logo.delete({ id: parseInt(req.params.id) });
                if (logo.affected === 0) {
                    return null;
                }
                return logo;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred while deleting category");
            }
        });
    }
}
exports.LogoService = LogoService;
