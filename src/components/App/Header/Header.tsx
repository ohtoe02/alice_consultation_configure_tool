import styles from "./Header.module.scss"
import "./Header.css"
import React from "react";
import { NavLink } from "react-router-dom"

const menu = [
    // {
    //     title: "Параметры",
    //     link: "/",
    // },
    {
        title: "Добавить",
        link: "new-discipline",
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
        title: "Запросы",
        link: "logs",
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
                <NavLink key={idx} className={styles["nav-link"]} to={item.link}>{item.title}<div className={styles.chosen} /></NavLink>
            ))}
            <div className={styles["navbar-underline"]} />
        </header>
    )
};

export default Header;