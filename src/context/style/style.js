const style = {
    button: {
        std:`
        min-h-min min-w-max
        select-none
        cursor-pointer
        text-center
        shadow
        shadow-clearBlack
        `,
        green:`
        min-h-min min-w-max
        rounded
        select-none
        cursor-pointer
        text-center
        font-semibold
        text-white
        bg-todayGreen
        border-2
        border-clearBlack
        disabled:bg-gray-light
        disabled:cursor-none
        disabled:border-gray-light
        `,
        blue:`
        min-h-min min-w-max
        select-none
        cursor-pointer
        text-center
        shadow
        shadow-clearBlack
        bg-blue
        `,
        red:`
        min-h-max min-w-max
        rounded
        select-none cursor-pointer
        text-center
        font-semibold
        text-white
        shadow-xl
        bg-red
        border-2
        border-clearBlack
        hover:drop-shadow-lg
        disabled:bg-gray-light
        disabled:cursor-none
        disabled:border-gray-light
        disabled:drop-shadow-none
        `,
        greenText: `
        h-max w-max
        m-.01 px-.02 py-.01
        select-none
        cursor-pointer
        text-center
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
    input: {
        text: `w-full focus:outline-none text-black text-center font-semibold text-xl border-b border-l bg-white`,
        valiTag: `text-red text-sm font-semibold`,
        checkBox: ``,
        select: ``,
        option: ``,
    },

}

export const header = style.header;
export const input = style.input;
export const button = style.button;
export default style;