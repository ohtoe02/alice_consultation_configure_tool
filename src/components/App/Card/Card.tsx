import styles from "./Card.module.scss"
import React from "react";
import {Link, Route, Routes} from "react-router-dom"
import DialogEditPage from "../../DialogEditPage/DialogEditPage";


// @ts-ignore
const Card = ({title, imgUrl, dialogID=''}) => {
    return (
        <div className={styles.wrapper}>
            <Link to={dialogID} className={styles.card}>
                <img src={imgUrl} alt={title} className={styles.image} />
                <span className={styles["darken-bottom"]} />
                <div className={styles.title}>
                    {title}
                </div>
            </Link>
            <div className={styles.underline} />
        </div>
    )
};

export default Card;