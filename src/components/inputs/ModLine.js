import React from "react"
import { useAuthState } from "../../context/auth/AuthProvider"
import SegInput from "../SegInput"
import Signature from "../Signature"

const ModLine = ({sel, state, seg, setState}) => {

    const [{rota, formObj}, dispatch] = useAuthState()
    const shifts = rota.shifts

    const handleSegChange = (obj) => {
        let update = {}
        if (state.slots > 1) {
            let arr = [...state.seg[obj.id].segs]
            arr[obj.name] = obj.load
            update = {...state.seg[obj.id], segs: arr}
            const segUpdate = {...state.seg, [obj.id]: update}
            console.log(segUpdate)
            setState(prev => ({...prev, seg: segUpdate}))
        } else {
            update = {...state.seg, [obj.name]: obj.load}
            console.log(update)
            setState(prev => ({...prev, seg: update}))
        }
    }

    const styles = {
        main:``,
    }

  return (
    <div className={styles.main}>
      {
        state.slots > 1?
            <div>
                <h3>{formObj.shift.segs[seg]}</h3>
                { state.seg[seg].segs.map((obj,i) => {
                    return (
                        <SegInput
                        width="w-full"
                        shifts={shifts}
                        segs={state.seg[seg].segs}
                        styling={`w-fit`}
                        slots={true}
                        setSegs={handleSegChange}
                        name={i}
                        id={seg}
                        key={`${seg}${i}`}
                        sel={sel}
                        />
                        )
                    })
                }
                { state.seg[seg].bids.map((bid, i) => (
                        <div
                        className={`${styles.bid}`}
                        key={`${bid.name} ${seg}`}
                        >
                            {<Signature bid={bid} num={i+1}/>}
                        </div>
                    ))
                }
            </div>
            :
            <div className={`border border-clearBlack mb-10 p-.05`}>
                <SegInput
                width="w-.75"
                shifts={shifts}
                segs={state.seg}
                setSegs={handleSegChange}
                name={seg}
                sel={sel}
                />
                { state.seg[seg].bids &&
                    state.seg[seg].bids.map((bid, i) => (
                    <div
                    className={`${styles.bid}`}
                    key={`${bid.name} [seg]`}
                    >
                        {<Signature bid={bid} num={i+1}/>}
                        <p
                        className={`cursor-pointer border w-max p-.01 bg-green text-white`}
                        onClick={() => handleSegChange({name: [seg], load: {...state.seg[seg], name: bid.name}})}
                        >
                            {`Award ${bid.name}`}
                        </p>
                    </div>
                ))}
            </div>
        }
    </div>
  )
}

export default ModLine
