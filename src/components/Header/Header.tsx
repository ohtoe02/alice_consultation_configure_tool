import styles from "./Header.module.scss"
import React from "react";
import { Link } from "react-router-dom"

const menu = [
    {
        title: "Параметры",
        link: "/",
    },
    {
        title: "Добавить",
        link: "/",
    },
    {
        title: "Диалоги",
        link: "dialogs",
    },
    {
        title: "Дисциплины",
        link: "/",
    },
    {
        title: "Институты",
        link: "/",
    },
    {
        title: "Выход",
        link: "/",
    },
]

const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.wrapper}>
                <ul className={styles.menu}>
                    {menu.map((item, idx) => (
                        <li key={idx}>
                            <Link to={item.link}>{item.title}</Link>
                            <div />
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles["navbar-underline"]} />
        </div>
    )
};

export default Header;