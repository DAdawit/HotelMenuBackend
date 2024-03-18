import { Request } from "express";
import { SubCategoryCreateI } from "../Types";
import { SubCategory } from "../entities/SubCategory";
import { uploadFile } from "../utils/SingleFileUploade";

export class SubCategoryService {
  async index(): Promise<SubCategory[] | null> {
    try {
      const subCategories = await SubCategory.find({
        relations: { category: true },
      });
      return subCategories;
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : "An unknown error occurred in fetching subCategories"
      );
    }
  }

  async store(req: Request): Promise<SubCategory | null> {
    try {
      const imagePath = await uploadFile(req, "subCategory");

      const subCategory = new SubCategory();
      subCategory.name = req.body.name;
      subCategory.category = req.body.categoryId;
      subCategory.image = imagePath || "";

      await subCategory.save();
      return subCategory;
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : "An unknown error occurred in fetching subCategories"
      );
    }
  }

  async detail(id: string): Promise<SubCategory | null> {
    try {
      const subCategory = await SubCategory.findOne({
        where: {
          id: parseInt(id),
        },
      });

      return subCategory;
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : "An unknown error occurred in fetching subCategories"
      );
    }
  }

  async update(
    id: string,
    data: SubCategoryCreateI
  ): Promise<SubCategory | null> {
    try {
      const subCategory = await SubCategory.findOne({
        where: { id: parseInt(id) },
      });
      if (!subCategory) {
        return null;
      }
      subCategory.name = data.name;
      subCategory.category = data.categoryId;

      await subCategory.save();
      return subCategory;
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : "An unknown error occurred while deleting category"
      );
    }
  }

  async remove(id: string): Promise<any | null> {
    try {
      const subCategory = await SubCategory.delete({ id: parseInt(id) });
      if (subCategory.affected === 0) {
        return null;
      }
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : "An unknown error occurred while deleting category"
      );
    }
  }
}
