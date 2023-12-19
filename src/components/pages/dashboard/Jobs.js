import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useAuthState } from '../../../context/auth/AuthProvider';
import { Button, FormControl, Grid, Input, InputLabel, MenuItem, Modal, Select } from '@mui/material';
import moment from 'moment';
import { Delete, DeleteOutlineOutlined, Edit } from '@mui/icons-material';
import { toast } from 'react-toastify';
import commonService from '../../../common/common';

const style = {
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
    },
    deleteUser: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '1px solid #000',
        borderRadius: '10px',
        boxShadow: 24,
        minHeight: '200px',
        width: '350px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
};

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const [editJobModal, setEditJobModal] = React.useState(false)
    const [deleteJobModal, setDeleteJobModal] = React.useState(false)

    const deleteUser = (user) => {
        console.log(user)
        setDeleteJobModal(false)
        // toast.promise(
        //     commonService.commonAPI('app/deleteUser', { uid: user.id }),
        //     {
        //         pending: 'Deleting user...',
        //         success: `User ${user.name} deleted!`,
        //         error: 'Error deleting user'
        //     }
        // )
    }

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="center">{row.group.toUpperCase()}</TableCell>
                <TableCell align="center">{row.dept.toUpperCase()}</TableCell>
                <TableCell align="center">{row.created}</TableCell>
                <TableCell align="center">{row.lastModified}</TableCell>
                {/* <TableCell align="center">{row.phone}</TableCell>
                <TableCell align="center">{row.email}</TableCell> */}
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1, width: '30%', minWidth: '200px' }}>
                            <Typography variant="h6" gutterBottom component="span">
                                Qualified Employees
                            </Typography>
                            <IconButton
                                sx={{ float: 'right', marginRight: '10px' }}
                                variant='contained'
                                color='success'
                                size='small'
                                title='Edit User'
                                onClick={() => setEditJobModal(true)}
                            >
                                <Edit />
                            </IconButton>
                            <IconButton
                                sx={{ float: 'right', marginRight: '10px' }}
                                variant='contained'
                                color='error'
                                size='small'
                                title='Delete User'
                                onClick={() => setDeleteJobModal(true)}
                            >
                                <Delete />
                            </IconButton>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Dept</TableCell>
                                        <TableCell>Date Qualified</TableCell>
                                    </TableRow>
                                </TableHead>
                                {row.details.length > 0 ?
                                    <TableBody>
                                        {row.details.map((detailRow) => (
                                            <TableRow key={detailRow.id}>
                                                <TableCell component="th" scope="row">{detailRow.name}</TableCell>
                                                <TableCell>
                                                    {detailRow.dept.toUpperCase()}
                                                </TableCell>
                                                <TableCell>{detailRow.qualDate}</TableCell>
                                                {/* <TableCell align="center">
                                                <Button variant='contained'> Disqualify </Button>
                                            </TableCell> */}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                    :
                                    <TableBody sx={{ height: '100px' }}>
                                        <TableRow>
                                            <TableCell colSpan={6} align="center">No Users Found</TableCell>
                                        </TableRow>
                                    </TableBody>
                                }
                            </Table>
                        </Box>
                        {/* <Box sx={{ margin: 1 }}>
                            {row.role === 'ee' &&
                                <>
                                    <IconButton
                                        aria-label="expand row"
                                        size="small"
                                        onClick={() => setJobsOpen(!jobsOpen)}
                                    >
                                        {jobsOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                    </IconButton>
                                    <Typography variant="h6" gutterBottom component="span">
                                        Jobs
                                    </Typography>
                                    <Collapse in={jobsOpen} timeout="auto" unmountOnExit>
                                        <Table size="small" aria-label="purchases">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Job</TableCell>
                                                    <TableCell>Group</TableCell>
                                                    <TableCell>Date Qualified</TableCell>
                                                        <TableCell /> 
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {row.details.map((detailRow) => (
                                                    <TableRow key={detailRow.id}>
                                                        <TableCell component="th" scope="row">{detailRow.job}</TableCell>
                                                        <TableCell>{detailRow.group.toUpperCase()}</TableCell>
                                                        <TableCell>
                                                            {detailRow.date}
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Button variant='contained'> Disqualify </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </Collapse>
                                </>
                            }
                        </Box> */}
                    </Collapse>
                </TableCell>
            </TableRow>
            {/* Modals */}
            <Modal
                id={`edit-user-${row.id}`}
                open={editJobModal}
                onClose={() => setEditJobModal(false)}
                aria-labelledby="edit-user-modal-title"
            >
                <Box sx={style.newUser}>
                    {/* <EditUser user={row} closeModal={() => setEditJobModal(false)} /> */}
                </Box>
            </Modal>
            <Modal
                open={deleteJobModal}
                onClose={() => closeModal("delete-user")}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style.deleteUser}>
                    <Typography variant='h6'>Are you sure you want to delete user <b> {`${row.name.first} ${row.name.last}`} </b>?</Typography>
                    <div className='w-[90%] flex justify-around'>
                        <Button variant='contained' color='error' onClick={() => deleteUser(row)}>Delete</Button>
                        <Button variant='contained' color='success' onClick={() => setDeleteJobModal(false)}>Cancel</Button>
                    </div>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        name: PropTypes.string.isRequired,
        group: PropTypes.string.isRequired,
        dept: PropTypes.string.isRequired,
        created: PropTypes.string.isRequired,
        lastModified: PropTypes.string.isRequired,
        details: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                dept: PropTypes.string.isRequired,
                qualDate: PropTypes.string.isRequired,
            }),
        ).isRequired,
    }).isRequired,
};

function Jobs(props) {
    const [{ view, users }, dispatch] = useAuthState();
    const [rows, setRows] = React.useState([]);
    const [filter, setFilter] = React.useState({ dept: 'all', group: 'all' });
    const [addUserModal, setAddJobModal] = React.useState(false);

    const filterUsers = (job) => {
        let arr = [];
        users.forEach((user) => {
            if (user.quals.includes(job)) {
                arr.push({
                    id: user.id,
                    name: `${user.name.first} ${user.name.last}`,
                    dept: user.dept[0],
                    qualDate: moment().format('MM/DD/YYYY')
                })
            }
        })
        return arr;
    }

    React.useEffect(() => {
        let arr = [];
        console.log("view: ", view)
        if (view) {
            view.forEach((job) => {
                if (job.id != 'rota') {
                    let details = filterUsers(job.id)
                    arr.push({
                        id: `${job.id} ${job.dept}`,
                        name: job.label,
                        group: job.group,
                        dept: job.dept ? job.dept : 'none',
                        created: moment(job.created).format('MM/DD/YYYY'),
                        lastModified: moment(job.lastModified).format('MM/DD/YYYY'),
                        details: details
                    })
                }
            })
            setRows(arr)
        }

    }, [view])

    return (
        <>
            <TableContainer id="JOBS_TABLE_CONTAINER" component={Paper} sx={{ maxHeight: '70%' }}>
                <Box sx={{ marginTop: 2, marginLeft: 4 }}>
                    <Typography variant='h6'>Filter</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6} sm={3}>
                            <FormControl variant="filled" sx={{ m: 1, minWidth: 120, width: "100%" }}>
                                <InputLabel id="role-select-label">Department</InputLabel>
                                <Select
                                    labelId="role-select-label"
                                    id="dept-filter"
                                    name="dept"
                                    color="success"
                                    value={filter.dept}
                                    onChange={(e) => filterUsers(e)}
                                    label="Department"
                                >
                                    <MenuItem value="all">All</MenuItem>
                                    <MenuItem value="csst">CSST</MenuItem>
                                    <MenuItem value="casc">CASC</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <FormControl variant="filled" sx={{ m: 1, minWidth: 120, width: "100%" }}>
                                <InputLabel id="group-select-label">Group</InputLabel>
                                <Select
                                    labelId="group-select-label"
                                    id="group-filter"
                                    name="group"
                                    color="success"
                                    value={filter.group}
                                    onChange={(e) => filterUsers(e)}
                                    label="Group"
                                >
                                    <MenuItem value="all">All</MenuItem>
                                    <MenuItem value="admin">OP</MenuItem>
                                    <MenuItem value="ee">PACK</MenuItem>
                                    <MenuItem value="sup">PO</MenuItem>
                                    <MenuItem value="op">MISC</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        {/* <Grid item xs={6} sm={3}>
                            <FormControl variant="filled" sx={{ m: 1, minWidth: 120, width: "100%" }}>
                                <Input id="search" color='success' placeholder='Search' sx={{ m: 1, minWidth: 120, width: "100%" }} />
                            </FormControl>
                        </Grid> */}
                    </Grid>
                </Box>
                <Table aria-label="collapsible table" stickyHeader >
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ bgcolor: 'black' }}><Button color="success" size="small" variant='contained' onClick={() => setAddJobModal(true)} >+ User</Button></TableCell>
                            <TableCell sx={{ bgcolor: 'black', color: 'white', fontWeight: 600, fontSize: '1.2rem' }}>Job</TableCell>
                            <TableCell sx={{ bgcolor: 'black', color: 'white', fontWeight: 600, fontSize: '1.2rem' }} align="center">Group</TableCell>
                            <TableCell sx={{ bgcolor: 'black', color: 'white', fontWeight: 600, fontSize: '1.2rem' }} align="center">Dept</TableCell>
                            <TableCell sx={{ bgcolor: 'black', color: 'white', fontWeight: 600, fontSize: '1.2rem' }} align="center">Date Created</TableCell>
                            <TableCell sx={{ bgcolor: 'black', color: 'white', fontWeight: 600, fontSize: '1.2rem' }} align="center">Last Modified</TableCell>
                            {/* <TableCell align="center">Phone</TableCell>
                            <TableCell align="center">Email</TableCell> */}
                        </TableRow>
                    </TableHead>
                    {rows.length > 0 ?
                        <TableBody>
                            {rows.map((row) => (
                                <Row key={row.id} row={row} />
                            ))}
                        </TableBody>
                        :
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={6} align="center">No Users Found</TableCell>
                            </TableRow>
                        </TableBody>
                    }
                </Table>
            </TableContainer>
            <Modal
                open={addUserModal}
                onClose={() => setAddJobModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style.newUser}>
                    {/* <AddJob closeModal={() => setAddJobModal(false)} /> */}
                </Box>
            </Modal>
        </>
    );
}

export default Jobs;