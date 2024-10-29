import { Address } from "../Entities/Address";

export interface IAuthenticatable {
  id: string;
  role?: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  addresses: Address[];
  password: string;
  username: string;
  hashPassword: () => void;
  generateId: () => void;
}
