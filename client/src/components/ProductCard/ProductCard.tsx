import { Link } from "react-router";
import styles from "./ProductCard.module.scss";
import { Product } from "../../types";
import { PRODUCT_ROUTE } from "../../utils/consts";

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className={styles.productCard}>
      <Link to={`${PRODUCT_ROUTE}/${product.id}`}>
        <img
          src={`http://localhost:5000/${product.img}`}
          alt=""
          className={styles.productCard_img}
        />

        <p className={styles.productCard_title}>{product.name}</p>
        <p className={styles.productCard_brand}>{product.brand}</p>
        <p className={styles.productCard_rating}>{product.rating}</p>
        <p className={styles.productCard_price}>{product.price}$</p>
      </Link>
    </div>
  );
};
