import React from 'react';
import { useAuthState } from '../../context/auth/AuthProvider';
import style from '../../context/style/style';

function CallinSeg({name, segs, slots, setSegs, id }) {

    const [{formObj, view, shifts},dispatch] = useAuthState()

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
        main:{width:"100%",},
        container:{display: "flex", alignItems: "end"},
        h3:{},
        input:{},
        checkBoxCont:{display: "flex", justifyContent: "space-around"},
        checkBox:{marginLeft:"5px"},
    }

    return (
        <div style={styles.main}>
        <h3 style={styles.h3}> 
        {shifts[formObj.shift].segs[name]} 
        </h3>
        <div style={styles.container}>
            <input  
            type="text" 
            value={segs[name]?.name} 
            name={name}
            key="name" 
            id="name" 
            onChange={(e) => handleChange(e)} 
            />
            <div style={styles.checkBoxCont}>
                <label htmlFor="force_one"
                style={styles.checkBox}
                > 
                    <h6 style={style.h3}>Force</h6>
                    <input 
                    type="checkbox"
                    style={styles.checkBox}
                    name={name}
                    id="forced"
                    checked={segs[name].forced} 
                    onChange={(e)=> handleChange(e)} 
                    />    
                </label>
                {/* <label htmlFor="trade_one"
                style={styles.checkBox}
                > 
                    <h6 style={style.h3}>Trade</h6>
                    <input 
                    type="checkbox"
                    name={name}
                    id="trade" 
                    checked={segs[name].trade}
                    onChange={(e)=> handleChange(e)} 
                    />    
                </label> */}

            </div>
        </div>
        </div>
    );
}

export default CallinSeg;