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
import notFoundImg from "@/assets/not-found.jpg";

const MAX = 10000;
const MIN = 10;

export const Catalog = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const searchParams = queryParams.get("search") || "";
  const { data: brandsData, isLoading: BrandsDataLoading } = useGetBrandsQuery(
    {}
  );

  const [filters, setFilters] = useState<FiltersType>({
    categoryId: queryParams.getAll("categoryId") || [],
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

  const products = productsData?.products.map((product: Product) => {
    const brand = findBrand(brandsData, product.brandId);

    return {
      ...product,
      brand,
    };
  });

  const searchProducts = products?.filter((p: Product) =>
    p.name.includes(searchParams)
  );

  return (
    <div className={`container ${styles.catalogWrap}`}>
      <div className={styles.catalog}>
        <div className={styles.catalog_filterWrap}>
          <FilterMenu filters={filters} setFilters={setFilters} />
        </div>
        {searchProducts?.length > 0 ? (
          <Masonry className="productsGrid" breakpointCols={{ default: 3 }}>
            {searchProducts?.map((p: Product) => (
              <div className="productsGrid_item">
                <ProductCard product={p} />
              </div>
            ))}
          </Masonry>
        ) : (
          <img src={notFoundImg} className={styles.img_notFound} />
        )}
      </div>{" "}
      <Pagination
        page={page}
        setPage={setPage}
        totalCountPages={productsData?.totalCountPages}
      />
    </div>
  );
};
