import { useParams } from "react-router";
import "../../sharedStyles.scss";
import { useGetOneProductQuery } from "../../redux/productsApi";
import "../../sharedStyles.scss";
import styles from "./Product.module.scss";
import { StarRating } from "../../ui-components/StarRating/StarRating";

export const Product = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetOneProductQuery(id);

  if (!data) {
    return <div>Product not found</div>;
  }

  const { name, img, rating, price } = data.product;

  const sizes = ["S", "M", "L", "XL"];

  console.log(data);
  return (
    <div className={styles.product}>
      <div className="container">
        {isLoading ? (
          <div>loading</div>
        ) : (
          <div className={styles.productWrap}>
            <img src={`http://localhost:5000/${img}`} alt="Photo" />
            <div className={styles.productDescr}>
              <h2 className="title">{name}</h2>
              <StarRating rating={rating} />
              <p className={styles.product_price}>{price}$</p>
              <div className={styles.product_sizeWrap}>
                <h3 className={styles.product_label}>Choose Size</h3>
                <div className={styles.product_sizes}>
                  {sizes.map((size, index) => (
                    <button key={`size-${index}`} className="primary-btn">
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
