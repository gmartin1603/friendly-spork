
import { InfoOutlined, Logout, PersonAdd, Settings } from '@mui/icons-material';
import { Avatar, Box, Button, Divider, ListItemIcon, Menu, MenuItem, Modal, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState } from 'react';
import { useAuthState } from '../../context/auth/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import EeForm from '../forms/EeForm';
import AddUser from '../forms/AddUser';
import ScheSettings from '../forms/ScheSettings';

function UserMenu({ profile, logOff }) {
    const [{ version }, dispatch] = useAuthState();
    const [aboutModal, setAboutModal] = useState(false);
    const [addUserModal, setAddUserModal] = useState(false);
    const [settingsModal, setSettingsModal] = useState(false);
    const navigate = useNavigate();

    // MUI Menu Logic
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (e) => {
        setAnchorEl(null);
        switch (e.target.id) {
            case "logOut":
                logOff()
                break;
            case "profile":
                navigate("/profile", { replace: true });
                break;
            case "settings":
                console.log("Navigate to settings")
                setSettingsModal(true);
                break;
            case "new-user":
                setAddUserModal(true);
                // navigate("/dashboard", { replace: true });
                break;
            case "about":
                console.log("Navigate to about")
                setAboutModal(true);
                break;
            default:
                setAboutModal(false);
                console.log(e.target.id)
                break;
        }
    };

    const closeModal = (modal) => {
        switch (modal) {
            case "about":
                setAboutModal(false);
                break;
            case "new-user":
                setAddUserModal(false);
                break;
            default:
                break;
        }
    }

    // MUI Modal Styles
    const style = {
        about: {
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
        },
        newUser: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            border: '1px solid #000',
            borderRadius: '10px',
            boxShadow: 24,
            minHeight: '400px',
            width: '60%',
        }
    };

    return (
        <div>
            <div>
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
                            paddingBottom: '0px',
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
                                pb: 0
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
                    {/* {
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
                    } */}
                    {
                        profile.level < 1 &&
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
                    }
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
                    {/* <Divider /> */}
                    <MenuItem
                        id="logOut"
                        data-cy="log-out-link"
                        onClick={handleClose}
                        sx={{
                            color: 'white',
                            backgroundColor: 'rgb(252, 3, 3, .8)',
                            borderBottomLeftRadius: '5px',
                            borderBottomRightRadius: '5px',
                            '&:hover': { backgroundColor: 'rgb(252, 3, 3, .8)' },
                        }}
                    >
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
            </div>

            {/* Modals */}
            <Modal
                open={aboutModal}
                onClose={() => closeModal("about")}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style.about}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Overtime Management
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        UX Version: {version}
                        <br />
                        API Version: {version}
                        <br />
                        <Link
                            to="/release-notes"
                            onClick={() => setAboutModal(false)}
                            className="text-blue-500 hover:text-blue-700"
                        >
                            Release Notes
                        </Link>
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
            </Modal>
            {/* <Modal
                open={addUserModal}
                onClose={() => closeModal("new-user")}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style.newUser}>
                    <AddUser closeModal={() => setAddUserModal(false)} />
                </Box>
            </Modal> */}
            <Modal
                open={settingsModal}
                onClose={() => closeModal("settings")}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style.newUser}>
                    <ScheSettings
                        toggle={setSettingsModal}
                        show={settingsModal}
                    />
                    <div className="w-full flex justify-center pb-2">
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() => setSettingsModal(false)}
                            sx={{ mt: 2 }}
                        >
                            Close
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default UserMenu;