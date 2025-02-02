import { useParams } from "react-router";
import "../../sharedStyles.scss";
import {
  useAddToCartMutation,
  useGetOneProductQuery,
} from "../../redux/productsApi";
import "../../sharedStyles.scss";
import styles from "./Product.module.scss";
import { StarRating } from "../../ui-components/StarRating/StarRating";
import { useContext, useState } from "react";
import { Counter } from "../../ui-components/Counter/Counter";
import { ProductDetails } from "../../ui-components/ProductDetails/ProductDetails";
import { Tabs } from "../../ui-components/Tabs/Tabs";
import { Reviews } from "../../ui-components/Reviews/Reviews";
import { InfoItem } from "../../types";
import { useAppSelector } from "../../hooks/typedHooks";
import { NotificationContext } from "../../HOC/NotificationProvider";
import { SizeSelector } from "../../ui-components/SizeSelector/SizeSelector";

export const Product = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetOneProductQuery(id);
  const [productSize, setProductSize] = useState("");
  const [productCount, setProductCount] = useState(0);
  const user = useAppSelector((state) => state.user.userData);
  const [addToCart] = useAddToCartMutation();
  const { showNotification } = useContext(NotificationContext);
  const isAuth = useAppSelector((state) => state.user.isAuth);

  if (!data) return <div>Product not found</div>;

  const { name, img, rating, price, brand, info } = data.product;

  const aboutInfo = info.find((item: InfoItem) => item.title === "about");
  const details = info.find((item: InfoItem) => item.title === "details");

  const tabs = [
    {
      title: "Product Details",
      content: details ? (
        <ProductDetails content={details.description} />
      ) : (
        <div>No details available</div>
      ),
    },
    { title: "Rating", content: <Reviews reviews={data.ratings} /> },
  ];

  const handleCart = () => {
    if (!isAuth) return showNotification("You need to login");
    if (!productSize) return showNotification("You need to choose a size");
    if (productCount === 0) return showNotification("Specify the quantity");

    addToCart({
      userId: user.id,
      productId: id,
      quantity: productCount,
      size: productSize,
    });
    showNotification("Product added to your cart");
  };

  return (
    <div className={styles.product}>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <div className="container">
          <div className={styles.productWrap}>
            <img
              src={`http://localhost:5000/${img}`}
              alt="Photo"
              className={styles.product_img}
            />
            <div className={styles.productDescr}>
              <h2 className={`title ${styles.product_name}`}>{name}</h2>
              <p className={styles.product_brand}>{brand.name}</p>
              <StarRating rating={rating} starSize={24} />
              <p className={`${styles.product_label} ${styles.product_about}`}>
                {aboutInfo?.description}
              </p>
              <p className={styles.product_price}>{price}$</p>
              <div className={styles.product_sizeWrap}>
                <h3 className={styles.product_label}>Choose Size</h3>
                <SizeSelector
                  sizes={["S", "M", "L", "XL"]}
                  onSizeSelect={setProductSize}
                  selectedSize={productSize}
                />
              </div>
              <div className={styles.product_actions}>
                <Counter count={productCount} onChange={setProductCount} />
                <button
                  className={`primary-btn ${styles.product_cartBtn}`}
                  onClick={handleCart}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
          <Tabs items={tabs} />
        </div>
      )}
    </div>
  );
};
