import React, { useEffect, useState } from "react";
import { useAuthState } from "../../../context/auth/AuthProvider";
import { button } from "../../../context/style/style";
import { toast } from "react-toastify";
import commonService from "../../../common/common";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Box,
	Button,
	Collapse,
	FormControl,
	Grid,
	IconButton,
	InputLabel,
	MenuItem,
	Modal,
	Paper,
	Select,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
  Typography,
} from "@mui/material";
import { CancelOutlined, Edit, SaveAltOutlined } from "@mui/icons-material";
import scheduleDashboardService from "../../../common/scheduleDashboard";

function Row(props) {
  const { row } = props;
  const [{ colls }, dispatch] = useAuthState();
  const [open, setOpen] = useState(false);
  const [rotaDoc, setRotaDoc] = useState({});
  const [roster, setRoster] = useState({});
  const [shift, setShift] = useState({
    id: "",
    label: "",
    order: 0,
    segs: {},
  })
  const [edit, setEdit] = useState(false)
  const [unsaved, setUnsaved] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [editUserModal, setEditUserModal] = useState(false)
  const [deleteUserModal, setDeleteUserModal] = useState(false)

  // console.log(row)

  const buildKeys = () => {
		let arr = [];
    // console.log(row.roster)
		for (const group in row.roster) {
			// list of field keys in alphabetical order
			let keys = Object.keys(row.roster[group]).sort();
			arr.push({ id:group+row.dept, label: group, data: row.roster[group], keys: keys });
		}
		// Sort groups to keep keys in alphabetical order
		arr.sort((a, b) => {
			if (a.keys[0] < b.keys[0]) {
				return -1;
			}
			if (a.keys[0] > b.keys[0]) {
				return 1;
			}
			// if (a === b)
			return 0;
		});
		// console.log(arr);
		return arr;
	};

  const getRoster = () => {
    let obj = {}
    for (const group in row.roster) {
      for (const key in row.roster[group]) {
        obj[key] = row.roster[group][key]
      }
    }
    setRoster(obj)
  }
  
  const orderOptions = () => {
		// console.log(shifts);
		return Object.keys(rotaDoc.shifts).map((shift, i) => {
			let value = "";
			let obj = {
				value: i + 1,
				label: i + 1,
			};
			if (i === 0) {
				obj.label = "First";
			} else if (i === rotaDoc.shifts.length - 1) {
				obj.label = "Last";
			} else {
				switch (i) {
					case 1:
						obj.label = "Second";
						break;
					case 2:
						obj.label = "Third";
						break;
					case 3:
						obj.label = "Fourth";
						break;
					case 4:
						obj.label = "Fifth";
						break;
					case 5:
						obj.label = "Sixth";
						break;
					default:
						obj.label = i + 1;
				}
			}

			if (i === row.order - 1) {
				obj.label = `${obj.label} (Current)`;
			}

			return obj;
		});
	};

  const cancelEdit = () => {
    setEdit(false)
    getRoster()
    setShift(row)
  }

  const handleChange = (e) => {
		e.preventDefault();
		let objUpdate = {};
		let arrUpdate = [];
		switch (e.target.name) {
			case "str":
				setActive((prev) => ({ ...prev, [e.target.id]: e.target.value }));
				break;
			case "order":
				let order = e.target.value;
				if (order == 0) {
					order = rotaDoc.shifts.length;
				} else if (order > rotaDoc.shifts.length) {
					order = 1;
				}
				setShift((prev) => ({ ...prev, [e.target.name]: parseInt(order) }));
				break;
			case "segs":
				objUpdate = { ...shift.segs, [e.target.id]: e.target.value };
        let newFull = ""
        if (e.target.id === "one") {
          if (shift.segs.two) newFull = `${e.target.value.split("-")[0]} - ${shift.segs.two.split("-")[1]}`
          if (shift.segs.three) newFull = `${e.target.value.split("-")[0]} - ${shift.segs.three.split("-")[1]}`
          if (shift.segs.four) newFull = `${e.target.value.split("-")[0]} - ${shift.segs.four.split("-")[1]}`
        } else if (e.target.id === "two") {
          newFull = `${shift.segs.one.split("-")[0]} - ${e.target.value.split("-")[1]}`
          if (shift.segs.three) newFull = `${shift.segs.one.split("-")[0]} - ${shift.segs.three.split("-")[1]}`
          if (shift.segs.four) newFull = `${shift.segs.one.split("-")[0]} - ${shift.segs.four.split("-")[1]}`
        } else if (e.target.id === "three") {
          newFull = `${shift.segs.one.split("-")[0]} - ${e.target.value.split("-")[1]}`
          if (shift.segs.four) newFull = `${shift.segs.one.split("-")[0]} - ${shift.segs.four.split("-")[1]}`
        } else if (e.target.id === "four") {
          newFull = `${shift.segs.one.split("-")[0]} - ${e.target.value.split("-")[1]}`
        } 

        // console.log(newFull)
        objUpdate['full'] = newFull;
				setShift((prev) => ({ ...prev, segs: objUpdate }));
				break;
			case "roster":
        // console.log(e.target.id)
        setRoster((prev) => ({ ...prev, [e.target.id]: e.target.value }));
				// const name = e.target.value;
				// objUpdate = { ...roster[e.target.dataset.group], [e.target.id]: name };
				// console.log(objUpdate);
				// setRoster((prev) => ({ ...prev, [e.target.dataset.group]: objUpdate }));
				break;
			default:
				console.warn("DepartmentSettings handleChange, ", e.target.name);
		}
	};

  const findChange = () => {
		let change = false;
		if (shift.id !== "") {
			if (shift.order !== row.order) {
				// console.log("Unsaved Order Change")
				change = true;
			}
			if (shift.label !== row.label) {
				// console.log("Unsaved Label Change")
				change = true;
			}
      for (const prop in row.segs) {
        if (shift.segs[prop] !== row.segs[prop]) {
          // console.log("Unsaved Seg Change")
          change = true;
        }
      }
      for (const key in row.roster) {
        for (const prop in row.roster[key]) {
          if (roster[prop] !== row.roster[key][prop]) {
            // console.log("Unsaved Roster Change")
            change = true;
          }
        }
			}
		}
		return change;
	};

	const validate = () => {
		let val = true;
		if (new String(row.label).length < 1) {
			val = false;
		}
		for (const i in row.segs) {
			if (shift.segs[i]?.length < 1) {
				val = false;
			}
		}
		for (const key in roster) {
      if (roster[key].length < 1) {
        val = false;
      }
    }
		return val;
	};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);
    console.log("ROTA: ", rotaDoc)
    let fieldsUpdate = {
      ...rotaDoc.fields[shift.id],
    }
    for (const key in row.roster) {
      for (const prop in row.roster[key]) {
        fieldsUpdate[key][prop] = roster[prop]
      }
    }
    let load = {
      id: "rota",
      dept: row.dept,
      shifts: { ...rotaDoc.shifts, [row.id]: shift },
      fields: { ...rotaDoc.fields, [row.id]: fieldsUpdate },
    };

    console.log("ROW: ", row)
    console.log("LOAD: ", load);
    await toast.promise(
      scheduleDashboardService.editRota(load).then((res) => {
        console.log(res);
        cancelEdit();
      }),
      {
        pending: "Saving rotation updates...",
        success: "Rotation updates saved!",
        error: "Error Saving",
      }
    );
  };

  useEffect(() => {
    getRoster()
    setShift(row)
    colls.forEach((arr) => {
      arr.forEach((obj) => {
        if (obj.id === "rota" && obj.dept === row.dept) {
          // console.log(obj)
          setRotaDoc(obj)
        }
      })
    })
  }, [row, colls])

  // Validation
  useEffect(() => {
    setDisabled(true)
    if (shift.id !== "") {
      const validated = validate();
      // console.log("Validated: ", validated)
      const changeChk = findChange();
      // console.log("Changed: ", changeChk)
  
      if (changeChk) {
        setUnsaved(true);
        if (validated) {
          setDisabled(false);
        } else {
          setDisabled(true);
        }
      } else {
        setUnsaved(false);
        setDisabled(true);
      }
  
    }
	}, [roster, row, shift]);

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
          {row.label}
        </TableCell>
        <TableCell align="center">{row.segs.full}</TableCell>
        <TableCell align="center">{row.dept.toUpperCase()}</TableCell>
        <TableCell align="center">{row.order}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <div className="flex justify-around p-10">
              <Box sx={{ margin: 1, width: '50%', minWidth: '200px' }}>
                <Typography variant="h6" gutterBottom component="span">
                  Shift Details
                </Typography>
                { edit?
                <>
                <Button
                  sx={{ float: 'right', marginRight: '10px' }}
                  variant='contained'
                  color='success'
                  size='small'
                  title='Save Changes'
                  disabled={disabled}
                  onClick={(e) => handleSubmit(e)}
                >
                  <SaveAltOutlined/> Save Changes
                </Button>
                  <Button
                    sx={{ float: 'right', marginRight: '10px' }}
                    variant='outlined'
                    color='error'
                    size='small'
                    title='Cancel Edit'
                    onClick={() => cancelEdit()}
                  >
                    <CancelOutlined/> Cancel
                  </Button>
                </>
                  :
                  <Button
                    sx={{ float: 'right', marginRight: '10px' }}
                    variant='outlined'
                    color='success'
                    size='small'
                    title='Edit Shift'
                    onClick={() => setEdit((prev) => !prev)}
                  >
                    <Edit /> Edit Shift
                  </Button>
                }
                <Table aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Display Order</TableCell>
                      <TableCell>Seg One</TableCell>
                      <TableCell>Seg Two</TableCell>
                      { row.segs.three && <TableCell>Seg Three</TableCell> }
                      { row.segs.four && <TableCell>Seg Four</TableCell> }
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow key={"row.segs.one"}>
                      {/* Order */}
                      <TableCell component="th" scope="row"> 
                        { edit ?
                          <>
                          <FormControl
                            variant="filled"
                            sx={{ m: 1, minWidth: 120, width: "100%" }}
                          >
                            <InputLabel id="order-select-label">
                              Display Order
                            </InputLabel>
                            <Select
                              labelId="order-select-label"
                              id={`${row.id}-order`}
                              name="order"
                              color="success"
                              value={shift.order || 0}
                              onChange={(e) => handleChange(e)}
                              error={shift.order === 0}
                            >
                              <MenuItem hidden value={0}>
                                - Not Selected -
                              </MenuItem>
                              {orderOptions().map((num) => (
                                <MenuItem
                                  key={`${row.id}-order-${num.value}`}
                                  value={num.value}
                                >
                                  {num.label}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </>
                          :
                          row.order
                        } 
                      </TableCell>
                      {/* Segments */}
                      <TableCell style={{minWidth: "max-content"}} scope="row">
                        { edit ?
                          <TextField
                            name={"segs"}
                            id={"one"}
                            variant="standard"
                            color="success"
                            value={shift.segs.one || ""}
                            onChange={(e) => handleChange(e)}
                            helperText={false ? "*Required" : undefined}
                            error={true}
                          />
                          :
                          row.segs.one
                        }
                      </TableCell>
                      {/* <TableCell>{row.segs.two}</TableCell> */}
                      <TableCell style={{minWidth: "max-content"}} scope="row">
                        { edit ?
                          <TextField
                            name={"segs"}
                            id={"two"}
                            variant="standard"
                            color="success"
                            value={shift.segs.two || ""}
                            onChange={(e) => handleChange(e)}
                            helperText={false ? "*Required" : undefined}
                            error={true}
                          />
                          :
                          row.segs.two
                        }
                      </TableCell>
                      { row.segs.three && <TableCell>
                        { edit ?
                          <TextField
                            name={"segs"}
                            id={"three"}
                            variant="standard"
                            color="success"
                            value={shift.segs.three || ""}
                            onChange={(e) => handleChange(e)}
                            helperText={false ? "*Required" : undefined}
                            error={true}
                          />
                          :
                          row.segs.three
                        }
                      </TableCell> }
                      { row.segs.four && <TableCell>
                        { edit ?
                          <TextField
                            name={"segs"}
                            id={"four"}
                            variant="standard"
                            color="success"
                            value={shift.segs.four || ""}
                            onChange={(e) => handleChange(e)}
                            helperText={false ? "*Required" : undefined}
                            error={true}
                          />
                          :
                          row.segs.four
                        }
                      </TableCell> }
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>

              <Box sx={{ margin: 1, width: "40%" }}>
                {
                  <>
                    <Typography variant="h6" gutterBottom component="span">
                      Shift Roster
                    </Typography>
                    <Table size="small" aria-label="purchases">
                      <TableBody>
                        {buildKeys().map((group) => { return (
                          <React.Fragment key={group.id}>
                            <TableRow sx={{backgroundColor: "green"}}>
                              <TableCell>
                                <Typography sx={{backgroundColor: "green", color: "white", fontWeight: 800}}>
                                  {group.label.toUpperCase()}
                                </Typography>
                              </TableCell>
                              <TableCell/>
                            </TableRow>
                            {  group.keys.map((key) => { return (
                                <TableRow key={key}>
                                <TableCell style={{ minWidth: "max-content" }} scope="row">
                                  {key}
                                </TableCell>
                                <TableCell>
                                  { edit? 
                                    <TextField
                                      name={"roster"}
                                      id={key}
                                      variant="standard"
                                      color="success"
                                      data-group={group.label}
                                      value={roster[key] || ""}
                                      onChange={(e) => handleChange(e)}
                                      helperText={false ? "*Required" : undefined}
                                      error={true}
                                    /> 
                                    :
                                    group.data[key] 
                                  }
                                </TableCell>
                              </TableRow>
                              )})}
                            </React.Fragment>
                        )})}
                      </TableBody>
                    </Table>
                  </>
                }
              </Box>
            </div>
          </Collapse>
        </TableCell>
      </TableRow>
      {/* Modals */}
      {/* <Modal
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
      </Modal> */}
    </React.Fragment>
  );
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     name: PropTypes.object.isRequired,
//     displayName: PropTypes.string.isRequired,
//     dept: PropTypes.array.isRequired,
//     role: PropTypes.string.isRequired,
//     startDate: PropTypes.string.isRequired,
//     email: PropTypes.string.isRequired,
//     details: PropTypes.arrayOf(
//       PropTypes.shape({
//         date: PropTypes.string.isRequired,
//         group: PropTypes.string.isRequired,
//         job: PropTypes.string.isRequired,
//       }),
//     ).isRequired,
//   }).isRequired,
// };

function DepartmentSettings({}) {
	const [{ rota, shifts, week, colls }, dispatch] = useAuthState();

	const [active, setActive] = useState({});
	const [fields, setFields] = useState({});
	const [unsaved, setUnsaved] = useState(true);
	const [disabled, setDisabled] = useState(true);
	const [disableCanc, setDisableCanc] = useState();
	const [open, setOpen] = useState([]);
	const [selectedWeek, setSelectedWeek] = useState(0);
	const [rows, setRows] = useState([]);
  const [filter, setFilter] = useState({
    dept: rota.dept,
    role: "all",
  });

	let url = "";
	if (process.env.NODE_ENV === "production") {
		url = process.env.REACT_APP_BASEURL;
	} else {
		url = process.env.REACT_APP_BASEURL_STAGING;
	}
	// resets active and fields on view change
	useEffect(() => {
		clear();
		setSelectedWeek(week);
		setRows(shifts);
    buildRows()
	}, [rota]);

	useEffect(() => {
		// console.log(filter);
    buildRows()
	}, [filter]);

	useEffect(() => {
		const validated = validate();
		// console.log("Validated: ", validated)
		const changeChk = findChange();
		// console.log("Changed: ", changeChk)

		if (changeChk) {
			setUnsaved(true);
		} else {
			setUnsaved(false);
		}

		if (validated) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, [fields, active]);

  const buildRows = () => {
    let arr = [];
    // console.log(colls)
    for (let i in colls) {
      colls[i].map((obj) => {
        if (obj.id === "rota" && obj.dept === filter.dept) {
          // console.log(obj)
          for (const key in obj.shifts) {
            // console.log(key)
            arr.push({
              ...obj.shifts[key], 
              dept: obj.dept, 
              roster: obj.fields[key]
            })
          }
        }
      })
    }
    // sort by order
    arr.sort((a, b) => {
      if (a.order < b.order) {
        return -1;
      }
      if (a.order > b.order) {
        return 1;
      }
      // if (a === b)
      return 0;
    });
    // console.log(arr)
    setRows(arr)
  }

  const filterChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value)
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

	const handleClick = (e) => {
		e.preventDefault();
		// console.log(data)
		if (unsaved) {
			const prompt = confirm("Unsaved changes will be discarded, continue?");
			if (prompt) {
				clear();
			}
		} else {
			clear();
		}
	};

	const clear = () => {
		setActive({});
		setFields({});
		setDisableCanc(false);
		// props.toggle(false)
	};

	const findChange = () => {
		let change = false;
		if (active.id) {
			if (active.order !== rota.shifts[active.id].order) {
				// console.log("Unsaved Order Change")
				change = true;
			}
			if (active.label !== rota.shifts[active.id].label) {
				// console.log("Unsaved Label Change")
				change = true;
			}
			for (const prop in fields) {
				for (const field in fields[prop]) {
					if (fields[prop][field] !== rota.fields[active.id][prop][field]) {
						// console.log("Unsaved Field Change")
						change = true;
					}
				}
			}
			for (const prop in active.segs) {
				if (active.segs[prop] !== rota.shifts[active.id].segs[prop]) {
					// console.log("Unsaved Seg Change")
					change = true;
				}
			}
		}
		return change;
	};

	const validate = () => {
		let val = true;
		if (new String(active.label).length < 1) {
			val = false;
		}
		for (const i in active.segs) {
			if (active.segs[i].length < 1) {
				val = false;
			}
		}
		Object.keys(fields).map((group) => {
			for (const key in fields[group]) {
				if (fields[group][key].length < 1) {
					val = false;
				}
			}
		});
		return val;
	};

	const buildKeys = (shift) => {
		let arr = [];
		const fields = rota.fields[shift];
		for (const group in fields) {
			// list of field keys in alphabetical order
			let keys = Object.keys(fields[group]).sort();
			arr.push({ label: group, data: fields[group], keys: keys });
		}
		// Sort groups to keep keys in alphabetical order
		arr.sort((a, b) => {
			if (a.keys[0] < b.keys[0]) {
				return -1;
			}
			if (a.keys[0] > b.keys[0]) {
				return 1;
			}
			// if (a === b)
			return 0;
		});
		console.log(arr);
		return arr;
	};

	const orderOptions = () => {
		// console.log(shifts);
		return shifts.map((shift, i) => {
			let value = "";
			let obj = {
				value: i + 1,
				label: i + 1,
			};
			if (i === 0) {
				obj.label = "First";
			} else if (i === shifts.length - 1) {
				obj.label = "Last";
			} else {
				switch (i) {
					case 1:
						obj.label = "Second";
						break;
					case 2:
						obj.label = "Third";
						break;
					case 3:
						obj.label = "Fourth";
						break;
					case 4:
						obj.label = "Fifth";
						break;
					case 5:
						obj.label = "Sixth";
						break;
					default:
						obj.label = i + 1;
				}
			}

			if (i === active.order - 1) {
				obj.label = `${obj.label} (Current)`;
			}

			return obj;
		});
	};

	const weekOptions = () => {
		// console.log(rota.length);
		// console.log(week);
		return new Array(rota.length).fill(0).map((num, i) => {
			return {
				value: i + 1,
				label: i + 1,
			};
		});
	};

	const handleChange = (e) => {
		e.preventDefault();
		let objUpdate = {};
		let arrUpdate = [];
		switch (e.target.name) {
			case "str":
				setActive((prev) => ({ ...prev, [e.target.id]: e.target.value }));
				break;
			case "order":
				let order = e.target.value;
				if (order == 0) {
					order = shifts.length;
				} else if (order > shifts.length) {
					order = 1;
				}
				setActive((prev) => ({ ...prev, [e.target.id]: parseInt(order) }));
				break;
			case "segs":
				objUpdate = { ...active.segs, [e.target.id]: e.target.value };
				setActive((prev) => ({ ...prev, segs: objUpdate }));
				break;
			case "fields":
				const name = e.target.value;
				objUpdate = { ...fields[e.target.dataset.group], [e.target.id]: name };
				// console.log(objUpdate);
				setFields((prev) => ({ ...prev, [e.target.dataset.group]: objUpdate }));
				break;
			default:
				console.log("DepartmentSettings handleChange, ", e.target.name);
		}
	};

	const updatePosts = async (e) => {
		const months = [
			"January",
			"Febuary",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];
		e.preventDefault();
		const start = new Date(`${months[2]} 1, 2023 00:00:00`).getTime();
		const end = new Date(`${months[2]} 30, 2023 00:00:00`).getTime();
		console.log(start, end);
		const load = {
			dept: rota.dept,
			coll: `${rota.dept}-posts`,
			start: start,
			end: end,
		};
		await fetch(`${url}/${e.target.id}`, {
			method: "POST",
			mode: "cors",
			body: JSON.stringify(load),
		}).then((res) => {
			console.log(res.text());
			// clear()
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setDisableCanc(true);
		const load = {
			id: rota.id,
			dept: rota.dept,
			shifts: { [active.id]: active },
			fields: { [active.id]: fields },
		};
		console.log(load);
		await toast.promise(
			commonService
				.commonAPI("fsApp/editRota", load)
				.then((res) => {
					console.log(res);
					clear();
				})
				.catch((err) => {
					console.log(err);
					toast.error(err.message);
				}),
			{
				pending: "Saving rotation updates...",
				success: "Rotation updates saved!",
				error: "Error Saving",
			}
		);
	};

	const styles = {
		main: `select-none bg-white relative min-h-max min-w-[400px] overflow-auto flex flex-col p-.02 text-green text-center`,
		header: `w-full bg-green text-white mb-.01 border-b border-black`,
		cardCont: `w-full`,
		form: `flex flex-wrap justify-around w-full border-2 p-.02 border-t-0`,
		cont: ``,
		field: `flex flex-col items-between font-bold text-xl my-10`,
		input: `flex items-end justify-between font-semibold`,
		select: `w-.5 text-lg font-semibold text-black text-center rounded-tl-lg border-b-2 border-4 border-todayGreen mt-.02 border-b-black   p-.01  focus:outline-none`,
		btnCont: `w-full flex justify-around`,
		submit: `${button.green} px-.02 mt-10 rounded-xl text-2xl font-semibold`,
		clear: `${button.red} px-.02 mt-10 rounded-xl text-2xl font-semibold`,
	};
	return (
		<div className={styles.main}>
			{/* {shifts.map((shift, i) => (
				<span key={`${shift.label}-${shift.dept}`}>
					<div
						key={`shift-${i}`}
						className={styles.header}
						onClick={() => {
							let arr = [...open];
							if (open.includes(i)) {
								arr.splice(arr.indexOf(i), 1);
							} else {
								arr.push(i);
							}
							setOpen(arr);
						}}
					>
						<h1>{shift.label}</h1>
						<IconButton
							aria-label="expand row"
							size="small"
							onClick={() => {
								let arr = [...open];
								if (open.includes(i)) {
									arr.splice(arr.indexOf(i), 1);
								} else {
									arr.push(i);
								}
								setOpen(arr);
							}}
						>
							{open.includes(i) ? (
								<KeyboardArrowUpIcon />
							) : (
								<KeyboardArrowDownIcon />
							)}
						</IconButton>
					</div>
					<Collapse in={open.includes(i)} timeout="auto" unmountOnExit>
						<Grid container>
							<Grid item xs={6}>
								<Grid item xs={6} sm={6}>
									<FormControl
										variant="filled"
										sx={{ m: 1, minWidth: 120, width: "100%" }}
									>
										<TextField
											name="str"
											id="shift-label"
											label="Shift Label"
											variant="standard"
											color="success"
											value={active.label || ""}
											onChange={(e) => handleChange(e)}
											helperText={false ? "*Required" : undefined}
											error={true}
										/>
									</FormControl>
								</Grid>
								<Grid item xs={6} sm={6}>
									<FormControl
										variant="filled"
										sx={{ m: 1, minWidth: 120, width: "100%" }}
									>
										<InputLabel id="order-select-label">
											Display Order
										</InputLabel>
										<Select
											labelId="order-select-label"
											id={`{shift}-order`}
											name="order"
											color="success"
											value={active.order || 0}
											onChange={(e) => handleChange(e)}
											error={true}
										>
											<MenuItem hidden value={0}>
												- Not Selected -
											</MenuItem>
											{orderOptions().map((num) => (
												<MenuItem
													key={`{shift}-order-${num.value}`}
													value={num.value}
												>
													{num.label}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</Grid>
								<Grid item xs={6} sm={6}>
									<FormControl
										variant="filled"
										sx={{ m: 1, minWidth: 120, width: "100%" }}
									>
										<TextField
											name="str"
											id="7am-11am"
											label="Full Shift"
											variant="standard"
											color="success"
											value={"7am - 3pm"}
											onChange={(e) => handleChange(e)}
											helperText={false ? "*Required" : undefined}
											error={true}
										/>
									</FormControl>
								</Grid>
								<Grid item xs={6} sm={6}>
									<FormControl
										variant="filled"
										sx={{ m: 1, minWidth: 120, width: "100%" }}
									>
										<TextField
											name="str"
											id="shift"
											label="Segment One"
											variant="standard"
											color="success"
											value={"shift.segs[0]"}
											onChange={(e) => handleChange(e)}
											helperText={false ? "*Required" : undefined}
											error={true}
										/>
									</FormControl>
								</Grid>
							</Grid>
							<Grid item xs={6}>
								<Grid item xs={6} sm={6}>
									<FormControl
										variant="filled"
										sx={{ m: 1, minWidth: 120, width: "100%" }}
									>
										<InputLabel id="week-select-label">Week</InputLabel>
										<Select
											labelId="week-select-label"
											id={`{shift}-order`}
											name="week"
											color="success"
											value={week || 0}
											onChange={(e) => handleChange(e)}
											error={true}
										>
											<MenuItem hidden value={0}>
												- Not Selected -
											</MenuItem>
											{weekOptions().map((num) => (
												<MenuItem
													key={`{shift}-order-${num.value}`}
													value={num.value}
												>
													{num.label}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</Grid>
								{buildKeys(shift.id).map((group) => (
									<>
										<Grid item xs={6} sm={6}>
											<h1 key={group.label}>{group.label.toUpperCase()}</h1>
										</Grid>
										{group.keys.map((key) => (
											<Grid key={key} item xs={6} sm={6}>
												<FormControl
													variant="filled"
													sx={{ m: 1, minWidth: 120, width: "100%" }}
												>
													<TextField
														name={key}
														id={key}
														label={key}
														variant="standard"
														color="success"
														value={fields[key] || ""}
														onChange={(e) => handleChange(e)}
														helperText={false ? "*Required" : undefined}
														error={true}
													/>
												</FormControl>
											</Grid>
										))}
									</>
								))}
							</Grid>
						</Grid>
					</Collapse>
				</span>
			))} */}
			<>
				<TableContainer
					id="USERS_TABLE_CONTAINER"
					component={Paper}
					sx={{ maxHeight: "70%" }}
				>
					<Box sx={{ marginTop: 2, marginLeft: 4 }}>
						<Typography variant="h6" className="float-left">Select Department</Typography>
						<Grid container spacing={2}>
							<Grid item xs={6} sm={3}>
								<FormControl
									variant="filled"
									sx={{ m: 1, minWidth: 120, width: "100%" }}
								>
									<InputLabel id="role-select-label">Department</InputLabel>
									<Select
										labelId="role-select-label"
										id="dept-filter"
										name="dept"
										color="success"
										value={filter.dept}
										onChange={(e) => filterChange(e)}
										label="Department"
									>
										<MenuItem value="csst">CSST</MenuItem>
										<MenuItem value="casc">CASC</MenuItem>
									</Select>
								</FormControl>
							</Grid>
							{/* <Grid item xs={6} sm={3}>
								<FormControl
									variant="filled"
									sx={{ m: 1, minWidth: 120, width: "100%" }}
								>
									<InputLabel id="role-select-label">Role</InputLabel>
									<Select
										labelId="role-select-label"
										id="role-filter"
										name="role"
										color="success"
										value={filter.role}
										onChange={(e) => filterChange(e)}
										label="Role"
									>
										<MenuItem value="all">All</MenuItem>
										<MenuItem value="admin">Admin</MenuItem>
										<MenuItem value="ee">Employee</MenuItem>
										<MenuItem value="sup">Supervisor</MenuItem>
										<MenuItem value="op">Operations</MenuItem>
									</Select>
								</FormControl>
							</Grid> */}
							{/* <Grid item xs={6} sm={3}>
                            <FormControl variant="filled" sx={{ m: 1, minWidth: 120, width: "100%" }}>
                                <Input id="search" color='success' placeholder='Search' sx={{ m: 1, minWidth: 120, width: "100%" }} />
                            </FormControl>
                        </Grid> */}
						</Grid>
					</Box>
					<Table aria-label="collapsible table" stickyHeader>
						<TableHead>
							<TableRow>
								<TableCell sx={{ bgcolor: "black" }}>
								</TableCell>
								<TableCell
									sx={{
										bgcolor: "black",
										color: "white",
										fontWeight: 600,
										fontSize: "1.2rem",
									}}
								>
									Label
								</TableCell>
								<TableCell
									sx={{
										bgcolor: "black",
										color: "white",
										fontWeight: 600,
										fontSize: "1.2rem",
									}}
									align="center"
								>
									Shift Time
								</TableCell>
								<TableCell
									sx={{
										bgcolor: "black",
										color: "white",
										fontWeight: 600,
										fontSize: "1.2rem",
									}}
									align="center"
								>
									Dept
								</TableCell>
								<TableCell
									sx={{
										bgcolor: "black",
										color: "white",
										fontWeight: 600,
										fontSize: "1.2rem",
									}}
									align="center"
								>
									Display Order
								</TableCell>
							</TableRow>
						</TableHead>
						{rows.length > 0 ? (
							<TableBody>
								{rows.map((row) => (
									<Row key={row.id} row={row} />
								))}
							</TableBody>
						) : (
							<TableBody>
								<TableRow>
									<TableCell colSpan={6} align="center">
										No Users Found
									</TableCell>
								</TableRow>
							</TableBody>
						)}
					</Table>
				</TableContainer>
				{/* <Modal
					open={addUserModal}
					onClose={() => setAddUserModal(false)}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={style.newUser}>
						<AddUser closeModal={() => setAddUserModal(false)} />
					</Box>
				</Modal> */}
			</>
		</div>
	);
}

export default DepartmentSettings;
