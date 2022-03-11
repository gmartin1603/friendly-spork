const style = {
    header: {
        container: 'flex justify-center items-end bg-todayGreen h-16 fixed top-0 left-0 w-screen',
        nav: 'flex p-.01 w-.5 px-.2',
        tab: 'bg-white mx-.05 py-.01 px-.02',
    },
    tableHead: {
        norm: 'bg-green p-.02 w-28 min-w-max',
        today: 'bg-todayGreen text-white p-.01 w-28',
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
    button: `cursor-pointer h-max w-max text-center rounded p-10  bg-todayGreen font-bold shadow-xl m-.01 text-white `
}
export const header = style.header;
export const tableHead = style.tableHead;
export const tableRow = style.tableRow;
export const tableFoot = style.tableFoot;
export default style;