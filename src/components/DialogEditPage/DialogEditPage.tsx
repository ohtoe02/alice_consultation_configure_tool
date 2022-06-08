import styles from "./DialogEditPage.module.scss"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import {child, get, getDatabase, ref, update} from "firebase/database";
import Loader from "../App/Loader/Loader"
import Snackbar from '@mui/material/Snackbar';
import {capitalize} from "@mui/material";
import Alert from '@mui/material/Alert';

// @ts-ignore
const DialogEditPage = () => {
    const { dialogType, dialogID } = useParams();
    const [dialog, setDialog] = useState({
        request: '',
        response: '',
    })
    const [inputs, setInputs] = useState({
        request: '',
        response: '',
    });

    const [loading, setLoading] = useState(true)
    const [isSuccess, setIsSuccess] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const db = getDatabase();
                const dialog = (await get(child(ref(db), `dialogs/general/${dialogType}_dialogs/${dialogID}`))).val() || {};
                setDialog(dialog);

                setInputs({...dialog})
            }
            catch (e) {
                console.log(e)
            }

            setLoading(false)
        }

        fetchData();
    }, [dialogID, dialogType])

    const handleInputUpdate = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const submitForm = async (e: any) => {
        e.preventDefault();

        const db = getDatabase()

        await update(child(ref(db), `dialogs/general/${dialogType}_dialogs/${dialogID}`), {...inputs})

        setIsSuccess(true)
        const dialog = (await get(child(ref(db), `dialogs/general/${dialogType}_dialogs/${dialogID}`))).val() || {};
        setDialog(dialog);

        setInputs({...dialog})
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
                            "{dialog.request}"
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
                            Диалог был успешно изменен!
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
                                    <input className={[styles.input, styles["default-height"]].join(' ')} value={inputs.response} name={"response"} onChange={e => handleInputUpdate(e)} required/>
                                </label>
                                <div className={styles["button-wrapper"]}>
                                    <button className={styles["submit-button"]} type={"submit"} value={"Submit"} >
                                        Изменить
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

export default DialogEditPage