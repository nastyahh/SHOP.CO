import styles from "./Cart.module.scss";
import { useAppSelector } from "../../hooks/typedHooks";
import { useGetCartQuery } from "../../redux/productsApi";
import "../../sharedStyles.scss";
import { CartItem } from "../../components/CartItem/CartItem";
import { CartItemType } from "../../types";

export const Cart = () => {
  const user = useAppSelector((state) => state.user.userData);
  const { data } = useGetCartQuery(user.id);

  if (!data) return null;

  const totalSumm = data.cart_products.reduce(
    (summ: number, p: CartItemType) => (summ += p.product.price * p.quantity),
    0
  );

  const deliverySumm = totalSumm > 150 ? "FREE" : "10$";

  return (
    <div className={styles.cart}>
      <div className="container">
        <h2 className="title">Your cart</h2>
        <div className={styles.cart_wrap}>
          <div className={styles.cart_products}>
            {data.cart_products.map((p: CartItemType) => (
              <CartItem
                productId={p.product.id}
                name={p.product.name}
                price={p.product.price}
                quantity={p.quantity}
                size={p.size}
                img={p.product.img}
              />
            ))}
          </div>
          <div className={styles.cart_summary}>
            <h3 className="">Order Summary</h3>
            <div className={`${styles.cart_delivery} ${styles.cart_row}`}>
              <p>Delivery Fee</p>
              <div className={styles.cart_delivery__summ}>{deliverySumm}</div>
            </div>
            <div className={styles.cart_summary__footer}>
              <div className={`${styles.cart_row}`}>
                <span>Total</span>
                <h4 className={styles.cart_total}>${totalSumm}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
