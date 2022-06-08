import styles from "./DisciplineEditPage.module.scss"
import {BiLandscape} from "react-icons/bi";
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import {child, get, getDatabase, ref, update, remove, set} from "firebase/database";
import Loader from "../App/Loader/Loader"
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

// @ts-ignore
const DisciplineEditPage = () => {
    const { dialogID } = useParams();
    const [dialog, setDialog] = useState({
        title: '',
        full_description: '',
        short_description: '',
        number: '',
        id: '',
        params: {
            budget_places: '',
            price: '',
            edu_form: '',
            leader: '',
            pass_score: ''
        },
    })
    const [inputs, setInputs] = useState({
        title: '',
        budget_places: '',
        full_description: '',
        short_description: '',
        number: '',
        pass_score: '',
        price: '',
        leader: '',
        edu_form: '',
    });

    const [loading, setLoading] = useState(true)
    const [isSuccess, setIsSuccess] = useState(false)


    useEffect(() => {
        const fetchData = async () => {
            try {
                const db = getDatabase();
                const dialog = (await get(child(ref(db), `dialogs/courses/${dialogID}`))).val() || {};

                setDialog(dialog)
                setInputs(values => ({...values, "title": dialog.title}))
                setInputs(values => ({...values, "budget_places": dialog.params.budget_places}))
                setInputs(values => ({...values, "full_description": dialog.full_description}))
                setInputs(values => ({...values, "short_description": dialog.short_description}))
                setInputs(values => ({...values, "number": dialog.number}))
                setInputs(values => ({...values, "pass_score": dialog.params.pass_score}))
                setInputs(values => ({...values, "price": dialog.params.price}))
                setInputs(values => ({...values, "leader": dialog.params.leader}))
                setInputs(values => ({...values, "edu_form": dialog.params.edu_form}))
            }
            catch (e) {
                console.log(e)
            }

            setLoading(false)
        }

        fetchData();
    }, [dialogID])

    const handleInputUpdate = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const submitForm = async (e: any) => {
        e.preventDefault();
        const template = {
            title: inputs.title,
            full_description: inputs.full_description,
            short_description: inputs.short_description,
            number: inputs.number,
            params: {
                budget_places: inputs.budget_places,
                price: inputs.price,
                edu_form: inputs.edu_form,
                leader: inputs.leader,
                pass_score: inputs.pass_score
            }
        };

        const db = getDatabase()

        await update(child(ref(db), `dialogs/courses/${dialog.id}`), template)
        await remove(child(ref(db), `refs/${dialog.id}`))
        await set(ref(db, `refs/${template.title}`), dialog.id)
        setIsSuccess(true)
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
                : <>
                    <div className={styles["change-form-header"]}>
                        <div style={{alignItems: "end"}} className={styles["header-text"]}>
                            {dialog.title}
                        </div>
                        <div className={styles["preview-pic"]}>
                            <BiLandscape size={"40"}/>
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
                            Дисциплина была успешно изменена!
                        </Alert>
                    </Snackbar>
                    <div className={styles["editing-window"]}>
                        <form className={styles.form} onSubmit={e => submitForm(e)}>
                            <label>
                                Название*
                                <input className={styles.input} value={inputs.title} name={"title"} onChange={e => handleInputUpdate(e)} required/>
                            </label>
                            <label>
                                Номер*
                                <input className={styles.input} value={inputs.number} name={"number"} onChange={e => handleInputUpdate(e)} required/>
                            </label>
                            <label className={styles.wide}>
                                Полное описание*
                                <textarea maxLength={1023} className={styles.input} value={inputs.full_description} name={"full_description"} onChange={e => handleInputUpdate(e)} required/>
                            </label>
                            <label className={styles.wide}>
                                Краткое описание*
                                <input className={[styles.input, styles["default-height"]].join(' ')} type={"text"} maxLength={1023} value={inputs.short_description} name={"short_description"} onChange={e => handleInputUpdate(e)} required/>
                            </label>
                            <label>
                                Форма обучения
                                <input className={styles.input} value={inputs.edu_form} name={"edu_form"} onChange={e => handleInputUpdate(e)}/>
                            </label>
                            <label>
                                Бюджетных мест
                                <input className={styles.input} value={inputs.budget_places} name={"budget_places"} onChange={e => handleInputUpdate(e)}/>
                            </label>
                            <label>
                                Стоимость
                                <input className={styles.input} value={inputs.price} name={"price"} onChange={e => handleInputUpdate(e)}/>
                            </label>
                            <label>
                                Проходной балл в 2021
                                <input className={styles.input} value={inputs.pass_score} name={"pass_score"} onChange={e => handleInputUpdate(e)}/>
                            </label>
                            <label className={styles.wide}>
                                Руководитель
                                <input className={styles.input} value={inputs.leader} name={"leader"} onChange={e => handleInputUpdate(e)}/>
                            </label>
                            <div className={styles["button-wrapper"]}>
                                <button className={styles["submit-button"]} type={"submit"} value={"Submit"} >
                                    Изменить
                                </button>
                            </div>
                        </form>

                        <div className={styles.preview}>
                            <div className={styles.request}>
                                {inputs.title ? inputs.title : "Название учебной дисциплины" }
                            </div>
                            <div className={styles.response}>
                                {inputs.title ? <p>{inputs.title}</p> : <p>Название учебной дисциплины</p>}
                                {inputs.short_description && <p>{inputs.short_description}</p>}
                                {inputs.edu_form && <p>Форма обучения: {inputs.edu_form}</p>}
                                {inputs.price && <p>Контрактное обучение стоит: {inputs.price}</p>}
                                {inputs.budget_places && <p>Всего бюджетных мест: {inputs.budget_places}</p>}
                                {inputs.pass_score && <p>Проходной балл ЕГЭ в прошлом году был: {inputs.pass_score}</p>}
                            </div>
                            <div className={styles["preview-alert"]}>
                                Предварительный просмотр
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default DisciplineEditPage