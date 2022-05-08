import styles from "./Header.module.scss"
import React from "react";

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
        link: "/",
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
            {/*<div className="fixed flex flex-row w-4/5 justify-around h-16">*/}
            <div className={styles.wrapper}>
                <ul className={styles.menu}>
                    {menu.map((item, idx) => (
                        <li key={idx}>
                            <a href={item.link}>{item.title}</a>
                            <div />
                        </li>
                    ))}
                </ul>
                {/*<NavBarIcon icon={"Параметры"}/>*/}
                {/*<NavBarIcon icon={"Добавить"}/>*/}
                {/*<NavBarIcon icon={"Диалоги"}/>*/}
                {/*<NavBarIcon icon={"Дисциплины"}/>*/}
                {/*<NavBarIcon icon={"Институты"}/>*/}
                {/*<NavBarIcon icon={"Выход"}/>*/}
                <span className="navbar-underline" />
            </div>
        </div>
    )
};

// @ts-ignore
// const NavBarIcon = ( icon ) => {
//
//     return (
//         <div className="navbar-icon group">
//             <p>{icon}</p>
//             <span className={"navbar-chosen-item-underline group-hover:w-full"}/>
//         </div>
//     )
// }

export default Header;