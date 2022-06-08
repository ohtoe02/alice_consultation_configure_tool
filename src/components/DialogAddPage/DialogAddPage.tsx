import styles from "./DialogAddPage.module.scss"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import {child, get, getDatabase, push, ref, set, update} from "firebase/database";
import Loader from "../App/Loader/Loader"
import {capitalize} from "@mui/material";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

// @ts-ignore
const DialogAddPage = () => {
    const { dialogType } = useParams();
    const [inputs, setInputs] = useState({
        request: '',
        response: '',
    });

    const [isSuccess, setIsSuccess] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {

            setLoading(false)
        }

        fetchData();
    }, [ dialogType])

    const handleInputUpdate = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const submitForm = async (e: any) => {
        e.preventDefault();

        const db = getDatabase()

        await push(ref(db, `dialogs/general/${dialogType}_dialogs`), {...inputs})

        setIsSuccess(true)
        setInputs({request: '', response: ''})
    }

    const handleClose = (event : any, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        setIsSuccess(false)
    }

    return (
        <div className={styles.container}>
            {loading
                ? <Loader />
                : <div>
                    <div className={styles["change-form-header"]}>
                        <div style={{alignItems: "end"}} className={styles["header-text"]}>
                            { dialogType === 'service' ? "Добавить новый диалог с точной фразой" : "Добавить новый диалог с ключевыми словами"}
                        </div>
                    </div>
                    <Snackbar
                        open={isSuccess}
                        autoHideDuration={3000}
                        onClose={handleClose}
                        message="Note archived"
                        anchorOrigin={{ vertical: "top", horizontal: "right"}}
                        key={"top" + "right"}
                    >
                        <Alert variant={"filled"} severity="success" sx={{background: "rgb(96,206,74)",fontFamily: "Inter, serif",  width: "fit-content"}}>
                            Диалог был успешно добавлен!
                        </Alert>
                    </Snackbar>
                    <div className={styles["dialog-edit-wrapper"]}>
                        <div className={styles["editing-window"]}>
                            <form className={styles.form} onSubmit={e => submitForm(e)}>
                                <label >
                                    {dialogType === 'service' ? "Фраза для активации*" : "Ключевые слова*"}
                                    <input className={styles.input} value={inputs.request} name={"request"} onChange={e => handleInputUpdate(e)} required/>
                                </label>
                                <label >
                                    Ответ*
                                    <input className={[styles.input, styles["default-height"]].join(' ')} maxLength={1023} value={inputs.response} name={"response"} onChange={e => handleInputUpdate(e)} required/>
                                </label>
                                <div className={styles["button-wrapper"]}>
                                    <button className={styles["submit-button"]} type={"submit"} value={"Submit"} >
                                        Добавить
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className={styles.preview}>
                            <div className={styles.request}>
                                {inputs.request ? capitalize(inputs.request) : "Текс запроса" }
                            </div>
                            <div className={styles.response}>
                                {inputs.response ? <p>{inputs.response}</p> : <p>Текст ответа</p>}
                            </div>
                            <div className={styles["preview-alert"]}>
                                Предварительный просмотр
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default DialogAddPage