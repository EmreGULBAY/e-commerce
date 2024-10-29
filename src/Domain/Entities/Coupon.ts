import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  ManyToMany,
  JoinColumn,
} from "typeorm";
import { ICoupon } from "../Interfaces/ICoupon";
import { ShopProduct } from "./ShopProduct";
import { Customer } from "./Customer";

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

  @Column({ nullable: true })
  customerId?: string;

  @ManyToMany(() => Customer, (customer) => customer.coupons)
  @JoinColumn({ name: "customerId" })
  customers?: Customer[];

  @Column({ nullable: true })
  shopProductId?: string;

  @ManyToOne(() => ShopProduct, (shopProduct) => shopProduct.coupons)
  @JoinColumn({ name: "shopProductId" })
  shopProduct?: ShopProduct;
}
