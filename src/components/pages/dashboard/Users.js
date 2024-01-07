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
import AddUser from '../../forms/AddUser';
import { Delete, DeleteOutlineOutlined, Edit } from '@mui/icons-material';
import { toast } from 'react-toastify';
import commonService from '../../../common/common';
import EditUser from '../../forms/EditUser';
import jobsDashboardService from '../../../common/jobsDashboardService';
import usersDashoardService from '../../../common/usersDashoardService';

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
  const [jobsOpen, setJobsOpen] = React.useState(false);
  const [editUserModal, setEditUserModal] = React.useState(false)
  const [deleteUserModal, setDeleteUserModal] = React.useState(false)

  const deleteUser = (user) => {
    // console.log(user)
    setDeleteUserModal(false)
    toast.promise(
      usersDashoardService.deleteUser({ uid: user.id }),
      {
        pending: 'Deleting user...',
        success: `User ${user.dName} deleted!`,
        error: 'Error deleting user'
      }
    )
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
          {row.name.first + ' ' + row.name.last}
        </TableCell>
        <TableCell align="center">{row.displayName}</TableCell>
        <TableCell align="center">{row.dept[0].toUpperCase()}</TableCell>
        <TableCell align="center">{row.role.toUpperCase()}</TableCell>
        <TableCell align="center">{row.startDate}</TableCell>
        {/* <TableCell align="center">{row.phone}</TableCell>
                <TableCell align="center">{row.email}</TableCell> */}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1, width: '30%', minWidth: '200px' }}>
              <Typography variant="h6" gutterBottom component="span">
                User Details
              </Typography>
              <IconButton
                sx={{ float: 'right', marginRight: '10px' }}
                variant='contained'
                color='success'
                size='small'
                title='Edit User'
                onClick={() => setEditUserModal(true)}
              >
                <Edit />
              </IconButton>
              <IconButton
                sx={{ float: 'right', marginRight: '10px' }}
                variant='contained'
                color='error'
                size='small'
                title='Delete User'
                onClick={() => setDeleteUserModal(true)}
              >
                <Delete />
              </IconButton>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Phone</TableCell>
                    <TableCell>Email</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">{row.phone}</TableCell>
                    <TableCell>{row.email}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
            <Box sx={{ margin: 1 }}>
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
                          {/* <TableCell /> */}
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
                            {/* <TableCell align="center">
                                                            <Button variant='contained'> Disqualify </Button>
                                                        </TableCell> */}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Collapse>
                </>
              }
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      {/* Modals */}
      <Modal
        id={`edit-user-${row.id}`}
        open={editUserModal}
        onClose={() => setEditUserModal(false)}
        aria-labelledby="edit-user-modal-title"
      >
        <Box sx={style.newUser}>
          <EditUser user={row} closeModal={() => setEditUserModal(false)} />
        </Box>
      </Modal>
      <Modal
        open={deleteUserModal}
        onClose={() => closeModal("delete-user")}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style.deleteUser}>
          <Typography variant='h6'>Are you sure you want to delete user <b> {`${row.name.first} ${row.name.last}`} </b>?</Typography>
          <div className='w-[90%] flex justify-around'>
            <Button variant='contained' color='error' onClick={() => deleteUser(row)}>Delete</Button>
            <Button variant='contained' color='success' onClick={() => setDeleteUserModal(false)}>Cancel</Button>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.object.isRequired,
    displayName: PropTypes.string.isRequired,
    dept: PropTypes.array.isRequired,
    role: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    details: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
        group: PropTypes.string.isRequired,
        job: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

export default function Users() {
  const [{ users, profile, view, colls }, dispatch] = useAuthState()
  const [rows, setRows] = React.useState([])
  const [jobs, setJobs] = React.useState([])
  const [addUserModal, setAddUserModal] = React.useState(false)
  const [filter, setFilter] = React.useState({
    dept: 'all',
    role: 'all',
    search: ''
  })

  const filterUsers = (e) => {
    // console.log(e.target.name, e.target.value)
    const { name, value } = e.target
    // console.log("filter", filter)
    // console.log("users", users)
    setFilter({ ...filter, [name]: value })

  }

  const getJobs = () => {
    // console.log(colls)
    let arr = []
    colls.forEach(coll => {
      coll.map(job => {
        arr.push(job)
      })
    })
    // console.log(arr)
    setJobs(arr)
  }

  React.useEffect(() => {
    getJobs()
  }, [])

  React.useEffect(() => {
    // console.log(users)
    let arr = []
    let filteredUsers = []
    let dept = filter.dept
    let role = filter.role
    // let search = filter.search
    users.map((user) => {
      if (user.dept[0] === dept || dept === 'all') {
        if (user.role === role || role === 'all') {
          arr.push(user)
        }
      }
    })
    arr.map((user) => {
      // console.log(user)
      if (user.role === role || role === 'all') {
        let details = []
        if (user.role === 'ee') {
          jobs.map((job) => {
            // console.log(job)
            if (user.quals.includes(job.id)) {
              details.push({
                id: job.id,
                date: moment().format('MM/DD/YYYY'),
                group: job.group,
                job: job.label
              })
            }
          })
        }
        let rowData = {
          name: user.name,
          displayName: user.dName,
          dept: user.dept,
          role: user.role,
          level: user.level,
          startDate: moment(new Date(user.startDate)).format('MM/DD/YYYY'),
          phone: user.phone,
          email: user.email ? user.email : 'none',
          details: details,
          id: user.id
        }
        filteredUsers.push(rowData)
      }
    })
    setRows(filteredUsers)
  }, [users, view, filter, jobs])

  return (
    <>
      <TableContainer id="USERS_TABLE_CONTAINER" component={Paper} sx={{ maxHeight: '70%' }}>
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
                <InputLabel id="role-select-label">Role</InputLabel>
                <Select
                  labelId="role-select-label"
                  id="role-filter"
                  name="role"
                  color="success"
                  value={filter.role}
                  onChange={(e) => filterUsers(e)}
                  label="Role"
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="ee">Employee</MenuItem>
                  <MenuItem value="sup">Supervisor</MenuItem>
                  <MenuItem value="op">Operations</MenuItem>
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
              <TableCell sx={{ bgcolor: 'black' }}><Button color="success" size="small" variant='contained' onClick={() => setAddUserModal(true)} >+ User</Button></TableCell>
              <TableCell sx={{ bgcolor: 'black', color: 'white', fontWeight: 600, fontSize: '1.2rem' }}>Full Name</TableCell>
              <TableCell sx={{ bgcolor: 'black', color: 'white', fontWeight: 600, fontSize: '1.2rem' }} align="center">Display Name</TableCell>
              <TableCell sx={{ bgcolor: 'black', color: 'white', fontWeight: 600, fontSize: '1.2rem' }} align="center">Dept</TableCell>
              <TableCell sx={{ bgcolor: 'black', color: 'white', fontWeight: 600, fontSize: '1.2rem' }} align="center">Role</TableCell>
              <TableCell sx={{ bgcolor: 'black', color: 'white', fontWeight: 600, fontSize: '1.2rem' }} align="center">Start Date</TableCell>
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
        onClose={() => setAddUserModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style.newUser}>
          <AddUser closeModal={() => setAddUserModal(false)} />
        </Box>
      </Modal>
    </>
  );
}