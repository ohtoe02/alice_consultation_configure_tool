import styles from "./LogsPage.module.scss"
import UserLogs from "../App/UserLogs/UserLogs"
import Loader from "../App/Loader/Loader"
import { getDatabase, ref, get, child } from "firebase/database";
import React, {useEffect, useState} from "react";


const LogsPage = () => {
    const [usersLogs, setUsersLogs] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        document.title = "Запросы"
        const fetchData = async () => {
            try {
                const db = getDatabase();
                const items = (await get(child(ref(db), 'requests/users'))).val() || {};

                const res: Object[] = [];
                Object.keys(items).map(key => (res.push(items[key])))
                // @ts-ignore
                setUsersLogs(res)
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
                Запросы
            </div>
            {loading && <Loader />}
            <div className={styles['logs-wrapper']}>
                {usersLogs.map((records, idx) => {
                    const key = "request";
                    const recList: any[] = []
                    Object.keys(records).map(key => (recList.push(records[key])))
                    // @ts-ignore
                    const arrayUniqueByKey = [...new Map(recList.map(item =>
                        [item[key], item])).values()];
                    return (<UserLogs records={arrayUniqueByKey.sort(function(a, b){
                        if(a.firstname < b.firstname) { return -1; }
                        if(a.firstname > b.firstname) { return 1; }
                        return 0;
                    })} key={idx}/>)
                })}
            </div>
        </div>
    )
}

export default LogsPage