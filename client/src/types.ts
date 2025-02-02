import { ReactNode } from "react";

export type Children = {
  children?: ReactNode;
};

export type DropdownOption = {
  link: string;
  label: string;
};

export type DropdownOptions = {
  title: string;
  options: DropdownOption[];
};

export type Product = {
  id: number;
  name: string;
  price: number;
  rating: number;
  img: string;
  gender: string;
  createdAt: string;
  updatedAt: string;
  categoryId: number;
  brandId: number;
  brand: string;
};

export type Brand = {
  id: number;
  name: string;
};

export type CounterProps = {
  count: number;
  onChange: (value: number) => void;
};

export type AuthResponse = {
  token: string;
};

export type AuthData = {
  username: string;
  email: string;
  password: string;
};

export interface INotificationContext {
  notification: string;
  showNotification: (message: string) => void;
}

export type InfoItem = {
  id: number;
  title: string;
  description: string;
};

export type CartItemType = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  img: string;
  size: string;
  cartId: number;
  productId: number;
  product: Product;
};
