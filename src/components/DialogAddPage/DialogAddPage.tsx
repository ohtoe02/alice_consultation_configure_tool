import styles from "./DialogAddPage.module.scss"
import {BiLandscape} from "react-icons/bi";

// @ts-ignore
const DialogAddPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles["change-form-header"]}>
                <div className={styles["header-text"]}>
                    Добавить учебную<br />дисциплину
                </div>
                <div className={styles["preview-pic"]}>
                    <BiLandscape size={"40"} />
                </div>
            </div>
            <div className={styles.form}>
                <label>
                    Название
                    <input/>
                </label>
                <label>
                    Описание
                    <input/>
                </label>

            </div>
        </div>
    )
}

export default DialogAddPage