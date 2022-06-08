import styles from "./DisciplineAddPage.module.scss"
import {BiLandscape} from "react-icons/bi";
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import {child, get, getDatabase, push, ref, set} from "firebase/database";
import Loader from "../App/Loader/Loader";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

// @ts-ignore
const DisciplineAddPage = () => {
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
    const [isSuccess, setIsSuccess] = useState(false)

    const [loading, setLoading] = useState(true)

    useEffect(() => {setLoading(false)}, [])
    
    const handleInputUpdate = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const resetForm = async (e: any) => {
        e.preventDefault();
        setInputs({
            title: '',
            budget_places: '',
            full_description: '',
            short_description: '',
            number: '',
            pass_score: '',
            price: '',
            leader: '',
            edu_form: '',
        })
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

        const discipline = await push(ref(db, `dialogs/courses`), template)
        await set(ref(db, `refs/${template.title}`), discipline.key)
        await set(ref(db, `dialogs/courses/${discipline.key}/id`), discipline.key)
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
                        <div className={styles["header-text"]}>
                            Добавить учебную<br />дисциплину
                        </div>
                        <div className={styles["preview-pic"]}>
                            <BiLandscape size={"40"} />
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
                            Дисциплина была успешно добавлена!
                        </Alert>
                    </Snackbar>
                    <div className={styles["editing-window"]}>
                        <form className={styles.form} onSubmit={e => submitForm(e)} onReset={e => resetForm(e)}>
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
                                <textarea className={styles.input} maxLength={1023} value={inputs.full_description} name={"full_description"} onChange={e => handleInputUpdate(e)} required/>
                            </label>
                            <label className={styles.wide}>
                                Краткое описание*
                                <textarea className={[styles.input, styles["default-height"]].join(' ')} maxLength={1023} value={inputs.short_description} name={"short_description"} onChange={e => handleInputUpdate(e)} required/>
                            </label>
                            <label>
                                Форма обучения
                                <input className={styles.input} name={"edu_form"} value={inputs.edu_form} onChange={e => handleInputUpdate(e)}/>
                            </label>
                            <label>
                                Бюджетных мест
                                <input className={styles.input} name={"budget_places"} value={inputs.budget_places} onChange={e => handleInputUpdate(e)}/>
                            </label>
                            <label>
                                Стоимость
                                <input className={styles.input} name={"price"} value={inputs.price} onChange={e => handleInputUpdate(e)}/>
                            </label>
                            <label>
                                Проходной балл в 2021
                                <input className={styles.input} name={"pass_score"} value={inputs.pass_score} onChange={e => handleInputUpdate(e)}/>
                            </label>
                            <label className={styles.wide}>
                                Руководитель
                                <input className={styles.input} name={"leader"} value={inputs.leader} onChange={e => handleInputUpdate(e)}/>
                            </label>
                            <div className={styles["button-wrapper"]}>
                                <button className={styles["reset-button"]} type={"reset"} value={"Reset"} >
                                    Сбросить
                                </button>
                                <button className={styles["submit-button"]} type={"submit"} value={"Submit"} >
                                    Добавить
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

export default DisciplineAddPage