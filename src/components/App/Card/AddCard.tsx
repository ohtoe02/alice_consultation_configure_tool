import styles from "./Card.module.scss"
import React from "react";
import {VscAdd} from "react-icons/vsc";
import { Link } from "react-router-dom"


const AddCard = () => {
    return (
        <Link to={"/new-discipline"} className={styles["add-card"]}>
            <VscAdd size={"64"} className={styles.plus}/>
        </Link>
    )
};

export default AddCard;