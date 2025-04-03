import { Brand } from "../types";

export const findBrand = (brandsData: Brand[], brandId: number | undefined) => {
  if (!brandsData || !brandId) {
    return "Unknown Brand";
  }

  const brand = brandsData.find((brand: Brand) => brand.id === brandId);
  return brand ? brand.name : "Unknown Brand";
};
