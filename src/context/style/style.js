const style = {
    header: {
        container: 'select-none flex justify-center items-end bg-todayGreen h-16 fixed top-0 left-0 w-screen',
        nav: 'flex p-.01 w-.5 px-.2',
        tab: 'bg-white border py-.01 px-.02',
        tab_active: 'bg-todayGreen',
        logOut: 'bg-red p-2 rounded-2xl text-base font-bold text-white border-black',
    },
    tableHead: {
        pos: 'bg-green px-.01  min-w-max w-110',
        norm: 'bg-green px-.01  min-w-max w-100',
        today: 'bg-todayGreen text-white px-.01 min-w-max w-100',
    },
    tableRow: {
        shift: 'text-white bg-green ',
        labelCell: 'bg-purple p-.02',
        cellNorm: 'cursor-pointer ',
        cellPend: 'bg-yellow ',
        cellClosed: 'bg-green ',
    },
    tableCell: {
        forced: 'text-red text-bold',
    },
    tableFoot: {

    },
    button: `select-none cursor-pointer h-max w-max text-center rounded p-.02  bg-todayGreen font-bold shadow-xl m-.01 text-white`,
    checkBox: {
        standard: ``,
        disabled: ``,
        active: ``,
        selected: ``,
        hover: ``,
    }
}

export const header = style.header;
export const tableHead = style.tableHead;
export const tableRow = style.tableRow;
export const tableFoot = style.tableFoot;
export const checkBox = style.checkBox;
export default style;