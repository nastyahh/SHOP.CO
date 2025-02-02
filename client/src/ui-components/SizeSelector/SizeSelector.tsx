import styles from "../../pages/Product/Product.module.scss";

type SizeSelectorType = {
  sizes: Array<string>;
  selectedSize: string;
  onSizeSelect: (value: string) => void;
};

export const SizeSelector = ({
  sizes,
  selectedSize,
  onSizeSelect,
}: SizeSelectorType) => {
  return (
    <div className={styles.product_sizes}>
      {sizes.map((size, index) => (
        <button
          key={`size-${index}`}
          className={`${styles.product_size} ${
            selectedSize === size ? styles.active : ""
          }`}
          onClick={() => onSizeSelect(size)}
        >
          {size}
        </button>
      ))}
    </div>
  );
};
