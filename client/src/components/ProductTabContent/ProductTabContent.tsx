import {
  useCreateProductMutation,
  useGetBrandsQuery,
  useGetCategoriesQuery,
} from "../../redux/productsApi";
import styles from "../Modal/Modal.module.scss";
import "../../sharedStyles.scss";
import React, { useContext, useState } from "react";
import { Brand, Category, ProductData } from "../../types";
import { NotificationContext } from "../../HOC/NotificationProvider";
import { ModalContext } from "../../HOC/ModalProvider";
import { handleInput } from "../../utils/formHandlers";

export const ProductTabContent = () => {
  const { showNotification } = useContext(NotificationContext);
  const { setModalActive } = useContext(ModalContext);
  const { data: brands, isLoading: isBrandsLoading } = useGetBrandsQuery("");
  const { data: categories, isLoading: isCategoriesLoading } =
    useGetCategoriesQuery("");
  const [createProduct] = useCreateProductMutation();

  const initialData = {
    name: "",
    price: "",
    img: null,
    gender: "",
    brandId: "",
    categoryId: "",
    info: [
      { title: "about", description: "" },
      { title: "details", description: "" },
    ],
  };

  const [productData, setProductData] = useState<ProductData>(initialData);

  if (isBrandsLoading || isCategoriesLoading)
    return <div className="loader"></div>;

  const handleInfo = (
    index: number,
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    const updatedInfo = productData.info.map((item, i) =>
      i === index ? { ...item, description: value } : item
    );

    setProductData((prev) => ({
      ...prev,
      info: updatedInfo,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(productData).forEach(([key, value]) => {
      if (key === "info")
        formData.append(key, JSON.stringify(productData.info));
      else if (value instanceof File || typeof value === "string") {
        formData.append(key, value);
      }
    });

    try {
      const result = await createProduct(formData).unwrap();
      showNotification(result.message);

      setTimeout(() => {
        setProductData(initialData);
        setModalActive(false);
      }, 3020);
    } catch (err) {
      showNotification("Error in creating the product");
    }
  };

  return (
    <form className={styles.tabContent} onSubmit={handleSubmit}>
      <div className={styles.inputWrap}>
        <label htmlFor="" className={styles.label}>
          Name
        </label>
        <input
          required
          type="text"
          placeholder="Enter product name"
          name="name"
          value={productData.name}
          onChange={(e) => handleInput(e, setProductData)}
        />
      </div>
      <div className={styles.inputWrap}>
        <label htmlFor="" className={styles.label}>
          Price
        </label>
        <input
          required
          type="number"
          placeholder="Enter product price"
          name="price"
          value={productData.price}
          onChange={(e) => {
            const value = e.target.value;
            if (Number(value) > 0 || value === "") {
              handleInput(e, setProductData);
            }
          }}
        />
      </div>
      <div className={styles.inputWrap}>
        <label htmlFor="gender" className={styles.label}>
          Image
        </label>
        <label className={styles.inputLabel}>
          <input
            id="upload-btn"
            required
            type="file"
            name="img"
            onChange={(e) => {
              const file = e.target.files?.[0] ?? null;
              setProductData({ ...productData, img: file });
            }}
          />
          <span>{productData.img ? productData.img.name : "Upload Image"}</span>
        </label>
      </div>
      <div className={styles.inputWrap}>
        <label htmlFor="gender" className={styles.label}>
          Gender
        </label>
        <select
          name="gender"
          id="gender"
          onChange={(e) => handleInput(e, setProductData)}
          required
          value={productData.gender}
        >
          <option value="" disabled hidden>
            Select...
          </option>
          <option value="female">female</option>
          <option value="male">male</option>
        </select>
      </div>
      <div className={styles.inputWrap}>
        <label htmlFor="brandId" className={styles.label}>
          Brand
        </label>
        <select
          name="brandId"
          id="brandId"
          onChange={(e) => handleInput(e, setProductData)}
          required
          value={productData.brandId}
        >
          <option value="" disabled hidden>
            Select...
          </option>
          {brands.map((b: Brand) => (
            <option key={b.id} value={b.id} id={String(b.id)}>
              {b.name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.inputWrap}>
        <label htmlFor="" className={styles.label}>
          Category
        </label>
        <select
          name="categoryId"
          id=""
          onChange={(e) => handleInput(e, setProductData)}
          value={productData.categoryId}
        >
          <option value="" disabled hidden>
            Select...
          </option>
          {categories.map((c: Category) => (
            <option value={c.id} id={String(c.id)}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <label className={`${styles.label} ${styles.label_info}`}>
        Product Info
      </label>
      {productData.info.map((i, index) => (
        <div className={styles.inputWrap}>
          <div className={styles.label}>Title</div>
          <div className="">"{i.title}"</div>
          <div className={styles.label}>Description</div>
          <textarea
            name="description"
            id=""
            onChange={(e) => handleInfo(index, e)}
            rows={4}
            value={i.description}
          />
        </div>
      ))}

      <button type="submit" className={`primary-btn ${styles.tabContent_btn}`}>
        Create
      </button>
    </form>
  );
};
