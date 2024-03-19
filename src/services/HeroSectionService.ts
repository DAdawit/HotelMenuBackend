import { DeleteResult, getRepository } from "typeorm";
import { Category } from "../entities/Category";
import Multer from "multer";
import { Request } from "express";
import { uploadFile } from "../utils/SingleFileUploade";
import { DeleteImage } from "../utils/DeleteImages";
import { Hero } from "../entities/Hero";

export class HeroSectionService {
  async getAll(): Promise<Hero[] | null> {
    try {
      const hero = await Hero.find({});
      console.log(hero);

      return hero;
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : "An unknown error occurred in fetching category"
      );
    }
  }

  async getById(req: Request): Promise<Hero | null> {
    try {
      const hero = Hero.findOne({
        where: { id: parseInt(req.params.id) },
      });
      return hero;
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : "An unknown error occurred in fetching category"
      );
    }
  }

  async add(req: Request): Promise<Hero | null> {
    try {
      // Use the utility function to handle file upload
      const imagePath = await uploadFile(req, "herosection");

      const hero = new Hero();
      hero.slogan = req.body.slogan;
      hero.title = req.body.title;
      hero.subtitle = req.body.subtitle;
      hero.content = req.body.content;
      hero.image = imagePath || "";

      try {
        await hero.save();
      } catch (error) {
        console.log(error);
      }
      hero.loadImagePath();

      return hero;
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : "An unknown error occurred while saving the category"
      );
    }
  }

  async update(req: Request): Promise<Hero | null> {
    const hero = await Hero.findOneBy({
      id: parseInt(req.params.id),
    });

    let imagePath;

    try {
      imagePath = await uploadFile(req, "herosection");
    } catch (error) {
      imagePath = null;
    }
    const imageTodelete = `public/${hero?.image}`;
    if (imagePath !== null) {
      await DeleteImage(imageTodelete);
    }

    if (hero !== null) {
      hero.slogan = req.body.slogan;
      hero.title = req.body.title;
      hero.subtitle = req.body.subtitle;
      hero.content = req.body.content;
      hero.image = imagePath || "";
    }
    await hero?.save();
    hero?.loadImagePath();

    return hero;
  }

  async remove(req: Request): Promise<any | null> {
    try {
      const category = await Category.delete({ id: parseInt(req.params.id) });
      if (category.affected === 0) {
        return null;
      }
      return category;
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : "An unknown error occurred while deleting category"
      );
    }
  }
}
