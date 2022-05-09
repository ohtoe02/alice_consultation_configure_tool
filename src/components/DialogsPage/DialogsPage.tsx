import styles from "./DialogsPage.module.scss"
import Card from "../App/Card/Card"
import AddCard from "../App/Card/AddCard"

const states = [
    {
        title: "Диалог 1",
        imgURL: "https://images.unsplash.com/photo-1651241969075-367e4f80fd7f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=689&q=80"
    },
    {
        title: "Диалог 2",
        imgURL: "https://images.unsplash.com/photo-1650393771173-73b07d3fe9f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
    },
    {
        title: "Диалог 3",
        imgURL: "https://images.unsplash.com/photo-1650421495518-909969ad51d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80"
    },
    {
        title: "Диалог 4",
        imgURL: "https://images.unsplash.com/photo-1613679658857-6288ffe49d9c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
    },
    {
        title: "Диалог 5",
        imgURL: "https://images.unsplash.com/photo-1637408990228-08f245ac4e83?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1451&q=80"
    },
]

// @ts-ignore
const DialogsPage = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles["header-text"]}>
                Диалоги
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

export default DialogsPage