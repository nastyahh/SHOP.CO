import {
  useGetBrandsQuery,
  useGetCategoriesQuery,
} from "../../redux/productsApi";
import "../../sharedStyles.scss";
import React, { useContext, useState } from "react";
import { NotificationContext } from "../../HOC/NotificationProvider";
import { ModalContext } from "../../HOC/ModalProvider";
import { useProductTabForm } from "@/hooks/useProductTabForm";
import { ProductTabForm } from "@/ui-components/ProductTabForm/ProductTabForm";

export const ProductTabContent = () => {
  const [createMode, setCreateMode] = useState(true);
  const {
    initialData,
    productData,
    setProductData,
    createProduct,
    updateProduct,
    data,
  } = useProductTabForm({ createMode });
  const { showNotification } = useContext(NotificationContext);
  const { setModalActive } = useContext(ModalContext);
  const { data: brands, isLoading: isBrandsLoading } = useGetBrandsQuery("");
  const { data: categories, isLoading: isCategoriesLoading } =
    useGetCategoriesQuery("");

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
      else if (typeof value === "string" || typeof value === "number") {
        formData.append(key, String(value));
      } else if (value instanceof File) {
        formData.append(key, value);
      }
    });

    console.log("FormData entries:");
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    let result = { message: "" };

    if (createMode) {
      result = await createProduct(formData).unwrap();
    } else {
      result = await updateProduct(formData).unwrap();
    }
    showNotification(result.message);

    setTimeout(() => {
      setProductData(initialData);
      setModalActive(false);
    }, 3020);
  };

  return (
    <ProductTabForm
      createMode={createMode}
      setCreateMode={setCreateMode}
      handleSubmit={handleSubmit}
      handleInfo={handleInfo}
      data={data}
      categories={categories}
      brands={brands}
      productData={productData}
      setProductData={setProductData}
    />
  );
};
