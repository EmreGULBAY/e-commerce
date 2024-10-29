import { Entity, Column, PrimaryColumn, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { ShopProduct } from "./ShopProduct";
import { Customer } from "./Customer";

@Entity()
export class Cart {
  @PrimaryColumn("uuid")
  id!: string;

  @Column()
  customerId!: string;

  @OneToOne(() => Customer, (customer) => customer.cart)
  @JoinColumn({ name: "customerId" })
  customer!: Customer;

  @Column()
  createdAt!: Date;

  @Column()
  updatedAt!: Date;

  @Column("simple-array")
  itemList!: string[];

  @OneToMany(() => ShopProduct, (cartItem) => cartItem.id)
  cartItems!: ShopProduct[];
}
