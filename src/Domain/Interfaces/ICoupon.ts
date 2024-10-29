import { ShopProduct } from "../Entities/ShopProduct";

export interface ICoupon {
    id: string;
    code: string;
    discount: number;
    startDate: Date;
    endDate: Date;
    minLimit: number;
    appliableProduct?: ShopProduct;
    appliableProducts?: ShopProduct[];
}