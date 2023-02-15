import React, { useEffect, useState } from "react"
import { button } from "../../context/style/style";

const FillLine = ({seg, shift, state, handleClick}) => {

    const [nf, setNf] = useState(false);
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        // console.log("State from FillLine:", state)
        if (state.seg[seg]) {
            setDisabled(false)
            if (state.seg[seg].name === "N/F") {
                setNf(true)
            } else {
                setNf(false)
            }
        } else {
            setNf(false)
            setDisabled(true)
        }
    }, [state]);

    const styles = {
        check:`bg-[#AEB6BF] border-2 border-clearBlack text-black p-.02 rounded font-bold text-xl text-center `,
        nf:`bg-clearRed border-2 border-clearBlack text-white text-md p-.02 rounded-md`,
        selected:`${button.green} p-.02 font-sm shadow-clearBlack shadow-sm rounded border-2 border-green text-center `,
        segBtn:`${button.green} w-max p-[10px]`,
        btnCont: `flex justify-around py-.01 rounded-md`,
    }
    return (
        <div className={nf? `${styles.btnCont} border-2 border-red bg-clearRed`: styles.btnCont}>
            <button
            className={(state.seg[seg]? styles.selected : styles.check) + styles.segBtn}
            value={seg}
            onClick={(e) => handleClick(e)}
            >
                {shift.segs[seg]}
            </button>
            <button
            className={nf? styles.nf: styles.check + "shadow-clearBlack shadow-sm disabled:text-[#a9a9a9] disabled:cursor-none"}
            disabled={disabled}
            value={seg}
            id="nf"
            onClick={(e) => handleClick(e)}
            >
                No Fill
            </button>
        </div>
    )
}

export default FillLine
