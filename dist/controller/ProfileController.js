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
const ProfileService_1 = require("../services/ProfileService");
const class_transformer_1 = require("class-transformer");
const Profile_1 = require("../entities/Profile");
const class_validator_1 = require("class-validator");
const validationErrorConverter_1 = require("../utils/validationErrorConverter");
const service = new ProfileService_1.ProfileService();
class ProfileController {
}
_a = ProfileController;
ProfileController.get = (req, res) => {
    service
        .get()
        .then((profile) => {
        res.json(profile);
    })
        .catch((err) => [res.send(err)]);
};
ProfileController.addProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const profile = (0, class_transformer_1.plainToInstance)(Profile_1.Profile, req.body);
    const errors = yield (0, class_validator_1.validate)(profile);
    const err = (0, validationErrorConverter_1.validationErrorFormater)(errors);
    if (errors.length > 0) {
        res.status(400).send(err);
    }
    service
        .addProfile(req)
        .then((category) => {
        res.send(category);
    })
        .catch((err) => {
        res.send(err);
    });
});
ProfileController.updateProfile = (req, res) => {
    service
        .update(req)
        .then((category) => {
        res.send(category);
    })
        .catch((err) => {
        res.send(err);
    });
};
ProfileController.deleteProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    service
        .remove(req)
        .then(() => __awaiter(void 0, void 0, void 0, function* () {
        res.send({ message: "profile deleted successfully" });
    }))
        .catch((err) => {
        res.send(err);
    });
});
exports.default = ProfileController;
