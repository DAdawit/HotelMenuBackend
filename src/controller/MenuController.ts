import { NextFunction, Request, Response } from "express";
import { MenuService } from "../services/MenuService";
import { Menu } from "../entities/Menu";
import { DeleteImage } from "../utils/DeleteImages";
const service = new MenuService();
class ProductController {
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
  public static get = (req: Request, res: Response) => {
    service
      .get(req)
      .then((menues) => {
        res.json(menues);
      })
      .catch((err) => {
        res.json(err);
      });
  };

  public static featchMenuesByCategory = (req: Request, res: Response) => {
    service
      .FeatchMenuesByCategory(req)
      .then((products) => {
        res.send(products);
      })
      .catch((err) => {
        res.json(err);
      });
  };
  public static featchMenuBySubCategory = (req: Request, res: Response) => {
    service
      .FeatchMenuBySubCategory(req)
      .then((products) => {
        res.send(products);
      })
      .catch((err) => {
        res.json(err);
      });
  };

  public static relatedProducts = (req: Request, res: Response) => {
    service
      .RelatedProducts(req)
      .then((products) => {
        res.send(products);
      })
      .catch((err) => {
        res.json(err);
      });
  };

  public static add = (req: Request, res: Response) => {
    service
      .add(req)
      .then((product) => {
        res.send(product);
      })
      .catch((err) => {
        res.send(err);
      });
  };

  public static detail = (req: Request, res: Response) => {
    service
      .detail(req.params.id)
      .then((product) => {
        res.send(product);
      })
      .catch((err) => {
        res.send(err);
      });
  };

  public static updateProduct = (req: Request, res: Response) => {
    service
      .update(req.params.id, req)
      .then((product) => {
        res.send(product);
      })
      .catch((err) => {
        res.send(err);
      });
  };

  public static delete = async (req: Request, res: Response) => {
    const menu = await Menu.findOne({
      where: { id: parseInt(req.params.id) },
    });

    if (!menu) {
      res.status(404).send({ message: "product not found" });
    } else {
      service
        .remove(req.params.id)
        .then(async () => {
          const imagePath = `menues/${menu.coverImage}`;
          await DeleteImage(imagePath);
          res.send({ message: "product deleted successfully" });
        })
        .catch((err) => {
          res.send(err);
        });
    }
  };

  public static addProductColor = (req: Request, res: Response) => {
    service
      .AddProductColor(req)
      .then((product) => {
        res.send(product);
      })
      .catch((err) => {
        res.send(err);
      });
  };
}

export default ProductController;
