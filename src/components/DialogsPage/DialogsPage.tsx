import styles from "./DialogsPage.module.scss"
import React, {useEffect, useState} from "react";
import Button from "@mui/material/Button"
import Loader from "../App/Loader/Loader"
import {getDatabase, ref, get, child,  remove} from "firebase/database";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {ButtonGroup, capitalize, createTheme, ThemeProvider, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {ruRU} from "@mui/material/locale";
import {useNavigate} from "react-router-dom";

// @ts-ignore
const DialogList = ({dialogs, type, parentCallback}) => {
    let navigate = useNavigate();
    const [selected, setSelected] = useState([])

    useEffect(() => {
        setSelected([])
    }, [])

    const getTypeTitle :any = {
        "service": "Фраза для активации",
        "custom": "Ключевые слова"
    }

    const columns: GridColDef[] = [
        {field: 'request', headerName: getTypeTitle[type], type: "string", flex: 1},
        {field: 'response', headerName: 'Ответ', type: "string", flex: 1},
    ]

    const rows = dialogs.map((dialog: any, idx: any) => {
        return {id: idx+1, key: dialog["key"], request: capitalize(dialog["request"]), response: capitalize(dialog["response"])}
    })

    const handleClick = (event: any) => {
        if (event.field === '__check__')
            return
        navigate(`/dialogs/edit/${type}/${event.row.key}`)
    }

    const theme = createTheme({
        palette: {
            red: {
                main: '#ef584c',
                contrastText: '#fff',
            },
        },
    },ruRU);

    const handleSelection = (selection: any) => {
        let res: any[] = []
        setSelected(selection)
        if (selection.length > 0) {
            selection.forEach((item: any) => {
                res.push(rows[item - 1])
            })
        }
        parentCallback(res)
    }

    // @ts-ignore
    return (
                <div>
                    <ThemeProvider theme={theme}>
                        <DataGrid
                            columns={columns}
                            rows={rows}
                            pageSize={10}
                            autoHeight
                            onSelectionModelChange={handleSelection}
                            selectionModel={selected}
                            localeText={{
                                noRowsLabel: 'Диалоги отсутствуют',
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
                                filterOperatorAfter: 'после',
                                filterOperatorOnOrAfter: 'после или в этом же месте',
                                filterOperatorBefore: 'раньше',
                                filterOperatorOnOrBefore: 'раньше или на этом же месте',
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
                            disableSelectionOnClick
                            checkboxSelection
                            hideFooterSelectedRowCount
                            onRowDoubleClick={handleClick}
                            sx={{
                                width: "100%",
                                fontSize: "1rem",
                                fontFamily: "Inter, serif",
                                background: "#FFF",
                                filter: "drop-shadow(0 0 16px rgba(0, 0, 0, 0.15))",
                                borderRadius: "8px",
                                ">*": {
                                    userSelect: "none"
                                }
                            }}
                        />
                    </ThemeProvider>
                </div>
    )

}

// @ts-ignore
const DialogsPage = () => {
    const [service_dialogs, setServiceDialogs] = useState([])
    const [custom_dialogs, setCustomDialogs] = useState([])
    const [selectedRows, setSelectedRows] = useState([])
    const [loading, setLoading] = useState(true)
    const [dialogType, setDialogType] = useState("service")
    let navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const database = getDatabase();
            const items = (await get(child(ref(database), 'dialogs/general'))).val() || {};

            let res : Object[] =  []
            Object.keys(items["custom_dialogs"]).map(dialogId => (
                res.push({key: dialogId, ...items["custom_dialogs"][dialogId]})
            ))
            // @ts-ignore
            setCustomDialogs(res);
            res = []
            Object.keys(items["service_dialogs"]).map(dialogId => (
                res.push({key: dialogId, ...items["service_dialogs"][dialogId]})
                ))

            // @ts-ignore
            setServiceDialogs(res)
        }

        fetchData();
        setLoading(false);
    }, [])

    const changeFilter = (event: any, value: string) => {
        if (value !== null)
            setDialogType(value)
    }

    const clickAddHandler = () => {
        navigate(`/dialogs/add/${dialogType}/`)
    }

    const clickRemoveHandler = async () => {
        const db = getDatabase()

        for (let item of selectedRows) {
            // @ts-ignore
            await remove(child(ref(db), `dialogs/general/${dialogType}_dialogs/${item.key}`))
        }

        setSelectedRows([])

        const res : Object[] =  []
        const items = (await get(child(ref(db), `dialogs/general/${dialogType}_dialogs`))).val() || {};
        Object.keys(items).map(dialogId => (
            res.push({key: dialogId, ...items[dialogId]})
        ))
        // @ts-ignore
        dialogType === 'service' ? setServiceDialogs(res) : setCustomDialogs(res)
    }


    const clickEditHandler = () => {
        // @ts-ignore
        navigate(`/dialogs/edit/${dialogType}/${selectedRows[0].key}`)
    }

    const onSelectHandler = (count: any) => {
        setSelectedRows(count)
    }

    const dataGrids :any = {
        'custom': <DialogList dialogs={custom_dialogs} parentCallback={onSelectHandler} type={dialogType}/>,
        'service': <DialogList dialogs={service_dialogs} parentCallback={onSelectHandler} type={dialogType}/>
    }

    const titles : any = {
        "service": "Диалоги с точной фразой",
        "custom": "Диалоги с ключевыми словами",
    }

    return (
        <div className={styles.container}>
            {loading ? <Loader /> :
                <div>
                    <div className={styles["header-text"]}>
                        { titles[dialogType] }
                    </div>
                    <div style={{display: "flex", justifyContent: "space-between", padding: "16px 0", gap: "16px", flexWrap: "wrap"}}>
                        <ToggleButtonGroup
                            value={dialogType}
                            size={"small"}
                            exclusive
                            onChange={changeFilter}
                            aria-label="text alignment"
                            sx={{fontFamily: "Inter, serif"}}
                        >
                            <ToggleButton value={"service"} aria-label="left aligned" sx={{fontFamily: "Inter, serif"}}>
                                Точные фразы
                            </ToggleButton>
                            <ToggleButton value={"custom"} aria-label="right aligned" sx={{fontFamily: "Inter, serif"}}>
                                По ключевым словам
                            </ToggleButton>
                        </ToggleButtonGroup>
                        <div style={{display: "flex", gap: "16px"}}>
                            <ButtonGroup>
                                <Button sx={{marginTop: "1rem", fontFamily: "Inter, serif"}} variant="contained" color={"warning"} onClick={clickRemoveHandler} disabled={selectedRows.length <= 0}>Удалить</Button>
                                <Button sx={{marginTop: "1rem", fontFamily: "Inter, serif"}} variant="contained" color={"secondary"} onClick={clickEditHandler} disabled={selectedRows.length !== 1}>Изменить</Button>
                            </ButtonGroup>
                            <Button sx={{marginTop: "1rem", fontFamily: "Inter, serif"}} variant="contained" onClick={clickAddHandler}>Добавить диалог</Button>
                        </div>
                    </div>
                    <div style={{margin: "auto", width: "100%"}}>
                        { dataGrids[dialogType] }
                    </div>
                </div>
            }
        </div>
    )
}

export default DialogsPage