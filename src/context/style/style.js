const style = {
    header: {
        container: 'flex bg-todayGreen h-16 fixed top-0 left-0 w-screen',
        nav: 'flex ',
    },
    tableHead: {
        norm: 'bg-green p-.01 w-28',
        today: 'bg-todayGreen text-white p-.01 w-28',
    },
    tableRow: {
        shift: 'text-white bg-green ',
        labelCell: 'bg-purple p-.02',
        cellNorm: 'bg-blue p-.02',
        cellPend: 'bg-yellow ',
        cellClosed: 'bg-green ',
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