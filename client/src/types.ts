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

export type ProductData = {
  id?: string | null;
  name: string;
  price: string;
  img: File | null;
  gender: string;
  categoryId: string;
  brandId: string;
  info: { title: string; description: string }[];
  discount?: number | null;
  discountStartDate?: string | null;
  discountEndDate?: string | null;
};

type IdentifiableOption = {
  id: number;
  name: string;
};

export type Brand = IdentifiableOption;
export type Category = IdentifiableOption;

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

export type INotificationContext = {
  notification: string;
  showNotification: (message: string) => void;
};

export type modalContextProps = {
  isModalActive: boolean;
  setModalActive: (active: boolean) => void;
  modalContent: React.ReactNode | null;
  setModalContent: React.Dispatch<React.SetStateAction<React.ReactNode | null>>;
};

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

export type FiltersType = {
  categoryId: string[];
  brandId: string[];
  gender: string;
  minPrice: number;
  maxPrice: number;
};
