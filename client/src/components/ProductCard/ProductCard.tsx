import { Link } from "react-router";
import styles from "./ProductCard.module.scss";
import { Product } from "../../types";

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className={styles.productCard}>
      <Link to={`/${product.id}`}>
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
