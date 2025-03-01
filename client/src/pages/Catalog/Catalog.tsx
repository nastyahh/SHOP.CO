import "../../sharedStyles.scss";
import Masonry from "react-masonry-css";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import {
  useGetBrandsQuery,
  useGetProductsQuery,
} from "../../redux/productsApi";
import styles from "./Catalog.module.scss";
import { FilterMenu } from "../../ui-components/FilterMenu/FilterMenu";
import { useState } from "react";
import { FiltersType, Product } from "../../types";
import { findBrand } from "../../utils/findBrand";
import { Pagination } from "../../components/Pagination/Pagination";
import { useLocation } from "react-router";

const MAX = 10000;
const MIN = 10;

export const Catalog = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const { data: brandsData } = useGetBrandsQuery({});

  const [filters, setFilters] = useState<FiltersType>({
    categoryId: [],
    brandId: queryParams.getAll("brandId") || [],
    gender: queryParams.get("gender") || "",
    minPrice: MIN,
    maxPrice: MAX,
  });

  const [page, setPage] = useState(1);

  const { data: productsData } = useGetProductsQuery({
    ...filters,
    page,
  });

  const products = productsData?.products.rows.map((product: Product) => {
    const brand = findBrand(brandsData, product.brandId);
    return {
      ...product,
      brand,
    };
  });

  return (
    <div className={`container ${styles.catalogWrap}`}>
      <div className={styles.catalog}>
        <div className={styles.catalog_filterWrap}>
          <FilterMenu filters={filters} setFilters={setFilters} />
        </div>
        <Masonry className="productsGrid" breakpointCols={{ default: 3 }}>
          {products?.map((p: Product) => (
            <div className="productsGrid_item">
              <ProductCard product={p} />
            </div>
          ))}
        </Masonry>
      </div>{" "}
      <Pagination
        page={page}
        setPage={setPage}
        totalCountPages={productsData?.totalCountPages}
      />
    </div>
  );
};
