import {
  Entity,
  Column,
  PrimaryColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
  OneToOne,
} from "typeorm";
import { Address } from "./Address";
import { createHash } from "crypto";
import { v4 as uuidv4 } from "uuid";
import { IAuthenticatable } from "../Interfaces/IAuthenticatable";
import { Cart } from "./Cart";

@Entity()
export class Customer implements IAuthenticatable {
  @PrimaryColumn("uuid")
  id!: string;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @Column()
  email!: string;

  @Column()
  phone!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  isActive!: boolean;

  @OneToMany(() => Address, (address) => address.customer)
  addresses!: Address[];

  @OneToOne(() => Cart, (cart) => cart.customer)
  cart!: Cart;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    if (this.password) {
      this.password = createHash("md5").update(this.password).digest("hex");
    }
  }

  @BeforeInsert()
  generateId() {
    this.id = uuidv4();
  }
}
