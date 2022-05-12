import styles from "./DisciplineAddPage.module.scss"
import {BiLandscape} from "react-icons/bi";
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import {child, get, getDatabase, push, ref, set} from "firebase/database";
import Loader from "../App/Loader/Loader";
import {Simulate} from "react-dom/test-utils";

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
    const [uploading, setUploading] = useState(false)

    const [loading, setLoading] = useState(true)

    useEffect(() => {setLoading(false)}, [])
    
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

        const discipline = await push(ref(db, `dialogs/courses`), template)
        await set(ref(db, `refs/${discipline.key}`), discipline.key)
        await set(ref(db, `dialogs/courses/${discipline.key}/id`), discipline.key)

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
                    <div className={styles["editing-window"]}>
                        <form className={styles.form} onSubmit={e => submitForm(e)}>
                            <label>
                                Название*
                                <input className={styles.input} name={"title"} onChange={e => handleInputUpdate(e)} required/>
                            </label>
                            <label>
                                Номер*
                                <input className={styles.input} name={"number"} onChange={e => handleInputUpdate(e)} required/>
                            </label>
                            <label className={styles.wide}>
                                Полное описание*
                                <textarea className={styles.input} name={"full_description"} onChange={e => handleInputUpdate(e)} required/>
                            </label>
                            <label className={styles.wide}>
                                Краткое описание*
                                <textarea className={[styles.input, styles["default-height"]].join(' ')} name={"short_description"} onChange={e => handleInputUpdate(e)} required/>
                            </label>
                            <label>
                                Форма обучения
                                <input className={styles.input} name={"edu_form"} onChange={e => handleInputUpdate(e)}/>
                            </label>
                            <label>
                                Бюджетных мест
                                <input className={styles.input} name={"budget_places"} onChange={e => handleInputUpdate(e)}/>
                            </label>
                            <label>
                                Стоимость
                                <input className={styles.input} name={"price"} onChange={e => handleInputUpdate(e)}/>
                            </label>
                            <label>
                                Проходной балл в 2021
                                <input className={styles.input} name={"pass_score"} onChange={e => handleInputUpdate(e)}/>
                            </label>
                            <label className={styles.wide}>
                                Руководитель
                                <input className={styles.input} name={"leader"} onChange={e => handleInputUpdate(e)}/>
                            </label>
                            <div className={styles["button-wrapper"]}>
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