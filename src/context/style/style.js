const style = {
    
    header: {
        container: 'sticky top-0 left-0 select-none flex justify-center items-end bg-todayGreen h-16  w-screen',
        nav: 'flex p-.01 w-.5 px-.2',
        tab: 'bg-white border py-.01 px-.02',
        tab_active: 'bg-todayGreen',
        logOut: 'bg-red p-2 rounded-2xl text-base font-bold text-white border-black',
    },
    table:{
        frame: `select-none
                flex-column 
                min-h-screen
                w-screen
                overflow-x-auto 
                p-.01 rounded-md 
                text-xl font-semibold
                bg-green 
                shadow-lg
                `, 
        table: `w-full min-w-max border-2 rounded overflow-scroll`,
        head: {
            pos: 'bg-green p-.01 text-white min-w-max w-110',
            norm: 'bg-green p-.01 text-white min-w-max w-100',
            today: 'bg-todayGreen text-white p-.01 min-w-max w-100',
        },
        row: { 
            shift: 'text-white bg-green ',
            labelCell: 'bg-purple p-.02',
            cellNorm: 'cursor-pointer ',
            cellPend: 'bg-yellow ',
            cellClosed: 'bg-green ',
            postTag: 'text-center font-bold'
        },
        cell: {
            forced: 'text-red text-bold',
        },
        foot: {
            mobile: `flex flex-col-reverse w-full h-max items-center`,
            full: `w-full flex justify-around`,
        },
    },
    button: {
        green:`
        h-max min-w-max 
        m-.01 px-.02 py-7 
        rounded 
        select-none 
        cursor-pointer 
        text-center 
        font-bold 
        text-white
        text-lg
        shadow-xl 
        bg-todayGreen 
        disabled:bg-gray-light
        disabled:cursor-none
        `,
        red:`
        h-max min-w-max 
        m-.01 py-7  
        rounded 
        select-none cursor-pointer 
        text-center 
        font-bold 
        text-white
        text-lg
        shadow-xl
        bg-red 
        disabled:cursor-none 
        `,
        greenText: `
        h-max w-max 
        m-.01 px-.02 py-.01
        select-none 
        cursor-pointer 
        text-center 
        text-lg
        font-extrabold 
        text-todayGreen
        rounded-xl
        border
        border-clear
        hover:border-todayGreen 
        `,
        redText: `
        h-max w-max 
        m-.01 px-.02 py-5
        select-none 
        cursor-pointer 
        text-center 
        text-lg
        font-extrabold 
        text-red
        rounded-xl
        border
        border-clear
        hover:border-red 
        `
        
    },
    checkBox: {
        standard: ``,
        disabled: ``,
        active: ``,
        selected: ``,
        hover: ``,
    },
    popUp: {
        backDrop: `
        h-full
        w-full
        fixed
        top-0 left-0
        z-10
        bg-clearBlack
        flex
        items-center
        justify-center
        `,
        form: `
        text-todayGreen
        bg-white
        h-max
        w-400
        mt-.02
        p-.02
        rounded-xl
        flex-column
        
        `,
    },
}

export const header = style.header;
export const table = style.table;
export const head = style.head;
export const row = style.how;
export const foot = style.foot;
export const checkBox = style.checkBox;
export const button = style.button;
export const popUp = style.popUp;
export default style;