import Header from "../components/App/Header/Header"
import { Outlet } from "react-router-dom"
import styles from "./MainLayout.module.scss"


const MainLayout = () => {
    return (
        <div className={styles.layout} >
            <Header />

            <Outlet />
        </div>
    )
};

export default MainLayout;