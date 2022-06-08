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
                Object.keys(items).map(key => {
                    Object.keys(items[key]).map(reqId => {
                        res.push(items[key][reqId])
                    })
                })
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

    const getUniqueItems = () => {
        // @ts-ignore
        const arrayUniqueByKey = [...new Map(usersLogs.map(item =>
            [item["request"], item])).values()];
        return arrayUniqueByKey.sort(function(a, b){
            if(a.request < b.request) { return -1; }
            if(a.request > b.request) { return 1; }
            return 0;
        });
    }


    return (
        <div className={styles.container}>
            <div className={styles["header-text"]}>
                Запросы
            </div>
            {loading && <Loader />}
            <div className={styles['logs-wrapper']}>
                <UserLogs records={getUniqueItems()} loading={loading} />
            </div>
        </div>
    )
}

export default LogsPage