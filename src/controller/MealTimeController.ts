import { Request, Response } from "express";
import { MealTimeService } from "../services/MealTimeService";
const service = new MealTimeService();
class MealTimeController {
  public static getMealTimes = (req: Request, res: Response) => {
    service
      .GetMealTimes()
      .then((mealTimes) => {
        res.send(mealTimes);
      })
      .catch((err) => {
        res.json(err);
      });
  };

  public static addMealTime = (req: Request, res: Response) => {
    service
      .AddMealTime(req)
      .then((mealTime) => {
        res.send(mealTime);
      })
      .catch((err) => {
        res.json(err);
      });
  };
  public static getDetails = (req: Request, res: Response) => {
    service
      .GetDetails(req)
      .then((mealTime) => {
        res.send(mealTime);
      })
      .catch((err) => {
        res.json(err);
      });
  };

  public static updateMealTime = (req: Request, res: Response) => {
    service
      .UpdateMealTime(req)
      .then((mealTime) => {
        res.send(mealTime);
      })
      .catch((err) => {
        res.json(err);
      });
  };

  public static deleteMealTime = (req: Request, res: Response) => {
    service
      .DeleteMealTime(req)
      .then(() => {
        res.send({ message: "mealTime deleted successfully" });
      })
      .catch((err) => {
        res.json(err);
      });
  };
}

export default MealTimeController;
