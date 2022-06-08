import React, {useEffect, useState} from "react";
import {createTheme, ThemeProvider} from "@mui/material";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {ruRU} from "@mui/material/locale";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

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
const LogsList = ({logs}) => {
    const [logi, setLogi] = useState([
        {
            date: '',
            request: '',
            response: ''
        }
    ])

    const [isSuccess, setIsSuccess] = useState(false)


    useEffect(() => {
        if (logs.length > 0) {
            setLogi(logs)
        }
    }, [logs])

    const columns: GridColDef[] = [
        {field: 'request', headerName: 'Текст запроса', type: "string", flex: 3},
        {field: 'response', headerName: 'Ответ', type: "string", flex: 6},
        {field: 'date', headerName: 'Время', type: "dateTime", flex: 2},
    ]

    const parseDate = (date :string) => {
        let dateData = date.split(' ')
        dateData[0] = dateData[0].split('/').reverse().join('-')
        console.log(dateData.join('T'))
        return new Date(dateData.join('T'))
    }

    const rows = logi.map((log: any, idx: any) => {
        return {id: idx+1, request: log["request"], response: log["response"], date: (log["date"] ? parseDate(log["date"]) : '')}
    })

    const theme = createTheme(ruRU);

    const copyHandler = (event: any) => {
        if (event.field !== 'request') {
            return
        }

        navigator.clipboard.writeText(event.value)
        setIsSuccess(true)
    }

    const handleClose = (event : any, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        setIsSuccess(false)
    }


    // @ts-ignore
    return (
        <div style={{ height: "400px", width: "100%" }}>
            <Snackbar
                open={isSuccess}
                autoHideDuration={2000}
                onClose={handleClose}
                message="Text copied"
                anchorOrigin={{ vertical: "top", horizontal: "right"}}
                key={"top" + "right"}
            >
                <Alert variant={"filled"} severity="info" sx={{background: "rgb(2, 136, 209)",fontFamily: "Inter, serif",  width: "fit-content"}}>
                    Текст был скопирован!
                </Alert>
            </Snackbar>
            <ThemeProvider theme={theme} >
                <DataGrid
                    columns={columns}
                    rows={rows}
                    pageSize={10}
                    autoHeight
                    localeText={{
                        noRowsLabel: 'Запросы отсутствуют',
                        noResultsOverlayLabel: 'Результаты не были найдены.',
                        errorOverlayDefaultLabel: 'Произошла ошибка.',
                        footerTotalRows: 'Всего рядов:',
                        footerTotalVisibleRows: (visibleCount, totalCount) =>
                            `${visibleCount.toLocaleString()} из ${totalCount.toLocaleString()}`,
                        MuiTablePagination: {},
                        columnMenuLabel: 'Меню',
                        columnMenuShowColumns: 'Показать колонки',
                        columnMenuFilter: 'Отфильтровать',
                        columnMenuHideColumn: 'Скрыть',
                        columnMenuUnsort: 'Убрать сортировку',
                        columnMenuSortAsc: 'Сортировать по возрастанию',
                        columnMenuSortDesc: 'Сортировать по убыванию',
                        filterOperatorContains: 'содержит',
                        filterOperatorEquals: 'равно',
                        filterOperatorStartsWith: 'начинается с',
                        filterOperatorEndsWith: 'заканчивается на',
                        filterOperatorIs: 'равно',
                        filterOperatorNot: 'не равно',
                        filterOperatorAfter: 'позже',
                        filterOperatorOnOrAfter: 'позже или в это же время',
                        filterOperatorBefore: 'раньше',
                        filterOperatorOnOrBefore: 'раньше или в это же время',
                        filterOperatorIsEmpty: 'пустое',
                        filterOperatorIsNotEmpty: 'не пустое',
                        filterOperatorIsAnyOf: 'любое из',
                        filterPanelAddFilter: 'Добавить фильтр',
                        filterPanelDeleteIconLabel: 'Удалить',
                        filterPanelLinkOperator: 'Логический оператор',
                        filterPanelOperators: 'Фильтр',
                        filterPanelOperatorAnd: 'И',
                        filterPanelOperatorOr: 'Или',
                        filterPanelColumns: 'Колонка',
                        filterPanelInputLabel: 'Значение',
                        filterPanelInputPlaceholder: 'Значение фильтра',
                    }}
                    // disableColumnMenu
                    onCellDoubleClick={copyHandler}
                    disableSelectionOnClick
                    hideFooterSelectedRowCount
                    sx={{
                        width: "100%",
                        padding: "0 16px",
                        fontSize: "1rem",
                        fontFamily: "Inter, serif",
                        background: "#FFF",
                        filter: "drop-shadow(0 0 16px rgba(0, 0, 0, 0.15))",
                        borderRadius: "8px",
                        ">*": {
                            userSelect: "none",
                        }
                    }}
                />
            </ThemeProvider>
        </div>
    )
}

// @ts-ignore
const UserLogs = ({records, loading}) => {
    // const recList: any[] = []
    // Object.keys(records).map(key => (recList.push(records[key])))
    const [currentData, setCurrentData] = useState([]);
    const [logs, setLogs] = useState([{
        date: '',
        request: '',
        response: ''
    }]);
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
        setLogs(records)
    }, [itemsQty, page, pageQty, records]);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <>
            {(!loading && logs.length > 1) && <LogsList logs={logs}/>}
        </>
        // <div className={styles.wrapper}>
        //     <ThemeProvider theme={theme} >
        //         <Pagination style={{margin: "auto"}} page={page} count={pageQty} shape={"rounded"} variant={"outlined"} color={"red"} onChange={handlePageChange} />
        //     </ThemeProvider>
        //     <List style={{width: "100%"}}>
        //         {currentData.map((record: any, idx: React.Key | null | undefined) =>
        //             (record.request
        //                 ? <Log record={record} key={idx} />
        //                 : '')
        //         )}
        //     </List>
        //     <ThemeProvider theme={theme} >
        //         <Pagination style={{margin: "auto"}} page={page} count={pageQty} shape={"rounded"} variant={"outlined"} color={"red"} onChange={handlePageChange} />
        //     </ThemeProvider>
        // </div>
    )
};

export default UserLogs;