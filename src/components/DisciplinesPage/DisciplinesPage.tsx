import styles from "./DisciplinesPage.module.scss"
import Card from "../App/Card/Card"
import AddCard from "../App/Card/AddCard"
import Loader from "../App/Loader/Loader"
import { getDatabase, ref, get, child } from "firebase/database";
import React, {useEffect, useState} from "react";


const DisciplinesPage = () => {
    const [dialogs, setDialogs] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const db = getDatabase();
                const items = (await get(child(ref(db), 'dialogs/courses'))).val() || {};

                const res: Object[] = [];
                Object.keys(items).map(key => (key === 'custom_dialogs' ? '' : res.push(items[key])))
                // @ts-ignore
                setDialogs(res)
            }
            catch (e) {
                console.log(e)
            }

            setLoading(false)
        }

        fetchData();
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles["header-text"]}>
                Диалоги
            </div>
            {loading && <Loader />}
            <div className={styles['states-wrapper']}>
                {dialogs.map((state, idx) => (
                    <Card title={state['title']} imgUrl={state['imgURL']} dialogID={state['id']} key={idx} />
                ))}
                {!loading && <AddCard /> }
            </div>
        </div>
    )
}

export default DisciplinesPage