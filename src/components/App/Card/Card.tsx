import styles from "./Card.module.scss"
import React from "react";
import { Link } from "react-router-dom"


// @ts-ignore
const Card = ({title, imgUrl, dialogID=''}) => {
    return (
        <div className={styles.wrapper}>
            <Link to={dialogID} className={styles.card}>
                <img src={imgUrl} alt={title} className={styles.image} width={320} height={200} />
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