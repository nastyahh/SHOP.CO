import styles from "./CartItem.module.scss";
import { ReactComponent as Delete } from "../../assets/delete.svg";
import { BASE_IMG_URL } from "../../utils/consts";
import { useDeleteCartItemMutation } from "../../redux/productsApi";
import { useAppSelector } from "../../hooks/typedHooks";
import { Link } from "react-router";
import { CartItemType } from "../../types";

export const CartItem = ({
  productId,
  name,
  price,
  quantity,
  size,
  img,
}: Pick<
  CartItemType,
  "productId" | "name" | "price" | "quantity" | "size" | "img"
>) => {
  const [deleteCartItem] = useDeleteCartItemMutation();
  const user = useAppSelector((state) => state.user.userData);

  return (
    <Link to={`/product/${productId}`} className={styles.cartItem}>
      <div className={styles.cartItem_info}>
        <img
          src={`${BASE_IMG_URL}${img}`}
          alt="image"
          className={styles.cartItem_img}
        />
        <div className={styles.cartItem_descr}>
          <p className={styles.cartItem_name}>{name}</p>
          <p className={styles.cartItem_properties}>
            Size: <span>{size}</span>
          </p>
          <p className={styles.cartItem_price}>${price}</p>
        </div>
      </div>
      <div className={styles.cartItem_actions}>
        <button
          onClick={(e) => {
            e.preventDefault();
            deleteCartItem({ userId: user.id, productId, quantity, size });
          }}
        >
          <Delete />
        </button>
        <p>{quantity}</p>
      </div>
    </Link>
  );
};
