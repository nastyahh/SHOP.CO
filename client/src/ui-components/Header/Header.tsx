import React from "react";
import "../../sharedStyles.scss";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as Cart } from "../../assets/cart.svg";
import { ReactComponent as Profile } from "../../assets/profile.svg";
import { DropdownMenu } from "../../components/DropdownMenu/DropdownMenu";
import styles from "./Header.module.scss";
import { Link } from "react-router";

export const Header = () => {
  const dropdownOptions = [
    {
      link: "/men",
      label: "For Men",
    },
    {
      link: "/women",
      label: "For Women",
    },
  ];

  return (
    <div className="container">
      <header className={styles.header}>
        <div className={styles.header_left}>
          <Logo />
          <div className={styles.header_menuWrap}>
            <DropdownMenu title="Shop" options={dropdownOptions} />
            <a href="#">On Sale</a>
            <a href="#">New Arrivals</a>
          </div>
        </div>
        <div className={styles.header_right}>
          <Link to="/cart">
            <Cart />
          </Link>
          <Link to="/profile">
            <Profile />
          </Link>
        </div>
      </header>
    </div>
  );
};
