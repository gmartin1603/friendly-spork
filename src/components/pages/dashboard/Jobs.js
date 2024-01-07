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
import EditJob from '../../forms/EditJob';
import AddJob from '../../forms/AddJob';
import jobsDashboardService from '../../../common/jobsDashboardService';

const style = {
    headCell: {
        bgcolor: 'black',
        color: 'white',
        fontWeight: 600,
        fontSize: '1.2rem'
    },
    newUser: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '1px solid #000',
        borderRadius: '10px',
        boxShadow: 24,
        minHeight: '400px',
        // width: '60%',
    },
    deleteJob: {
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

    const deleteJob = (user) => {
        console.log(user)
        setDeleteJobModal(false)
        const load = {
            dept: row.dept,
            posts: [],
            job: row.id,
        };
        // console.log(load);
        jobsDashboardService.deleteJob(load)
            .then((res) => {
                console.log(res.message);
                toast.success(res.message);
                props.refreshJobs();
            })
            .catch((err) => {
                console.error(err);
                toast.error(err.message);
            })
            .finally(() => {
                setDeleteJobModal(false)
            });
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
                            {row.group === 'misc' &&
                                <IconButton
                                    sx={{ float: 'right', marginRight: '10px' }}
                                    variant='contained'
                                    color='error'
                                    size='small'
                                    title='Delete Job'
                                    onClick={() => setDeleteJobModal(true)}
                                >
                                    <Delete />
                                </IconButton>
                            }
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
                    <EditJob
                        job={row}
                        closeModal={() => setEditJobModal(false)}
                        refreshJobs={() => props.refreshJobs()}
                    />
                </Box>
            </Modal>
            <Modal
                open={deleteJobModal}
                onClose={() => setDeleteJobModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style.deleteJob}>
                    <Typography variant='h6'>Are you sure you want to delete this job <b> {`${row.name}`} </b>?</Typography>
                    <div className='w-[90%] flex justify-around'>
                        <Button variant='contained' color='error' onClick={() => deleteJob(row)}>Delete</Button>
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
    const [{ users, profile }, dispatch] = useAuthState();
    const [jobs, setJobs] = React.useState([]);
    const [rows, setRows] = React.useState([]);
    const [filter, setFilter] = React.useState({ dept: 'all', group: 'all' });
    const [addUserModal, setAddJobModal] = React.useState(false);
    const [groupOptions, setGroupOptions] = React.useState([]);


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

    const handleFilterChange = (e) => {
        console.log(e.target.name, e.target.value)
        setFilter({ ...filter, [e.target.name]: e.target.value })
    }

    const getJobs = () => {
        setJobs([])
        jobsDashboardService.getJobs(profile.dept)
            .then((res) => {
                console.log(res.message);
                setJobs(res.data);
            })
            .catch((err) => {
                console.error(err);
                toast.error(err.message);
            })
            .finally(() => {
                // setSubmitting(false);
            });
    }

    React.useEffect(() => {
        let arr = [];
        if (jobs.length > 0) {
            console.log("JOBS: ", jobs)
            let groups = []
            if (filter.dept === 'all') {
                profile.dept.forEach((dept) => {
                    let rota = jobs.find((job) => (job.dept === dept && job.id === 'rota'))
                    if (rota) {
                        rota.groups.forEach((group) => {
                            if (!groups.includes(group)) {
                                groups.push(group)
                            }
                        })
                    }
                })
            } else {
                let rota = jobs.find((job) => (job.dept === filter.dept && job.id === 'rota'))
                if (rota) {
                    groups = rota.groups
                }
            }
            console.log(groups)
            setGroupOptions(groups)
            jobs.map((job) => {
                if (job.id != 'rota') {
                    if (job.dept === filter.dept || filter.dept === 'all') {
                        if (job.group === filter.group || filter.group === 'all') {
                            let details = filterUsers(job.id)
                            let obj = {
                                key: `${job.id} ${job.dept}`,
                                name: job.label,
                                created: moment(new Date(job.created)).format('MM/DD/YYYY'),
                                lastModified: moment(new Date(job.lastModified)).format('MM/DD/YYYY'),
                                details: details
                            }
                            let omit = ['label', 'data', 'align']
                            for (const key in job) {
                                if (omit.includes(key)) {
                                    continue;
                                } else {
                                    obj[key] = job[key]
                                }
                            }
                            arr.push(obj)
                            obj = {}
                        }
                    }
                }
            })
            setRows(arr)
        }

    }, [jobs, filter])

    React.useEffect(() => {
        getJobs()
    }, [])

    return (
        <>
            <TableContainer id="JOBS_TABLE_CONTAINER" component={Paper} sx={{ maxHeight: '100%' }}>
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
                                    onChange={(e) => handleFilterChange(e)}
                                    label="Department"
                                >
                                    <MenuItem value="all">All</MenuItem>
                                    {profile.dept.map((dept) => (
                                        <MenuItem key={dept} value={dept}>{dept.toUpperCase()}</MenuItem>
                                    ))}
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
                                    onChange={(e) => handleFilterChange(e)}
                                    label="Group"
                                >
                                    <MenuItem value="all">All</MenuItem>
                                    {groupOptions.map((group) => (
                                        <MenuItem key={group} value={group}>{group.toUpperCase()}</MenuItem>
                                    ))}
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
                            <TableCell sx={{ bgcolor: 'black' }}>
                                <Button
                                    color="success"
                                    size="small"
                                    variant='contained'
                                    onClick={() => setAddJobModal(true)} >
                                    + Job
                                </Button>
                            </TableCell>
                            <TableCell sx={style.headCell}>
                                Job
                            </TableCell>
                            <TableCell sx={style.headCell} align="center">
                                Group
                            </TableCell>
                            <TableCell sx={style.headCell} align="center">
                                Dept
                            </TableCell>
                            <TableCell sx={style.headCell} align="center">
                                Date Created
                            </TableCell>
                            <TableCell sx={style.headCell} align="center">
                                Last Modified
                            </TableCell>
                            {/* <TableCell align="center">Phone</TableCell>
                            <TableCell align="center">Email</TableCell> */}
                        </TableRow>
                    </TableHead>
                    {rows.length > 0 ?
                        <TableBody>
                            {rows.map((row) => (
                                <Row key={row.key} row={row} refreshJobs={() => getJobs()} />
                            ))}
                        </TableBody>
                        :
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={6} align="center">No Jobs Found</TableCell>
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
                    <AddJob refreshJobs={() => getJobs()} closeModal={() => setAddJobModal(false)} />
                </Box>
            </Modal>
        </>
    );
}

export default Jobs;