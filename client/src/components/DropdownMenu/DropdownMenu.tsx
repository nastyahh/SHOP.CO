import styles from "./DropdownMenu.module.scss";
import { Link } from "react-router";
import { ReactComponent as Arrow } from "../../assets/dropdown-arrow.svg";
import { useState } from "react";
import { DropdownOptions } from "@/types";

export const DropdownMenu = ({ title, options }: DropdownOptions) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuShow = () => setIsOpen(true);
  const handleMenuHide = () => setIsOpen(false);

  return (
    <div className={styles.dropdownWrap}>
      <button className={styles.dropdown_btn} onClick={handleMenuShow}>
        {title}{" "}
        <Arrow
          className={`${styles.dropdown_arrow} ${isOpen ? styles.rotate : ""}`}
        />
      </button>
      <div
        className={`${styles.dropdown_menu} ${isOpen ? styles.show : ""}`}
        onMouseLeave={handleMenuHide}
      >
        {options.map((option, index) => (
          <Link
            to={option.link}
            key={index}
            className={styles.dropdown_menu__item}
          >
            {option.label}
          </Link>
        ))}
      </div>
    </div>
  );
};
