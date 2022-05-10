import styles from "./Header.module.scss"
import "./Header.css"
import React from "react";
import { NavLink } from "react-router-dom"

const menu = [
    {
        title: "Параметры",
        link: "/",
    },
    {
        title: "Добавить",
        link: "dialog-edit",
    },
    {
        title: "Диалоги",
        link: "dialogs",
    },
    {
        title: "Дисциплины",
        link: "disciplines",
    },
    {
        title: "Институты",
        link: "institutes",
    },
    {
        title: "Выход",
        link: "exit",
    },
]

const Header = () => {
    return (
        <header className={styles.header}>
            {menu.map((item, idx) => (
                <NavLink className={styles["nav-link"]} to={item.link}>{item.title}<div className={styles.chosen} /></NavLink>
            ))}
            <div className={styles["navbar-underline"]} />
        </header>
    )
};

export default Header;