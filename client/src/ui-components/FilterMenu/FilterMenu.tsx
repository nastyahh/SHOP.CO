import "../../sharedStyles.scss";
import React, { useEffect, useState } from "react";
import {
  useGetBrandsQuery,
  useGetCategoriesQuery,
} from "../../redux/productsApi";
import styles from "./FilterMenu.module.scss";
import Slider from "react-slider";
import { Brand, FiltersType } from "../../types";
import { useDebounce } from "@/utils/helpers";
import { useSearchParams } from "react-router";

const MAX = 10000;
const MIN = 10;

export const FilterMenu = ({ filters, setFilters }) => {
  const [priceValues, setPriceValues] = useState([MIN, MAX]);
  const { data: categories } = useGetCategoriesQuery("");
  const { data: brands } = useGetBrandsQuery("");
  const debouncedPrice = useDebounce(priceValues);
  const [, setSearchParams] = useSearchParams();

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFilters((prevFilters: FiltersType) => ({
        ...prevFilters,
        [name]: checked
          ? [...prevFilters[name], value]
          : prevFilters[name].filter((item) => item !== value),
      }));
    }
    if (type === "radio") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    setFilters((prevFilters: FiltersType) => ({
      ...prevFilters,
      minPrice: debouncedPrice[0],
      maxPrice: debouncedPrice[1],
    }));
  }, [debouncedPrice]);

  const resetFilters = () => {
    setFilters({
      categoryId: [],
      brandId: [],
      gender: "",
    });
    setPriceValues([MIN, MAX]);
    setSearchParams({});
  };

  return (
    <form className={styles.filterMenu}>
      <h2>Filters</h2>
      <label>Choose Categories</label>
      <ul className={styles.filterMenu_list}>
        {categories?.map((c) => (
          <div className={styles.filterMenu_option}>
            <li key={c.id}>{c.name}</li>
            <input
              type="checkbox"
              value={c.id}
              name="categoryId"
              onChange={handleFilterChange}
              checked={filters.categoryId.includes(String(c.id))}
            />
          </div>
        ))}
      </ul>
      <div className={styles.filterMenu_priceWrap}>
        <label>Price</label>
        <div className={styles.filterMenu_priceWrap__values}>
          from <span>{priceValues[0]}$</span> to <span>{priceValues[1]}$</span>
        </div>
        <Slider
          className="price_slider"
          value={priceValues}
          min={MIN}
          max={MAX}
          onChange={(e) => setPriceValues(e)}
        />
      </div>
      <label>Choose Brands</label>
      <ul className={styles.filterMenu_list}>
        <hr />
        {brands?.map((b: Brand) => (
          <div className={styles.filterMenu_option}>
            <li key={b.id}>{b.name}</li>
            <input
              type="checkbox"
              name="brandId"
              value={b.id}
              onChange={handleFilterChange}
              checked={filters.brandId.includes(String(b.id))}
            />
          </div>
        ))}
      </ul>
      <label>Gender</label>
      <div className={`${styles.inputWrap} ${styles.gender}`}>
        <div className={styles.inputWrap}>
          <label htmlFor="">Men</label>
          <input
            type="radio"
            value="male"
            name="gender"
            checked={filters.gender === "male"}
            onChange={handleFilterChange}
          />
        </div>
        <div className={styles.inputWrap}>
          <label htmlFor="">Woman</label>
          <input
            type="radio"
            value="female"
            name="gender"
            checked={filters.gender === "female"}
            onChange={handleFilterChange}
          />
        </div>
      </div>
      <button
        type="button"
        className={`primary-btn ${styles.resetBtn}`}
        onClick={resetFilters}
      >
        Reset Filters
      </button>
    </form>
  );
};
