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
        imgURL: "https://images.twinkl.co.uk/tw1n/image/private/t_630/image_repo/9d/62/T-S-2469-My-One-Page-Profile-Secondary.jpg"
    },
]

// @ts-ignore
const StatesPage = () => {
    return (
        <div className={styles.container}>
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