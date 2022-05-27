import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuthState } from '../context/auth/AuthProvider';
import { auth } from '../firebase/auth';
import useWindowSize from '../helpers/windowSize';
import Drawer from './Drawer';

function Header({tabs}) {
    const [value, setValue] = useState('');
    const [width, height] = useWindowSize([0,0]);
    const[state, dispatch] = useAuthState();
    const navigate = useNavigate()

    const [show, setShow] = useState(false)

    const openDrawer = (e) => {
        e.preventDefault();
        setShow(!show)
    }

    const changeView = (e) => {
        if (e) {
            dispatch({
                type:"SET-VIEW", 
                load:state.colls[e.target.value]
            })
        } else {
            dispatch({
                type:"SET-VIEW", 
                load:state.colls[0]
            })
        }
    }

    useEffect(() => {
        changeView()
    },[])

    const logOff = () => {
        dispatch({
            type: "CLEAR",
        })
        navigate("/", { replace: true });
        signOut(auth)
    }

    const styles = {
        container: 'sticky top-0 left-0 z-10 select-none px-[15px] flex items-center  bg-todayGreen h-max  w-full',
        drawerBtn:`bg-clearBlack border-2 border-clearBlack h-[55px] w-[60px] py-[9px] flex flex-col justify-around items-center`,
        line:`w-[70%] h-[5px] bg-todayGreen`,
        nav: 'flex p-.01 w-.5 px-.2 ',
        select:`w-100 text-center  m-.02 bg-transparent border text-2xl`,
        tab: 'bg-white text-[22px] border-2 py-.01 px-.02',
        active: 'font-bold text-green',
        logOut: 'bg-red p-2 rounded-2xl text-base font-bold text-white border-black',
    }
    
    return (
        <div className={styles.container}>
            {
                width > 900 ?
                
                <>
                <div className={` flex p-0.2 `}>
                <div className={`bg-todayGreen py-10 flex justify-center rounded-lg`}>
                    {
                        state.profile.dept.length > 1 &&
                    <select name="dept" onChange={(e) => changeView(e)}
                    className={styles.select}
                    >
                        {
                            
                            state.colls.map((dept,i) => (
                                <option value={i} key={dept[0].dept}>{dept[0].dept.toUpperCase()}</option>
                            ))
                        }
                    </select>
                    }
                </div>
                </div>
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
            
                <h3 className={`px-.02 text-4xl font-semibold mr-.05`} >{state.profile.dName}</h3>       
                <button type="log out" className={styles.logOut} onClick={() => logOff()} >Log Out</button>
        
                </>
                :
                <>
                <div className={styles.drawerBtn}
                onClick={(e)=>openDrawer(e)}
                >
                    <div className={styles.line}/>
                    <div className={styles.line}/>
                    <div className={styles.line}/>
                </div>
    
                <div className={` flex p-0.2 `}>
                    <div className={`bg-todayGreen py-10 flex justify-center rounded-lg`}>
                        {
                            state.profile.dept.length > 1 &&
                        <select name="dept" onChange={(e) => dispatch({type:"SET-ARR", name:"view", load:state.colls[e.target.value]})}
                        className={styles.select}
                        >
                            {
                                
                                state.colls.map((dept,i) => (
                                    <option value={i} key={dept[0].dept}>{dept[0].dept.toUpperCase()}</option>
                                ))
                            }
                        </select>
                        }
                    </div>
                </div>
                <Drawer
                tabs={tabs}
                show={show}
                close={()=>setShow(false)}
                />
                </>
            }
            
            
            {/* <div>
                <button onClick={() => fetchData()}>UID Look Up</button>
                <input type="text" value={value} onChange={(e) => setValue(...value, e.target.value)} />
            </div> */}
            
                
        </div>
    );
}

export default Header;

