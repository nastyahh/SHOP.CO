import styles from "./Collections.module.scss";
import "@/sharedStyles.scss";
import img1 from "@/assets/collections-1.png";
import img2 from "@/assets/collections-2.png";
import img3 from "@/assets/collections-3.png";
import img4 from "@/assets/collections-4.png";

export const Collections = () => {
  return (
    <div className={styles.collections}>
      <div className="container">
        <h1 className="title">Collections</h1>
        <div className={styles.collections_row}>
          <div className={styles.imgWrap}>
            <img src={img1} alt="" />
            <img src={img2} alt="" />
          </div>
          <div className={styles.collections_descr}>
            <h3>Jaket Collection</h3>
            <p>
              Elegant, stylish and impeccably tailored, our jacket collection is
              designed for those who value quality and sophistication. From
              classic to contemporary styles, each jacket will enhance your
              look, adding status and confidence. The perfect choice for any
              occasion!
            </p>
            <a
              href="/catalog?categoryId=1"
              className={`primary-btn ${styles.collections_link}`}
            >
              View more
            </a>
          </div>
        </div>
        <div className={styles.collections_row}>
          <div className={styles.collections_descr}>
            <h3>Coat Collection</h3>
            <p>
              Discover perfectly tailored wool coats for every look to our
              bestselling leather trench coat - the ultimate piece for updating
              your evening cover up.
            </p>
            <a
              href="/catalog?categoryId=13"
              className={`primary-btn ${styles.collections_link}`}
            >
              View more
            </a>
          </div>
          <img src={img3} alt="" />
        </div>
        <div className={styles.collections_row}>
          <img src={img4} alt="" />
          <div className={styles.collections_descr}>
            <h3>Pants Collection</h3>
            <p>
              Discover a collection of stylish and comfortable pants designed
              for the fast-paced lifestyle. From elegant classics to casual
              options, each design combines comfort, quality and current trends.
              Express your individuality with impeccable fits and modern
              silhouettes!
            </p>
            <a
              href="/catalog?categoryId=5"
              className={`primary-btn ${styles.collections_link}`}
            >
              View more
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
