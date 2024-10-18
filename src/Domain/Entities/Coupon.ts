import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  ManyToMany,
} from "typeorm";
import { ICoupon } from "../Interfaces/ICoupon";
import { ShopProduct } from "./ShopProduct";

@Entity()
export class Coupon implements ICoupon {
    @PrimaryColumn("uuid")
    id!: string;

    @Column()
    code!: string;

    @Column()
    discount!: number;
    
    @Column()
    startDate!: Date;

    @Column()
    endDate!: Date;

    @Column()
    minLimit!: number;
//!
    @ManyToOne(() => ShopProduct, (product) => product.id)
    appliableProduct?: ShopProduct;

    @ManyToMany(() => ShopProduct, (product) => product.id)
    appliableProducts?: ShopProduct[];
}