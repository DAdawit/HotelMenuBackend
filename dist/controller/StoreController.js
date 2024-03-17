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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const validationErrorConverter_1 = require("../utils/validationErrorConverter");
const dotenv_1 = __importDefault(require("dotenv"));
const getUserid_1 = require("../utils/getUserid");
const Store_1 = require("../entities/Store");
const StoreService_1 = require("../services/StoreService");
const DeleteImages_1 = require("../utils/DeleteImages");
const Phone_1 = require("../entities/Phone");
dotenv_1.default.config();
const service = new StoreService_1.StoreService();
class StoreController {
}
_a = StoreController;
StoreController.getStores = (req, res, next) => {
    service
        .index()
        .then((stores) => {
        res.json(stores);
    })
        .catch((error) => {
        res.json(error);
    });
};
StoreController.addStore = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = yield Promise.resolve((0, getUserid_1.getUserId)(req));
    const NewStore = (0, class_transformer_1.plainToInstance)(Store_1.Store, req.body);
    const errors = yield (0, class_validator_1.validate)(NewStore);
    const err = (0, validationErrorConverter_1.validationErrorFormater)(errors);
    if (err.length > 0) {
        res.status(400).send(err);
    }
    const storeByUserId = yield Store_1.Store.findOne({
        where: {
            user: {
                id: userId,
            },
        },
    });
    const storeByEmail = yield Store_1.Store.findOne({
        where: {
            email: req.body.email,
        },
    });
    if (storeByUserId) {
        return res.status(400).json({ detail: "your already have a store !" });
    }
    if (storeByEmail) {
        return res.status(400).json({ detail: "email already in use!" });
    }
    if (errors.length > 0) {
        res.status(400).send(err);
    }
    else {
        service
            .store(req)
            .then((store) => {
            res.send(store);
        })
            .catch((error) => {
            res.send(error);
        });
    }
});
StoreController.detail = (req, res) => {
    service
        .detail(req.params.id)
        .then((store) => {
        res.send(store);
    })
        .catch((err) => {
        res.send(err);
    });
};
StoreController.updateStore = (req, res) => {
    service
        .update(req)
        .then((store) => {
        res.send(store);
    })
        .catch((err) => {
        res.send(err);
    });
};
StoreController.updateStorePic = (req, res) => {
    service
        .UpdateStorePic(req.params.id, req)
        .then((user) => {
        res.send(user);
    })
        .catch((err) => {
        res.send(err);
    });
};
StoreController.myStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = yield Promise.resolve((0, getUserid_1.getUserId)(req));
    service
        .MyStore(userId)
        .then((user) => {
        res.send(user);
    })
        .catch((err) => {
        res.send(err);
    });
});
StoreController.removeStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const store = yield Store_1.Store.findOne({
        where: {
            id: parseInt(req.params.id),
        },
        relations: { user: true },
    });
    let userId;
    if (store) {
        userId = store.user.id;
    }
    if (!store) {
        res.status(404).send({ message: "Category not found" });
    }
    else {
        service
            .remove(req.params.id, userId || 0)
            .then(() => __awaiter(void 0, void 0, void 0, function* () {
            const imagePath = `public/${store.storePic}`;
            console.log(imagePath);
            yield (0, DeleteImages_1.DeleteImage)(imagePath);
            res.send({ message: "store deleted successfully" });
        }))
            .catch((err) => {
            res.send(err);
        });
    }
});
StoreController.getOrders = (req, res, next) => {
    service
        .GetOrders(req)
        .then((stores) => {
        res.json(stores);
    })
        .catch((error) => {
        res.json(error);
    });
};
StoreController.getProducts = (req, res) => {
    service
        .GetProducts(req)
        .then((stores) => {
        res.json(stores);
    })
        .catch((error) => {
        res.json(error);
    });
};
StoreController.getHiddenProducts = (req, res) => {
    service
        .GetHiddenProducts(req)
        .then((stores) => {
        res.json(stores);
    })
        .catch((error) => {
        res.json(error);
    });
};
StoreController.getReportsOnMyStore = (req, res) => {
    service
        .GetReportsOnMyStore(req)
        .then((reports) => {
        res.send(reports);
    })
        .catch((error) => {
        res.json(error);
    });
};
StoreController.getReportedProductsOfMyStore = (req, res) => {
    service
        .GetReportedProductsOfMyStore(req)
        .then((reports) => {
        res.send(reports);
    })
        .catch((error) => {
        res.json(error);
    });
};
StoreController.hiddeProduct = (req, res) => {
    service
        .HideProduct(req)
        .then((reports) => {
        res.send(reports);
    })
        .catch((error) => {
        res.json(error);
    });
};
StoreController.unHideProduct = (req, res) => {
    service
        .UnHideProduct(req)
        .then((reports) => {
        res.send(reports);
    })
        .catch((error) => {
        res.json(error);
    });
};
StoreController.getStorePhoneNumbers = (req, res) => {
    service
        .GetStorePhoneNumbers(req)
        .then((phones) => {
        res.send(phones);
    })
        .catch((err) => {
        res.json(err);
    });
};
StoreController.addPhoneNumber = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const phone = (0, class_transformer_1.plainToInstance)(Phone_1.Phone, req.body);
    const errors = yield (0, class_validator_1.validate)(phone);
    const err = (0, validationErrorConverter_1.validationErrorFormater)(errors);
    if (err.length > 0) {
        return res.status(400).send(err);
    }
    service
        .AddPhoneNumber(req)
        .then((phone) => {
        res.send(phone);
    })
        .catch((error) => {
        res.json(error);
    });
});
StoreController.updatePhoneNumber = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const phone = (0, class_transformer_1.plainToInstance)(Phone_1.Phone, req.body);
    const errors = yield (0, class_validator_1.validate)(phone);
    const err = (0, validationErrorConverter_1.validationErrorFormater)(errors);
    if (err.length > 0) {
        return res.status(400).send(err);
    }
    service
        .UpdatePhoneNumber(req)
        .then((phone) => {
        res.send(phone);
    })
        .catch((error) => {
        res.json(error);
    });
});
StoreController.deletePhoneNumber = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const phone = yield Phone_1.Phone.findOneBy({
        id: parseInt(req.params.id),
    });
    if (!phone) {
        res.status(404).send({ message: "phoneNumber not found" });
    }
    else {
        service
            .DeletePhoneNumber(req)
            .then(() => __awaiter(void 0, void 0, void 0, function* () {
            res.send({ message: "phoneNumber deleted successfully" });
        }))
            .catch((err) => {
            res.send(err);
        });
    }
});
exports.default = StoreController;
