import { Entity, Column, PrimaryColumn, ManyToMany, OneToMany } from "typeorm";
import { Shop } from "./Shop";
import { ShopProduct } from "./ShopProduct";

type priceDTO = {
  price: number;
  currency: string;
};

@Entity()
export class Product {
  @PrimaryColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  brand!: string;

  @OneToMany(() => ShopProduct, shopProduct => shopProduct.product)
  shopProducts!: ShopProduct[];
}
