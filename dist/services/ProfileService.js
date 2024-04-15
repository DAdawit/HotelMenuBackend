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
exports.ProfileService = void 0;
const Logo_1 = require("../entities/Logo");
const Profile_1 = require("../entities/Profile");
const console_1 = require("console");
class ProfileService {
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const profile = yield Profile_1.Profile.find({ take: 1 });
                return profile[0];
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred in fetching category");
            }
        });
    }
    addProfile(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const profile = new Profile_1.Profile();
                profile.name = req.body.name;
                profile.email = req.body.email;
                profile.address = req.body.address;
                profile.city = req.body.city;
                profile.phone = req.body.phone;
                profile.openTime = req.body.openTime;
                profile.secondaryPhone = req.body.secondaryPhone;
                try {
                    yield profile.save();
                }
                catch (error) {
                    (0, console_1.log)(error);
                }
                return profile;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred in fetching category");
            }
        });
    }
    update(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const profile = yield Profile_1.Profile.findOneBy({
                id: parseInt(req.params.id),
            });
            if (!profile) {
                return null;
            }
            profile.name = req.body.name;
            profile.email = req.body.email;
            profile.address = req.body.address;
            profile.city = req.body.city;
            profile.phone = req.body.phone;
            profile.openTime = req.body.openTime;
            profile.secondaryPhone = req.body.secondaryPhone;
            try {
                yield (profile === null || profile === void 0 ? void 0 : profile.save());
            }
            catch (error) {
                console.log(error);
            }
            return profile;
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
exports.ProfileService = ProfileService;
