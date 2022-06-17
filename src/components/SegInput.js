import React from 'react';
import { useAuthState } from '../context/auth/AuthProvider';

function SegInput({name, segs, slots, styling, setSegs, dir, width, txtSize, id }) {

    const [{formObj, view},dispatch] = useAuthState()

    const shifts = view[0].shifts

    const handleChange = (e) => {
        console.log(e.target.name+' '+e.target.type)

        let value = ''
        if(e.target.value) {
            value = `${e.target.value[0].toUpperCase()}${e.target.value.slice(1)}`
        }

        let update = {}
        switch (e.target.id) {
            case "forced":
                if (e.target.checked) {
                    if (segs[e.target.name].trade) {
                        update = {...segs[e.target.name], [e.target.id]: e.target.checked, trade: false}
                    } else {
                        update = {...segs[e.target.name], [e.target.id]: e.target.checked}
                    }
                } else {
                    update = {...segs[e.target.name], [e.target.id]: e.target.checked}
                }
            break
            case "trade":
                if (e.target.checked) {
                    if (segs[e.target.name].forced) {
                        update = {...segs[e.target.name], [e.target.id]: e.target.checked, forced: false}
                    } else {
                        update = {...segs[e.target.name], [e.target.id]: e.target.checked}
                    }
                } else {
                    update = {...segs[e.target.name], [e.target.id]: e.target.checked}
                }
            break
            default:
                console.log(e.target.id)
        }
        if (e.target.type === 'checkbox') {

        } else {
            update = {...segs[e.target.name], [e.target.id]: value}
        }
        if (slots) {
            console.log(update)
            setSegs({name:e.target.name, id: id, load: update})
        } else {
            setSegs({name:e.target.name, load: update})
        }
    }

    const styles = {
        main: styling,
    }

    return (
        <div className={styles.main}>
        <h3 className={`font-bold text-${txtSize}`}> 
        {shifts[formObj.shift].segs[name]} 
        </h3>
        <div className={`flex ${dir? "flex-col":''} text-black font-semibold text-lg`}>
            <input 
            className={`bg-white border-2 border-b-4 ${width} my-10 text-center`} 
            type="text" 
            value={segs[name]?.name} 
            name={name}
            key="name" 
            id="name" 
            onChange={(e) => handleChange(e)} 
            />
            <div className={`flex justify-around text-center w-full`}>
                <label htmlFor="force_one"> 
                    <h6>Force</h6>
                    <input 
                    type="checkbox"
                    name={name}
                    id="forced" 
                    className={`m-.02 `} 
                    checked={segs[name].forced} 
                    onChange={(e)=> handleChange(e)} 
                    />    
                </label>
                <label htmlFor="trade_one"> 
                    <h6>Trade</h6>
                    <input 
                    type="checkbox"
                    name={name}
                    id="trade" 
                    className={`m-.02 `} 
                    checked={segs[name].trade}
                    onChange={(e)=> handleChange(e)} 
                    />    
                </label>

            </div>
        </div>
        </div>
    );
}

export default SegInput;