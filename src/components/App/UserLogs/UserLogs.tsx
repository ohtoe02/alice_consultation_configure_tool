import styles from "./UserLogs.module.scss"
import React, { useState, useEffect } from "react";
import Pagination from '@mui/material/Pagination';
import {Collapse, List, ListItem, ListItemText} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';


// @ts-ignore
const Log = ({record}) => {
    const [isOpen, setOpen] = useState(false);

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

declare module '@mui/material/styles' {
    interface Palette {
        red: Palette['primary'];
    }
    interface PaletteOptions {
        red: PaletteOptions['primary'];
    }
}

declare module '@mui/material/Pagination' {
    interface PaginationPropsColorOverrides {
        red: true;
    }
}

const theme = createTheme({
    palette: {
        red: {
            main: '#ef584c',
            contrastText: '#fff',
        },
    },
});

// @ts-ignore
const UserLogs = ({records}) => {
    // const recList: any[] = []
    // Object.keys(records).map(key => (recList.push(records[key])))
    const [currentData, setCurrentData] = useState([]);
    const [page, setPage] = useState(1);
    const [pageQty, setPageQty] = useState(0);
    const [itemsQty, setItemsQty] = useState(20);

    useEffect(() => {
        const records_count = records.length;
        const temp_pages = Math.ceil(records_count / itemsQty);
        setPageQty(temp_pages);
        const last_index = Math.min(itemsQty * page, records_count)
        const first_index = Math.max(itemsQty * (page - 1), 0);
        setCurrentData(records.slice(first_index, last_index))
    }, [itemsQty, page, pageQty, records]);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <div className={styles.wrapper}>
            <ThemeProvider theme={theme} >
                <Pagination style={{margin: "auto"}} page={page} count={pageQty} shape={"rounded"} variant={"outlined"} color={"red"} onChange={handlePageChange} />
            </ThemeProvider>
            <List style={{width: "100%"}}>
                {currentData.map((record: any, idx: React.Key | null | undefined) =>
                    (record.request
                        ? <Log record={record} key={idx} />
                        : '')
                )}
            </List>
            <ThemeProvider theme={theme} >
                <Pagination style={{margin: "auto"}} page={page} count={pageQty} shape={"rounded"} variant={"outlined"} color={"red"} onChange={handlePageChange} />
            </ThemeProvider>
        </div>
    )
};

export default UserLogs;