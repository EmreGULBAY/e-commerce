import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  PrimaryColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable
} from "typeorm";
import { User } from "./User";
import { Product } from "./Product";
import { ShopProduct } from "./ShopProduct";

@Entity()
export class Shop {
  @PrimaryColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  ownerId!: string;

  @ManyToOne(() => User, (user) => user.ownedShops)
  owner!: User;

  @OneToMany(() => ShopProduct, shopProduct => shopProduct.shop)
  shopProducts!: ShopProduct[];
}

