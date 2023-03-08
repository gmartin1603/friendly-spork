import React from "react"
import { useAuthState } from "../context/auth/AuthProvider"

const FormNav = ({nav, tabs, active, setActive, setFields, unsaved}) => {
    const [{rota}, dispatch] = useAuthState()

    const handleClick = (e, data) => {
        e.preventDefault()
        // console.log(data)
        if (unsaved) {
           const prompt = confirm("Unsaved changes will be discarded, continue?")
           if (prompt) {
               setFields(rota.fields[data.id])
               setActive(data)
           }
        } else {
            setFields(rota.fields[data.id])
            setActive(data)
        }
    }

    const styles = {
        main:`w-full`,
        card:`bg-green px-.02 py-.01 mt-.01 w-full min-w-min cursor-pointer text-white text-center text-xl font-semibold
        border border-green hover:border-clearBlack shadow-inner hover:shadow-black transition-shadow ease-in-out hover:scale-210 duration-[500ms]`,
        active: {backgroundColor: "white", border: "2px solid green", color: "black", borderBottom: "none", fontWeight: 1200},
        h1:``,
        p:`font-base text-base`,
    }

  return (
    <div
    className={styles.main}
    style={nav? {display:"flex"}:null}
    >
        { tabs.map(tab => (
            <div
            key={tab.id}
            className={styles.card}
            style={tab.id === active.id? styles.active : {}}
            onClick={(e) => handleClick(e,tab)}
            >
                <h1 className={styles.h1}>
                    {`${tab.label}`}
                </h1>
            </div>
        ))}
    </div>
  )
}

export default FormNav
