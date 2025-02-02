import {
  useGetBrandsQuery,
  useGetProductsQuery,
} from "../../../redux/productsApi";
import "../../../App.css";
import styles from "./Arrivals.module.scss";
import { ProductCard } from "../../ProductCard/ProductCard";
import { Brand, Product } from "../../../types";
import { useState } from "react";
import { findBrand } from "../../../utils/findBrand";

export const Arrivals = () => {
  const { data: productsData, isLoading: isProductsLoading } =
    useGetProductsQuery("");
  const { data: brandsData, isLoading: isBrandsLoading } =
    useGetBrandsQuery("");

  const [visibleProducts, setVisibleProducts] = useState(4);

  if (isProductsLoading || isBrandsLoading) {
    return null;
  }

  const products = productsData.rows.slice(-12).map((product: Product) => {
    const brand = findBrand(brandsData, product.brandId);
    return {
      ...product,
      brand,
    };
  });

  const displayedProducts = products.slice(0, visibleProducts);

  return (
    <div className="container">
      <h2 className="title">NEW ARRIVALS</h2>
      <div className={styles.productsWrap}>
        {isProductsLoading || isBrandsLoading ? (
          <div>loading...</div>
        ) : (
          displayedProducts.map((product: Product) => {
            return (
              <ProductCard
                key={product.id}
                product={product}
                className={styles.arrivals_card}
              />
            );
          })
        )}
      </div>
      {visibleProducts < products.length && (
        <button
          className="action-btn"
          onClick={() => setVisibleProducts((prev) => prev + 4)}
        >
          Load more
        </button>
      )}
    </div>
  );
};
