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
const MenuService_1 = require("../services/MenuService");
const Menu_1 = require("../entities/Menu");
const DeleteImages_1 = require("../utils/DeleteImages");
const class_validator_1 = require("class-validator");
const validationErrorConverter_1 = require("../utils/validationErrorConverter");
const class_transformer_1 = require("class-transformer");
const service = new MenuService_1.MenuService();
class ProductController {
}
_a = ProductController;
// public static getPaginatedProducts = (req: Request, res: Response) => {
//   service
//     .GetPaginatedProducts()
//     .then((products) => {
//       res.json(products);
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// };
ProductController.get = (req, res) => {
    service
        .get(req)
        .then((menues) => {
        res.json(menues);
    })
        .catch((err) => {
        res.json(err);
    });
};
ProductController.featchMenuesByCategory = (req, res) => {
    service
        .FeatchMenuesByCategory(req)
        .then((menus) => {
        res.send(menus);
    })
        .catch((err) => {
        res.json(err);
    });
};
ProductController.featchMenuBySubCategory = (req, res) => {
    service
        .FeatchMenuBySubCategory(req)
        .then((menus) => {
        res.send(menus);
    })
        .catch((err) => {
        res.json(err);
    });
};
ProductController.relatedProducts = (req, res) => {
    service
        .RelatedProducts(req)
        .then((products) => {
        res.send(products);
    })
        .catch((err) => {
        res.json(err);
    });
};
ProductController.add = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.categoryId) {
        return res.status(400).send({ message: "category required" });
    }
    const newMenu = (0, class_transformer_1.plainToInstance)(Menu_1.Menu, req.body);
    const errors = yield (0, class_validator_1.validate)(newMenu);
    const err = (0, validationErrorConverter_1.validationErrorFormater)(errors);
    if (errors.length > 0) {
        res.status(400).send(err);
    }
    service
        .add(req)
        .then((menu) => {
        res.status(201).send(menu);
    })
        .catch((err) => {
        res.send(err);
    });
});
ProductController.detail = (req, res) => {
    service
        .detail(req)
        .then((menu) => {
        res.send(menu);
    })
        .catch((err) => {
        res.send(err);
    });
};
ProductController.updateMenu = (req, res) => {
    service
        .update(req.params.id, req)
        .then((menu) => {
        res.send(menu);
    })
        .catch((err) => {
        res.send(err);
    });
};
ProductController.delete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const menu = yield Menu_1.Menu.findOne({
        where: { id: parseInt(req.params.id) },
    });
    if (!menu) {
        res.status(404).send({ message: "product not found" });
    }
    else {
        service
            .remove(req.params.id)
            .then(() => __awaiter(void 0, void 0, void 0, function* () {
            const imagePath = `menues/${menu.image}`;
            yield (0, DeleteImages_1.DeleteImage)(imagePath);
            res.send({ message: "product deleted successfully" });
        }))
            .catch((err) => {
            res.send(err);
        });
    }
});
ProductController.addProductColor = (req, res) => {
    service
        .AddProductColor(req)
        .then((menu) => {
        res.send(menu);
    })
        .catch((err) => {
        res.send(err);
    });
};
ProductController.addOrChangeMenuImage = (req, res) => {
    service
        .AddOrChangeMenuImage(req)
        .then((user) => {
        res.send(user);
    })
        .catch((err) => {
        res.send(err);
    });
};
exports.default = ProductController;
