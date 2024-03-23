import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Menu } from "./Menu";
import { Color } from "./Color";
import { MealTime } from "../Types";

@Entity("availableMealTime")
export class AvailableMealTime extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("enum", {
    enum: MealTime,
    unique: true, // Ensures each meal time is only listed once
  })
  name!: MealTime;

  @ManyToMany(() => Menu, (menu) => menu.available_meal_times)
  menues!: Menu[];

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
