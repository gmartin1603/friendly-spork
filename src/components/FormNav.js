import React from "react"

const FormNav = ({nav, tabs, active, setActive}) => {

    const handleClick = (e, data) => {
        e.preventDefault()
        // console.log(data)
        setActive(data)
    }

    const styles = {
        main:`w-full`,
        card:`bg-green pl-.02 w-full min-w-min cursor-pointer text-white text-left
        border hover:border-clearBlack shadow-inner hover:shadow-black`,
        h1:`underline underline-offset-2`,
        p:`font-base text-base`,
    }

  return (
    <div
    className={styles.main}
    style={nav? {display:"flex"}:null}
    >
        { tabs.map(tab => (
            <div
            className={styles.card}
            onClick={(e) => handleClick(e,tab)}
            >
                <h1 className={styles.h1}>
                    {`${tab.label} Shift Settings`}
                </h1>
                <p className={styles.p}>Click to Modify</p>
            </div>
        ))}
    </div>
  )
}

export default FormNav
