import { Entity, Column, PrimaryColumn } from "typeorm";

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
  description!: string;

  @Column()
  price!: string; //[{price: number, currency: string}]

  @Column()
  stock!: number;

  @Column("simple-array")
  images!: string[];

  @Column()
  category!: string;

  @Column("simple-array")
  tags!: string[];

  @Column()
  brand!: string;

  @Column()
  color!: string;

  @Column()
  size!: string;

  @Column()
  condition!: string;

  @Column()
  sex?: string;
}
