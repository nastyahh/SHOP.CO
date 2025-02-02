import styles from "./ProductDetails.module.scss";

export const ProductDetails = ({ content }: { content: string }) => {
  const detailsItems = content.split(",");

  return (
    <div className={styles.details}>
      <h3 className={styles.details_title}>Details</h3>
      <ul className={styles.details_list}>
        {detailsItems.map((d, index) => (
          <li key={index}>{d}</li>
        ))}
      </ul>
    </div>
  );
};
