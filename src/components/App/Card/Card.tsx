import styles from "./Card.module.scss"
import React from "react";

// @ts-ignore
const Card = ({title, imgUrl}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <img src={imgUrl} alt={title} className={styles.image} />
                <span className={styles["darken-bottom"]} />
                <div className={styles.title}>
                    {title}
                </div>
            </div>
            <div className={styles.underline} />
        </div>
    )
};

export default Card;