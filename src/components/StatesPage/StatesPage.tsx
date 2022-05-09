import styles from "./StatesPage.module.scss"
import Card from "../App/Card/Card"
import AddCard from "../App/Card/AddCard"

const states = [
    {
        title: "Главная",
        imgURL: "https://www.eecs.mit.edu/wp-content/uploads/2021/06/compscihero-1024x545.jpg"
    },
    {
        title: "Консультация",
        imgURL: "https://goodwix.com/wp-content/uploads/free-consultation.png"
    },
    {
        title: "Профиль",
        imgURL: "https://www.activetraffic.ru/upload/medialibrary/12e/12efaef75068c96be00f903dd8dda23c.png"
    },
]

// @ts-ignore
const StatesPage = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles["header-text"]}>
                Состояния диалога
            </div>
            <div className={styles['states-wrapper']}>
                {states.map((state, idx) => (
                    <Card title={state.title} imgUrl={state.imgURL} key={idx} />
                ))}
                <AddCard />
            </div>
        </div>
    )
}

export default StatesPage