import {
  useGetBrandsQuery,
  useGetProductsQuery,
} from "../../../redux/productsApi";
import "../../../App.css";
import styles from "./Arrivals.module.scss";
import { ProductCard } from "../../ProductCard/ProductCard";
import { Brand, Product } from "../../../types";
import { useState } from "react";

export const Arrivals = () => {
  const { data: productsData, isLoading: isProductsLoading } =
    useGetProductsQuery("");
  const { data: brandsData, isLoading: isBrandsLoading } =
    useGetBrandsQuery("");

  const [visibleProducts, setVisibleProducts] = useState(1);

  if (isProductsLoading || isBrandsLoading) {
    return null;
  }

  const products = productsData.rows.slice(-12).map((product: Product) => {
    const brand = brandsData.find((b: Brand) => b.id === product.brandId);
    return {
      ...product,
      brand: brand.name,
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
            return <ProductCard key={product.id} product={product} />;
          })
        )}
      </div>
      {visibleProducts < products.length && (
        <button
          className="action-btn"
          onClick={() => setVisibleProducts((prev) => prev + 1)}
        >
          Load more
        </button>
      )}
    </div>
  );
};
