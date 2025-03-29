import { Tabs } from "@/ui-components/Tabs/Tabs";
import { OptionTabContent } from "../OptionTabContent/OptionTabContent";
import { ProductTabContent } from "../ProductTabContent/ProductTabContent";
import { useState } from "react";
import {
  useCreateBrandMutation,
  useCreateCategoryMutation,
} from "@/redux/productsApi";

export const AdminModal = () => {
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
    <>
      <h1 className="title">admin panel</h1>
      <Tabs items={tabs} />
    </>
  );
};
