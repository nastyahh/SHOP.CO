import { useState } from "react";
import styles from "./Tabs.module.scss";

export const Tabs = ({ items }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={styles.tabs}>
      <div className={styles.tabs_header}>
        {items.map((item, index) => (
          <button
            className={`${styles.tabs_item} ${
              activeTab === index ? styles.active : ""
            }`}
            key={item.title}
            onClick={() => setActiveTab(index)}
          >
            {item.title}
          </button>
        ))}
      </div>
      <div className={styles.tabs_content}>{items[activeTab].content}</div>
    </div>
  );
};
