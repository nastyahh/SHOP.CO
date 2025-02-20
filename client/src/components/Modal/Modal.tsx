import { modalContextProps } from "../../types";
import styles from "./Modal.module.scss";
import "../../sharedStyles.scss";
import { Tabs } from "../../ui-components/Tabs/Tabs";
import { ProductTabContent } from "../ProductTabContent/ProductTabContent";
import { OptionTabContent } from "../OptionTabContent/OptionTabContent";
import {
  useCreateBrandMutation,
  useCreateCategoryMutation,
} from "../../redux/productsApi";
import { useState } from "react";

export const Modal = ({ isModalActive, setModalActive }: modalContextProps) => {
  const [brandData, setBrandData] = useState({ name: "" });
  const [categoryData, setCategoryData] = useState({ name: "" });
  const [createCategory] = useCreateCategoryMutation();
  const [createBrand] = useCreateBrandMutation();

  const tabs = [
    {
      title: "product",
      content: <ProductTabContent />,
    },
    {
      title: "categories",
      content: (
        <OptionTabContent
          type="category"
          mutation={createCategory}
          optionData={categoryData}
          setOptionData={setCategoryData}
        />
      ),
    },
    {
      title: "brands",
      content: (
        <OptionTabContent
          type="brand"
          mutation={createBrand}
          optionData={brandData}
          setOptionData={setBrandData}
        />
      ),
    },
  ];

  return (
    <div
      className={`${styles.modal} ${isModalActive ? styles.active : ""}`}
      onClick={() => setModalActive(false)}
    >
      <div
        className={styles.modal__content}
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="title">admin panel</h1>
        <Tabs items={tabs} />
      </div>
    </div>
  );
};
