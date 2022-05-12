import React from "react"
import styles from "./Loader.module.scss"
import {CircularProgress} from "@mui/material";

const Loader = () => {
    return (
        <div className={styles.loader}>
            <CircularProgress size={128} thickness={1} color={"error"} />
            <CircularProgress size={96} thickness={2} color={"error"} />
            <CircularProgress size={64} thickness={4} color={"error"} />
            <CircularProgress size={32} thickness={8} color={"error"} />
        </div>
    )
}

export default Loader