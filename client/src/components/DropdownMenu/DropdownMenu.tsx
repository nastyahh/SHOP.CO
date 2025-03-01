import styles from "./DropdownMenu.module.scss";
import { Link } from "react-router";
import { ReactComponent as Arrow } from "../../assets/dropdown-arrow.svg";
import { DropdownOptions } from "../../types";

export const DropdownMenu = ({ title, options }: DropdownOptions) => {
  return (
    <div className={styles.dropdownWrap}>
      <button className={styles.dropdown_btn}>
        {title} <Arrow className={styles.dropdown_arrow} />
      </button>
      <div className={styles.dropdown_menu}>
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
