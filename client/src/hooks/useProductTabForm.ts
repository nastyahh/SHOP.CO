import {
  useCreateProductMutation,
  useGetOneProductQuery,
  useUpdateProductMutation,
} from "@/redux/productsApi";
import { ProductData } from "@/types";
import { useDebounce } from "@/utils/helpers";
import { useEffect, useState } from "react";

export const useProductTabForm = ({ createMode }) => {
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const initialData = createMode
    ? {
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
        discount: null,
        discountStartDate: null,
        discountEndDate: null,
      }
    : {
        id: null,
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
        discount: null,
        discountStartDate: null,
        discountEndDate: null,
      };

  const [productData, setProductData] = useState<ProductData>(initialData);
  const debouncedId = useDebounce(productData.id, 900);

  const { data } = useGetOneProductQuery(debouncedId || "", {
    skip: !debouncedId,
  });

  useEffect(() => {
    if (data && !createMode && data.product) {
      setProductData({
        ...data.product,
        info: data.product.info?.length
          ? data.product.info
          : [
              { title: "about", description: "" },
              { title: "details", description: "" },
            ],
        discount: data.product.discount,
        discountStartDate:
          data.product.discountStartDate &&
          data.product.discountStartDate.slice(0, 10),
        discountEndDate:
          data.product.discountEndDate &&
          data.product.discountEndDate.slice(0, 10),
      });
    }
  }, [data]);

  return {
    initialData,
    productData,
    setProductData,
    createProduct,
    updateProduct,
    data,
  };
};
