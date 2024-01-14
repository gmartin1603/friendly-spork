import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuthState } from "../context/auth/AuthProvider";
import { auth } from "../firebase/auth";
import useCollListener from "../helpers/collectionListener";
import usePostsListener from "../helpers/postsListener";
import useWindowSize from "../helpers/windowSize";
import Drawer from "./Drawer";
import commonService from "../common/common";
import { toast } from "react-toastify";
import UserMenu from "./header/UserMenu";

function Header({ tabs, disabled }) {
  const [width, height] = useWindowSize([0, 0]);
  const [{ profile, colls, cols, rota }, dispatch] = useAuthState();
  const navigate = useNavigate();
  const location = useLocation();

  const [show, setShow] = useState(false);

  useCollListener(`${rota.dept}`);
  usePostsListener(`${rota.dept}-posts`);

  const openDrawer = (e) => {
    e.preventDefault();
    setShow(!show);
  };

  const changeView = (e) => {
    if (e) {
      dispatch({
        type: "SET-VIEW",
        load: colls[e.target.value],
      });
    } else {
      dispatch({
        type: "SET-VIEW",
        load: colls[0],
      });
    }
  };
  // contols the loading of the week bar
  const handleClick = (bool) => {
    // console.log(bool)
    let load;
    if (bool) {
      load = true;
    } else {
      load = false;
    }
    dispatch({
      type: "SET-VALUE",
      name: "wkBar",
      load: load,
    });
  };

  useEffect(() => {
    if (
      location.pathname === "/dashboard" ||
      location.pathname === "/profile"
    ) {
      // console.log(location.pathname)
      handleClick(false);
    } else {
      handleClick(true);
    }
  }, [location]);

  const logOff = () => {
    dispatch({
      type: "CLEAR",
    });
    navigate("/", { replace: true });
    signOut(auth);
  };

  // ******* Temporary Dev Functions ********
  const url = process.env.REACT_APP_BASEURL_STAGING;

  const start = new Date("2022-06-01").getTime();
  const end = new Date("2022-07-01").getTime();

  const getPosts = async (e) => {
    e.preventDefault();
    await fetch(`${url}/fsApp/copyToLocal`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        // coll: rota.dept,
        coll: `${rota.dept}-posts`,
        start: start,
        end: end,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(JSON.parse(data).message);
      })
      .catch((err) => console.log(err));
  };
  const writePosts = async (e) => {
    e.preventDefault();
    await fetch(`${url}/fsApp/writeToFirestore`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        // coll: rota.dept,
        coll: `${rota.dept}-posts`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(JSON.parse(data).message);
      })
      .catch((err) => console.log(err));
  };
  const updatePosts = async (e) => {
    e.preventDefault();
    await fetch(`${url}/fsApp/updatePosts`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        coll: `${rota.dept}-posts`,
        start: start,
        end: end,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(JSON.parse(data).message);
      })
      .catch((err) => console.log(err));
  };
  const deleteOldPosts = async (e) => {
    e.preventDefault();
    await fetch(`${url}/fsApp/deleteOldPosts`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        coll: `${rota.dept}-posts`,
        start: start,
        end: end,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(JSON.parse(data).message);
      })
      .catch((err) => console.log(err));
  };

  const buildArchive = async (e) => {
    e.preventDefault();
    // Custom date, must be a Monday
    // const mon = new Date("2023-04-10").getTime()
    const mon = cols[0].label; // Monday of displayed week
    let data = {
      dept: rota.dept,
      start: mon,
    }
    await toast.promise(
      commonService.commonAPI("fsApp/buildArchive", data)
        .then((res) => {
          console.log(res)
        }),
      {
        pending: 'Building Archive...',
        success: 'Archive Built!',
        error: 'Error Building Archive'
      }
    )
  };
  //********************************************** */

  const styles = {
    container: `border-b-4 p-${width > 900 ? "" : ".01"
      } sticky top-0 left-0 z-40 select-none  flex justify-${width > 900 ? "around" : "between"
      } items-center bg-clearGreen h-fit w-full`,
    drawerBtn: `bg-clearBlack py-[3px]  border-clearBlack h-[50px] w-[50px] flex flex-col justify-around items-center`,
    line: `w-[70%] h-[10%] bg-todayGreen`,
    nav: "flex p-.01 w-.5",
    select: `w-120 text-center border text-2xl`,
    tab: "bg-white text-lg border-2 py-.01 px-.02 text-center",
    active: "font-bold text-green",
    logOut:
      "bg-red p-2 rounded-2xl text-base font-bold text-white border-black min-w-max mx-2",
  };
  // MUI Modal Styles
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className={styles.container}>
      {width > 900 ? (
        <>
          <div className={`flex`}>
            <div className={`bg-todayGreen flex justify-center rounded-lg`}>
              {profile.dept.length > 1 && (
                <select
                  name="dept"
                  onChange={(e) => changeView(e)}
                  className={styles.select}
                  disabled={disabled}
                >
                  {colls.map((dept, i) => (
                    <option value={i} key={dept[0].dept}>
                      {dept[0].dept.toUpperCase()}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
          <nav className={styles.nav}>
            {tabs &&
              tabs.map((tab) => (
                <NavLink
                  to={tab.link}
                  key={tab.link}
                  onClick={() => handleClick(tab.wkBar)}
                  className={styles.tab}
                  style={({ isActive }) =>
                    isActive
                      ? {
                        borderColor: "green",
                        fontWeight: "700",
                        color: "green",
                        boxShadow: "inset 5px 5px green",
                      }
                      : { fontWeight: "400", color: "black" }
                  }
                >
                  {tab.label}
                </NavLink>
              ))}
          </nav>

          {/* <button className={styles.logOut} onClick={(e) => getPosts(e)}>Get Posts</button> */}

          {/* <button className={styles.logOut} onClick={(e) => writePosts(e)}>Write Posts</button> */}

          {/* <button className={styles.logOut} onClick={(e) => updatePosts(e)}>Update Posts</button> */}

          {/* <button className={styles.logOut} onClick={(e) => deleteOldPosts(e)}>Delete Old Posts</button> */}

          {/* <button className={styles.logOut} onClick={(e) => buildArchive(e)}>
            Build Archive
          </button> */}

          <UserMenu profile={profile} logOff={logOff} />

          {/* <div>
            <Button
              id="basic-button"
              variant="contained"
              color="success"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleMenuClick}
            >
              <MenuIcon />
              <p className="font-semibold ml-2">
                {profile.dName}
              </p>
            </Button>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              MenuListProps={{
                sx: {
                  width: '175px',
                }
              }}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  width: 'inherit',
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  }
                },
              }}
              transformOrigin={{ horizontal: 'left', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            >
              <MenuItem
                id="profile"
                data-cy="profile-link"
                onClick={handleClose}
              >
                <Avatar /> Profile
              </MenuItem>
              <Divider />
              {
                profile.level < 1 &&
                <MenuItem
                  id="new-user"
                  data-cy="new-user-link"
                  onClick={handleClose}
                >
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  Add New User
                </MenuItem>
              }
              <MenuItem
                id="settings"
                data-cy="settings-link"
                onClick={handleClose}
              >
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem
                id="about"
                data-cy="about-link"
                onClick={handleClose}
              >
                <ListItemIcon>
                  <InfoOutlined fontSize="small" />
                </ListItemIcon>
                About
              </MenuItem>
              <Divider />
              <MenuItem
                id="logOut"
                data-cy="log-out-link"
                onClick={handleClose}
              >
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </div> */}
        </>
      ) : (
        <>
          <div className={styles.drawerBtn} onClick={(e) => openDrawer(e)}>
            <div className={styles.line} />
            <div className={styles.line} />
            <div className={styles.line} />
          </div>

          <h3 className={`text-3xl font-semibold text-white`}>
            {profile.dName}
          </h3>
          <div className={`flex`}>
            <div className={`bg-todayGreen flex justify-center rounded-lg`}>
              {profile.dept.length > 1 && (
                <select
                  name="dept"
                  onChange={(e) => changeView(e)}
                  className={styles.select}
                >
                  {colls.map((dept, i) => (
                    <option value={i} key={dept[0].dept}>
                      {dept[0].dept.toUpperCase()}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
          <Drawer tabs={tabs} show={show} close={() => setShow(false)} />
        </>
      )}

      {/* <Modal
        open={aboutModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Overtime Management
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            UX Version: {version}
            <br />
            API Version: {version}
            <br />
            API Version: {version}
            <br />
            <Link
              to="/release-notes"
              onClick={() => setAboutModal(false)}
              className="text-blue-500 hover:text-blue-700"
            >Release Notes</Link>
          </Typography>
          <div className="w-full flex justify-center">
            <Button
              variant="outlined"
              color="error"
              onClick={() => setAboutModal(false)}
              sx={{ mt: 2 }}
            >
              Close
            </Button>
          </div>
        </Box>
      </Modal> */}

      {/* <div>
                <button onClick={() => fetchData()}>UID Look Up</button>
                <input type="text" value={value} onChange={(e) => setValue(...value, e.target.value)} />
            </div> */}
    </div>
  );
}

export default Header;
