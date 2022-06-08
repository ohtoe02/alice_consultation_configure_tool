import styles from "./Card.module.scss"
import React from "react";
import { Link } from "react-router-dom"


// @ts-ignore
const Card = ({title, imgUrl, dialogID=''}) => {
    return (
        <div className={styles.wrapper}>
            <Link to={`disciplines/${dialogID}`} className={styles.card}>
                <img src={imgUrl ? imgUrl : "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Computer-science-education.jpg/1024px-Computer-science-education.jpg"} alt={title} className={styles.image} width={320} height={200}/>
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