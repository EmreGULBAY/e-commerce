import { Entity, Column, PrimaryColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { Customer } from "./Customer";

@Entity()
export class Address {
  @PrimaryColumn("uuid")
  id!: string;

  @Column()
  city!: string;

  @Column()
  country!: string;

  @Column()
  postalCode!: string;

  @Column()
  addressLine1!: string;

  @Column({
    nullable: true,
  })
  addressLine2!: string;

  @ManyToOne(() => User, (user) => user.addresses, { nullable: true })
  user?: User;

  @ManyToOne(() => Customer, (customer) => customer.addresses, {
    nullable: true,
  })
  customer?: Customer;
}
