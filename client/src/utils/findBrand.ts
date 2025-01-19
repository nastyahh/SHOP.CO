import { Brand } from "../types";

export const findBrand = (brandsData: Brand[], brandId: number | undefined) => {
  return (
    brandsData.find((brand: Brand) => brand.id === brandId)?.name ||
    "Unknown Brand"
  );
};
