import { signOut } from 'firebase/auth';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthState } from '../context/auth/AuthProvider';
import { auth } from '../firebase/auth';

function Drawer({tabs, show, close}) {


    const logOff = () => {
        signOut(auth)
    }

    const styles = {
        backdrop:`fixed top-[55px] left-0 h-screen w-full`,
        hide:`bg-transparent h-0 transition ease-in-out delay-350`,
        show:`bg-clearBlack transition ease-in-out delay-350`,
        container:`bg-green border-4 flex flex-col items-center p-.01 w-[300px] absolute top-0`,
        open:`transition translate-x-0 duration-1000`,
        closed:`transition translate-x-[-500px] duration-1000`,
        nav: 'flex flex-col p-.01 w-full text-center px-.2 ',
        tab: 'bg-white shadow-inner shadow-black text-lg border-2 py-.02 px-.02 my-.02',
        logOut: 'bg-red w-[90%] p-1 my-10 rounded-2xl text-base font-bold text-white border-black',
    }
    return (
        <div
        className={show? `${styles.backdrop} ${styles.show}`:`${styles.backdrop} ${styles.hide}`}
        onClick={() => close()}
        >
            <div className={show? `${styles.container} ${styles.open}`:`${styles.container} ${styles.closed}`}>
                <nav className={styles.nav}>
                    {
                        tabs &&
                        tabs.map(tab => (
                            <NavLink
                            to={tab.link}
                            key={tab.link}
                            className={styles.tab}
                            style={({isActive}) => (isActive ? {borderColor: "green", fontWeight:"700", color: "green", boxShadow:"inset 5px 5px green"} : {fontWeight:"400", color: "black"})}
                            >
                                {tab.label}
                            </NavLink>

                        ))
                    }
                </nav>

                <button
                    className={styles.logOut}
                    onClick={() => logOff()} >
                    Log Out
                </button>
                <p className={`text-white font-semibold text-sm`}>Version 4.0</p>
            </div>

        </div>
    );
}

export default Drawer;