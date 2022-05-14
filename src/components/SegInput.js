import React from 'react';
import { useAuthState } from '../context/auth/AuthProvider';

function SegInput({name, segs, sel, setSegs, downDate, dir, width, txtSize }) {

    const [{formObj, view},dispatch] = useAuthState()

    const shifts = view[0].shifts
    // const handleClick = (e) => {
    //     console.log(e.target.id)
    //     document.getElementById(e.target.id).focus()
    //     document.getElementById(e.target.id).select()
    // }

    const handleChange = (e) => {
        console.log(e.target.name+' '+e.target.type)

        let value = ''
        if(e.target.value) {
            value = `${e.target.value[0].toUpperCase()}${e.target.value.slice(1)}`
        }

        let update = {}
        if (e.target.type === 'checkbox') {
            update = {...segs[e.target.name], [e.target.id]: e.target.checked}
        } else {
            update = {...segs[e.target.name], [e.target.id]: value}
        }


        setSegs(((prev) => (
            {...prev, [e.target.name]: update}
        )))

    }

    

    return (
        <>
        <label className={`font-bold text-${txtSize}`}> 
        {sel? [shifts[formObj.shift].segs[name]] : shifts[formObj.shift].segs.full} 
        </label>
        <div className={`flex${dir? "-"+dir:''} text-black font-semibold text-lg`}>
            <input 
            className={`bg-white border-2 border-b-4 ${width} my-10 text-center`} 
            type="text" 
            value={segs[name]?.name} 
            // placeholder={downDate>0? `Down:${new Date(downDate).toDateString().slice(3)}`:formObj.current} 
            name={name}
            key="name" 
            id="name" 
            // onClick={(e) => handleClick(e)}
            onChange={(e) => handleChange(e)} 
            />
            <div className={`flex justify-around text-center w-full`}>
                <label htmlFor="force_one"> 
                    <h6>Forced</h6>
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
        </>
    );
}

export default SegInput;