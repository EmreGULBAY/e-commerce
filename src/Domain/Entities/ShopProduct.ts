import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Shop } from "./Shop";
import { Product } from "./Product";

@Entity("shop_products")
export class ShopProduct {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  shopId!: string;

  @Column()
  productId!: string;

  @ManyToOne(() => Shop, (shop) => shop.shopProducts)
  @JoinColumn({ name: "shopId" })
  shop!: Shop;

  @ManyToOne(() => Product, (product) => product.shopProducts)
  @JoinColumn({ name: "productId" })
  product!: Product;

  @Column()
  description!: string;

  @Column("decimal", { precision: 10, scale: 2 })
  price!: number;

  @Column()
  currency!: string;

  @Column("simple-array")
  images!: string[];

  @Column()
  category!: string;

  @Column("simple-array")
  tags!: string[];

  @Column()
  color!: string;

  @Column()
  size!: string;

  @Column()
  condition!: string;

  @Column({ nullable: true })
  sex?: string;
}
