import { Link } from "react-router";
import styles from "./ProductCard.module.scss";
import { Product } from "../../types";
import { PRODUCT_ROUTE } from "../../utils/consts";
import { StarRating } from "../../ui-components/StarRating/StarRating";

export const ProductCard = ({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) => {
  return (
    <div className={`${styles.productCard} ${className || ""}`}>
      <Link
        to={`${PRODUCT_ROUTE}/${product.id}`}
        className={styles.productCard_wrap}
      >
        <img
          src={`http://localhost:5000/${product.img}`}
          alt=""
          className={styles.productCard_img}
        />

        <p className={styles.productCard_title}>{product.name}</p>
        <p className={styles.productCard_brand}>{product.brand}</p>
        <StarRating rating={product.rating} starSize={18} />
        <p className={styles.productCard_price}>{product.price}$</p>
      </Link>
    </div>
  );
};
