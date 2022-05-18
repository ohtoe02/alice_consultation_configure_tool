import styles from "./UserLogs.module.scss"
import React from "react";
import { Link } from "react-router-dom"
import {Collapse, List, ListItem, ListItemText, ThemeProvider} from "@mui/material";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';


// @ts-ignore
const Log = ({record}) => {
    const [isOpen, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!isOpen);
    }

    return (
        <div style={{marginBottom: "16px"}}>
            <ListItem className={styles['record-request']} onClick={handleClick}>
                <ListItemText primary={record.request} sx={{"& .MuiTypography-root": {fontFamily: "Inter, serif"}, "&:first-letter": {textTransform: "capitalize"}}} />
                {isOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={isOpen} timeout={"auto"} unmountOnExit>
                <List component={"div"}>
                    <ListItem className={styles['record-response']}>
                        <ListItemText primary={record.response} sx={{"& .MuiTypography-root": {fontFamily: "Inter, serif"}}}/>
                    </ListItem>
                </List>
            </Collapse>
        </div>
    )
}

// @ts-ignore
const UserLogs = ({records}) => {

    // const recList: any[] = []
    // Object.keys(records).map(key => (recList.push(records[key])))


    return (
        <div className={styles.wrapper}>
            <List style={{width: "100%"}}>
                {records.map((record: any, idx: React.Key | null | undefined) =>
                    (record.request
                        ? <Log record={record} key={idx} />
                        : '')
                )}
            </List>
        </div>
    )
};

export default UserLogs;