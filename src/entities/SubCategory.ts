import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Category } from "./Category";
import { MinLength } from "class-validator";
import { Menu } from "./Menu";

@Entity("subCategories")
export class SubCategory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @MinLength(2)
  name!: string;

  @ManyToOne(() => Category, (category) => category.subCategory, {
    onDelete: "CASCADE",
  })
  category!: Category;

  @OneToMany(() => Menu, (menu) => menu.subCategory)
  menu!: Menu;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
