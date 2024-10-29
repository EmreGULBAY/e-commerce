import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  PrimaryColumn,
  OneToMany,
} from "typeorm";
import { createHash } from "crypto";
import { v4 as uuidv4 } from "uuid";
import { Address } from "./Address";
import { IAuthenticatable } from "../Interfaces/IAuthenticatable";
import { Shop } from "./Shop";

@Entity()
export class User implements IAuthenticatable {
  @PrimaryColumn("uuid")
  id!: string;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @Column()
  isActive!: boolean;

  @Column()
  role!: string;

  @Column()
  email!: string;

  @Column()
  phone!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @OneToMany(() => Address, (address) => address.user)
  addresses!: Address[];

  @OneToMany(() => Shop, (shop) => shop.owner)
  ownedShops!: Shop[];

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
