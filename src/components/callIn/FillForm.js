import React, { useEffect, useState } from 'react';
import { useAuthState } from '../../context/auth/AuthProvider';
import CallinSeg from './CallinSeg';

function FillForm({state, setState}) {
    const [{shifts, formObj}, dispatch] = useAuthState()

    const [templ, setTempl] = useState({})

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

    useEffect(() => {
        const shiftSegs = shifts[formObj.shift].segs
        let templ = {one:'',two:''}
        for (const key in shiftSegs) {
            if (key !== "full") {
                templ[key] = shiftSegs[key]
            }
        }
        setTempl(templ)
    },[shifts])

    return (
        <div>
            { Object.keys(templ).map(str => (
                <CallinSeg 
                key={str}
                name={str}
                segs={state.seg}
                sel={true}
                setSegs={handleSegChange}
                />
            ))
            }
        </div>
    );
}

export default FillForm;