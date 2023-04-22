import { async } from '@firebase/util';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuthState } from '../context/auth/AuthProvider';
import { auth } from '../firebase/auth';
import useCollListener from '../helpers/collectionListener';
import usePostsListener from '../helpers/postsListener';
import useWindowSize from '../helpers/windowSize';
import Drawer from './Drawer';

function Header({tabs, disabled}) {
    const [width, height] = useWindowSize([0,0]);
    const [{version, profile, colls, cols, rota}, dispatch] = useAuthState();
    const navigate = useNavigate()
    const location = useLocation()

    const [show, setShow] = useState(false)

    useCollListener(`${rota.dept}`)
    usePostsListener(`${rota.dept}-posts`)

    const openDrawer = (e) => {
        e.preventDefault();
        setShow(!show)
    }

    const changeView = (e) => {
        if (e) {
            dispatch({
                type: "SET-VIEW",
                load: colls[e.target.value]
            })
        } else {
            dispatch({
                type: "SET-VIEW",
                load: colls[0]
            })
        }
    }
// contols the loading of the week bar
    const handleClick = (bool) => {
        // console.log(bool)
        let load
        if (bool) {
            load = true
        } else {
            load = false
        }
        dispatch({
            type: "SET-VALUE",
            name: "wkBar",
            load: load
        })
    }

    useEffect(() => {
        if (location.pathname === "/dashboard" || location.pathname === "/profile") {
            // console.log(location.pathname)
            handleClick(false)
        } else {
            handleClick(true)
        }
    },[location])

    const logOff = () => {
        dispatch({
            type: "CLEAR",
        })
        navigate("/", { replace: true });
        signOut(auth)
    }

    // ******* Temporary Dev Functions ********
    const url = 'http://localhost:5000/overtime-management-83008/us-central1'

    const start = new Date("2022-06-01").getTime()
    const end = new Date("2022-07-01").getTime()

    const getPosts = async (e) => {
        e.preventDefault()
        await fetch(`${url}/fsApp/copyToLocal`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                // coll: rota.dept,
                coll: `${rota.dept}-posts`,
                start: start,
                end: end,
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(JSON.parse(data).message)
        })
        .catch(err => console.log(err))
    }
    const writePosts = async (e) => {
        e.preventDefault()
        await fetch(`${url}/fsApp/writeToFirestore`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                // coll: rota.dept,
                coll: `${rota.dept}-posts`,
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(JSON.parse(data).message)
        })
        .catch(err => console.log(err))
    }
    const updatePosts = async (e) => {
        e.preventDefault()
        await fetch(`${url}/fsApp/updatePosts`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                coll: `${rota.dept}-posts`,
                start: start,
                end: end,
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(JSON.parse(data).message)
        })
        .catch(err => console.log(err))
    }
    const deleteOldPosts = async (e) => {
        e.preventDefault()
        await fetch(`${url}/fsApp/deleteOldPosts`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                coll: `${rota.dept}-posts`,
                start: start,
                end: end,
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(JSON.parse(data).message)
        })
        .catch(err => console.log(err))
    }

    const buildArchive = async (e) => {
        e.preventDefault()
        // Custom date, must be a Monday
        // const mon = new Date("2023-04-10").getTime()
        const mon = cols[0].label // Monday of displayed week

        await fetch(`${url}/pubSub`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                dept: rota.dept,
                start: mon,
            })
        })
        .then(res => (res.json()))
        .then(data => {
            console.log(data)
        })
        .catch(err => console.log(err))
    }
//********************************************** */

    const styles = {
        container: `border-b-4 p-${width > 900? "":".01"} sticky top-0 left-0 z-40 select-none  flex justify-${width > 900? "around":"between"} items-center bg-clearGreen h-fit w-full`,
        drawerBtn:`bg-clearBlack py-[3px]  border-clearBlack h-[50px] w-[50px] flex flex-col justify-around items-center`,
        line:`w-[70%] h-[10%] bg-todayGreen`,
        nav: 'flex p-.01 w-.5',
        select:`w-120 text-center border text-2xl`,
        tab: 'bg-white text-lg border-2 py-.01 px-.02 text-center',
        active: 'font-bold text-green',
        logOut: 'bg-red p-2 rounded-2xl text-base font-bold text-white border-black min-w-max mx-2',
    }

    return (
        <div className={styles.container}>
            { width > 900 ?
                <>
                    <div className={`flex`}>
                        <div className={`bg-todayGreen flex justify-center rounded-lg`}>
                            { profile.dept.length > 1 &&
                                <select name="dept" onChange={(e) => changeView(e)}
                                className={styles.select}
                                disabled={disabled}
                                >
                                    {
                                        colls.map((dept,i) => (
                                            <option value={i} key={dept[0].dept}>{dept[0].dept.toUpperCase()}</option>
                                        ))
                                    }
                                </select>
                            }
                        </div>
                    </div>
                    <nav className={styles.nav}>
                        { tabs &&
                            tabs.map(tab => (
                                <NavLink
                                to={tab.link}
                                key={tab.link}
                                onClick={() => handleClick(tab.wkBar)}
                                className={styles.tab}
                                style={({isActive}) => (isActive ? {borderColor: "green", fontWeight:"700", color: "green", boxShadow:"inset 5px 5px green"} : {fontWeight:"400", color: "black"})}
                                >
                                    {tab.label}
                                </NavLink>
                            ))
                        }
                    </nav>

                    {/* <button className={styles.logOut} onClick={(e) => getPosts(e)}>Get Posts</button> */}

                    {/* <button className={styles.logOut} onClick={(e) => writePosts(e)}>Write Posts</button> */}

                    {/* <button className={styles.logOut} onClick={(e) => updatePosts(e)}>Update Posts</button> */}

                    {/* <button className={styles.logOut} onClick={(e) => deleteOldPosts(e)}>Delete Old Posts</button> */}

                    {/* <button className={styles.logOut} onClick={(e) => buildArchive(e)}>Build Archive</button> */}

                    <h3
                    className={`text-4xl font-semibold text-white`}
                    >
                        {profile.dName}
                    </h3>
                    <button type="log out" className={styles.logOut} onClick={() => logOff()} >Log Out</button><p className={`text-white text-sm font-[400]`}>Version {version}</p>
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

                    <h3
                    className={`text-3xl font-semibold text-white`}
                    >
                        {profile.dName}
                    </h3>
                    <div className={`flex`}>
                        <div className={`bg-todayGreen flex justify-center rounded-lg`}>
                            { profile.dept.length > 1 &&
                                <select name="dept" onChange={(e) => changeView(e)}
                                className={styles.select}
                                >
                                    {

                                        colls.map((dept,i) => (
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

