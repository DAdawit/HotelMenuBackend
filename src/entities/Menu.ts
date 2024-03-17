import {
  AfterLoad,
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Cart } from "./Cart";
import { Order } from "./Order";
import { OrderItem } from "./OrderItems";
import { Review } from "./Review";
import { ReportedMenu } from "./ReportedMenu";
import { SubCategory } from "./SubCategory";
import { Category } from "./Category";
import { getBaseUrl } from "../utils/host";
import { MealTime } from "../Types";

@Entity("menues")
export class Menu extends BaseEntity {
  private _coverImageUrl!: string;

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  price!: number;

  @Column({ default: false })
  special!: boolean;

  @Column({ nullable: true })
  ingridiants!: string;

  @Column({ default: true })
  avaliable_all_day!: boolean;

  @Column("enum", {
    enum: MealTime,
    array: true,
    default: [],
  })
  avaliable_meal_time!: MealTime[];

  @Column()
  coverImage!: string;

  @AfterLoad()
  loadImagePath() {
    const baseUrl = getBaseUrl();
    this._coverImageUrl = baseUrl + this.coverImage; // Construct the full image path after entity load
  }

  @ManyToOne(() => Category, (category) => category.menu) // specify inverse side as a second parameter
  category!: Category;

  @ManyToOne(() => SubCategory, (subcategory) => subcategory.product)
  subCategory!: SubCategory;

  @OneToMany(() => Cart, (cart) => cart.menu)
  cart!: Cart[];

  @OneToMany(() => Review, (review) => review.menu)
  review!: Review[];

  @OneToMany(() => ReportedMenu, (review) => review.menu)
  reportMenu!: ReportedMenu[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.menu)
  orderItems!: OrderItem[];

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
