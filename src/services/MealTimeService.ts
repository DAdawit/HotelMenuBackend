import { Request } from "express";
import { AvailableMealTime } from "../entities/AvaliableMealTime";
import { DataSource } from "typeorm";

export class MealTimeService {
  async GetMealTimes(): Promise<AvailableMealTime[]> {
    try {
      const mealTimes = await AvailableMealTime.find();
      return mealTimes;
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : "An unknown error occurred on fetching meal times"
      );
    }
  }

  async AddMealTime(req: Request): Promise<AvailableMealTime> {
    try {
      const mealTime = new AvailableMealTime();
      mealTime.name = req.body.name;
      await mealTime.save();
      return mealTime;
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : "An unknown error occurred on adding meal times"
      );
    }
  }
  async GetDetails(req: Request): Promise<AvailableMealTime | null> {
    try {
      const mealTime = await AvailableMealTime.findOneBy({
        id: parseInt(req.params.id),
      });

      return mealTime;
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : "An unknown error occurred on adding meal times"
      );
    }
  }
  async UpdateMealTime(req: Request): Promise<AvailableMealTime | null> {
    try {
      const mealTime = await AvailableMealTime.findOneBy({
        id: parseInt(req.params.id),
      });
      if (!mealTime) {
        return null;
      }
      mealTime.name = req.body.name;
      await mealTime.save();
      return mealTime;
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : "An unknown error occurred on updating meal times"
      );
    }
  }

  async DeleteMealTime(req: Request): Promise<any> {
    try {
      const mealTime = await AvailableMealTime.delete({
        id: parseInt(req.params.id),
      });

      if (mealTime.affected === 0) {
        return null;
      }
      return mealTime;
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : "An unknown error occurred while deleting product model."
      );
    }
  }
}
