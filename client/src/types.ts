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
  setCount: React.Dispatch<React.SetStateAction<number>>;
};
