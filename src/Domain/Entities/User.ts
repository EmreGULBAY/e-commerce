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

@Entity()
export class User {
  @PrimaryColumn("uuid")
  id!: string;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @Column()
  isActive!: boolean;

  @Column("simple-array")
  ownedShopIds!: string[];

  @Column()
  role!: string;

  @OneToMany(() => Address, (address) => address.user)
  addresses!: Address[];

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
