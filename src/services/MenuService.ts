import { ProductCreateI, ProductDetails } from "../Types";
import { Request } from "express";
import { uploadFile } from "../utils/SingleFileUploade";
import { MultipleFileUploade } from "../utils/MultipleFileUploade";
import { DeleteImage } from "../utils/DeleteImages";
import { Review } from "../entities/Review";
import { Color } from "../entities/Color";
import { DataSource, Equal, Not, getRepository } from "typeorm";
import { PaginationResult, paginate } from "../utils/pagination";
import { Menu } from "../entities/Menu";
import { AvailableMealTime } from "../entities/AvaliableMealTime";
export class MenuService {
  // async GetPaginatedProducts(req: Request): Promise<PaginationResult<Product>> {
  //   const skip = (req.body.skip - 1) * req.body.take;

  //   // Fetching products along with their relationships
  //   const [products, total] = await Product.findAndCount({
  //     take: pageSize,
  //     skip: skip,
  //   });

  //   const totalPages = Math.ceil(total / pageSize);

  //   return {
  //     data: products,
  //     total: total,
  //     totalPages: totalPages,
  //     currentPage: page,
  //     pageSize: pageSize,
  //   };
  // }
  async get(req: Request): Promise<Menu[] | null> {
    try {
      const menues = await Menu.find({
        take: req.body.take || 15,
        skip: req.body.skip || 0,
      });
      return menues;
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : "An unknown error occurred on fetching products"
      );
    }
  }

  async FeatchMenuesByCategory(req: Request): Promise<Menu[] | null> {
    try {
      const menues = await Menu.find({
        where: { category: { id: parseInt(req.params.id) } },
      });
      return menues;
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : "An unknown error occurred on fetching products by category"
      );
    }
  }

  async FeatchMenuBySubCategory(req: Request): Promise<Menu[] | null> {
    try {
      const menues = await Menu.find({
        where: { subCategory: { id: parseInt(req.params.id) } },
      });
      return menues;
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : "An unknown error occurred on fetching products by subCategory"
      );
    }
  }

  async RelatedProducts(req: Request): Promise<Menu[] | null> {
    try {
      const menu = await Menu.findOne({
        where: { id: parseInt(req.params.id) },
        relations: {
          subCategory: true,
        },
      });
      if (!menu) {
        return null;
      }

      const relatedMenues = await Menu.find({
        where: {
          subCategory: { id: menu.subCategory.id },
          id: Not(Equal(menu.id)), // Exclude the original product from the results
        },
      });
      return relatedMenues;
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : "An unknown error occurred on fetching products by subCategory"
      );
    }
  }

  async add(req: Request): Promise<Menu | null> {
    try {
      console.log(req.body.availableMealLTimesIds);

      const availableMealTimes = await AvailableMealTime.findByIds(
        req.body.available_meal_times
      );

      // console.log(availableMealTimes);

      const menu = new Menu();
      menu.name = req.body.name;
      menu.description = req.body.description;
      menu.price = req.body.price;
      menu.special = req.body.special;
      menu.ingridiants = req.body.ingridiants;
      menu.avaliable_all_day = req.body.avaliable_all_day;
      menu.category = parseInt(req.body.categoryId) as any;
      menu.subCategory = parseInt(req.body.subCategoryId) as any;
      menu.available_meal_times = availableMealTimes;
      console.log(menu);

      try {
        await menu.save();
      } catch (error) {
        console.log(error);
      }
      return menu;
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : "An unknown error occurred while saving the category"
      );
    }
  }

  async update(id: string, req: Request): Promise<Menu | null> {
    const menu = await Menu.findOne({
      where: {
        id: parseInt(id),
      },
    });
    let imagePath;

    try {
      imagePath = await uploadFile(req, "menues");
    } catch (error) {
      imagePath = null;
    }
    const imageTodelete = `public/${menu?.image}`;
    if (imagePath !== null) {
      await DeleteImage(imageTodelete);
    }

    if (menu !== null) {
      menu.name = req.body.name;
      menu.description = req.body.description;
      menu.price = req.body.price;
      menu.image = imagePath ?? imageTodelete;
    }
    await menu?.save();
    return menu;
  }

  async detail(id: string): Promise<ProductDetails | null> {
    try {
      const Productreview = await Review.createQueryBuilder("review")
        .leftJoinAndSelect("review.user", "user", "user.id = review.userId")
        .select([
          "review.id",
          "review.rate",
          "user.firstName",
          "user.profilePic",
        ])
        .where("review.productId = :id", { id: parseInt(id) })
        .getMany();

      let average = 0;
      const total = Productreview.length;
      const sum = Productreview.reduce((acc, review) => {
        return acc + review.rate;
      }, 0);
      average = sum / total;

      const menu = await Menu.findOne({
        where: { id: parseInt(id) },
      });
      if (!menu) {
        return null;
      }
      let data: ProductDetails = {
        menu: menu,
        review: {
          average: average || 0,
          total: total,
          details: Productreview,
        },
      };
      return data;
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : "An unknown error occurred on product detail"
      );
    }
  }

  async remove(id: string): Promise<any | null> {
    try {
      const menu = await Menu.delete({ id: parseInt(id) });
      if (menu.affected === 0) {
        return null;
      }
      return menu;
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : "An unknown error occurred while deleting product"
      );
    }
  }

  async AddProductColor(req: Request): Promise<Color | null> {
    console.log(req.body, req.params);

    try {
      const color = new Color();
      color.quantity = req.body.quantity;
      color.name = req.body.name;
      await color.save();
      return color;
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : "An unknown error occurred while saving product model."
      );
    }
  }

  async AddOrChangeMenuImage(req: Request): Promise<Menu | null> {
    const menu = await Menu.findOneBy({ id: parseInt(req.params.id) });

    let imagePath;

    try {
      imagePath = await uploadFile(req, "menues");
    } catch (error) {
      imagePath = null;
    }
    const imageTodelete = `public/${menu?.image}`;

    if (menu?.image !== null) {
      if (imagePath !== null) {
        await DeleteImage(imageTodelete);
      }
    }

    if (menu !== null) {
      menu.image = imagePath ? imagePath : "";
    }
    await menu?.save();
    menu?.loadImagePath();
    return menu;
  }
}
