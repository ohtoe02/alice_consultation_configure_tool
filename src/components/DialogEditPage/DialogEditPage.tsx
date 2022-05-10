import styles from "./DialogEditPage.module.scss"
import {BiLandscape} from "react-icons/bi";
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import {child, get, getDatabase, ref} from "firebase/database";
import {LinearProgress} from "@mui/material";

// @ts-ignore
const DialogEditPage = () => {
    const { dialogID } = useParams();

    const [dialog, setDialog] = useState({
        title: 'undefined',
        description: '',
        short_description: '',
        number: '',
        params: {
            budget_places: '',
            cost: '',
            leader: '',
            pass_score: ''
        },
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const db = getDatabase();
                const dialog = (await get(child(ref(db), `dialogs/${dialogID}`))).val() || {};

                setDialog(dialog)
            }
            catch (e) {
                console.log(e)
            }

            setLoading(false)
        }

        fetchData();
    }, [dialogID])



    return (
        <div className={styles.container}>
            {loading ? <div className={styles.loader}><LinearProgress color={"error"}/></div>
                : <>
                    <div className={styles["change-form-header"]}>
                        <div style={{alignItems: "end"}} className={styles["header-text"]}>
                            {/*Изменить<br/>диалог */}
                            {dialog.title}
                        </div>
                        <div className={styles["preview-pic"]}>
                            <BiLandscape size={"40"}/>
                        </div>
                    </div>
                    <div className={styles.form}>
                        <label>
                            Название
                            <input value={dialog.title} />
                        </label>
                        <label>
                            Полное описание
                            <input value={dialog.description}/>
                        </label>
                        <label>
                            Краткое описание
                            <input value={dialog.short_description}/>
                        </label>
                        <label>
                            Номер
                            <input value={dialog.number}/>
                        </label>
                        <label>
                            Бюджетных мест
                            <input value={dialog.params.budget_places}/>
                        </label>
                        <label>
                            Стоимость
                            <input value={dialog.params.cost}/>
                        </label>
                        <label>
                            Руководитель
                            <input value={dialog.params.leader}/>
                        </label>
                        <label>
                            Проходной балл в 2021
                            <input value={dialog.params.pass_score}/>
                        </label>
                    </div>
                </>
            }
        </div>
    )
}

export default DialogEditPage