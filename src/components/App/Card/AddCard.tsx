import styles from "./Card.module.scss"
import React from "react";
import {VscAdd} from "react-icons/vsc";

const AddCard = () => {
    return (
        <div className={styles["add-card"]}>
            <VscAdd size={"64"} className={styles.plus}/>
        </div>
    )
};

export default AddCard;