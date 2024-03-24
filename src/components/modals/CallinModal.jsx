import TextField from '@mui/material/TextField';
import { Select, MenuItem, FormControl, InputLabel, Grid, FormControlLabel, Checkbox } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import ShiftSegment from './call-in-modal/ShiftSegment';
import { useEffect, useState } from 'react';
import { useAuthState } from '../../context/auth/AuthProvider';
import moment from 'moment';

const CallInModal = ({ show }) => {
  const reasonOptions = [
    "CallIn",
    "Extra Help",
    "Vacation",
    "Sick",
    "Personal",
    "Family",
    "Other",
  ];
  const initialFormData = {
    name: "",
    reason: reasonOptions[0],
    date: "",
    shift: "",
    job: "",
    creator: "",
    seg: {},
  }

  const [{formObj, users}, dispatch] = useAuthState();

  const [filteredUsers, setFilteredUsers] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const onMounted = () => {
    console.log("CallInModal mounted");
    // console.log(formObj);
    // Get creator options from users that have the ee role
    const creatorOptions = users.filter(user => user.role === "ee");
    // console.log(creatorOptions);
    setFilteredUsers(creatorOptions);
    let initial_seg = {};
    formObj.shift.segs.forEach(seg => {
      initial_seg[seg.key] = seg;
    });
    let form = {
      name: formObj.norm,
      date: formObj.date,
      shift: formObj.shift.label,
      job: formObj.pos.label,
      seg: initial_seg,
    }
    setFormData((prev) => ({ ...prev, ...form }));
  }

  const onUnMounted = () => {
    console.log("CallInModal unmounted");
    setFormData(initialFormData);
  }

  const dateDisplay = (day) => {
    let date = new Date(formData.date);
    if (day === "today") {
      return moment().format("MMM DD, YYYY");
    }
    return moment(date).format("MMM DD, YYYY");
  }

  const updateFormData = (seg) => {
    console.log("Updating Form Data", seg);
    setFormData((prev) => ({ ...prev, seg: {...prev.seg, [seg.key]: seg}}));
  }

  const validateForm = () => {
    let valid = true;
    if (!formData.creator) {
      valid = false;
    } 
    if (!formData.seg) {
      valid = false;
    } else {
      for (let key in formData.seg) {
        if (!formData.seg[key].value && formData.seg[key].fill) {
          valid = false;
        }
      }
    }
    console.log("Valid", valid);
    setSubmitDisabled(!valid);
  }

  useEffect(() => {
    console.log("Form Data", formData);
    validateForm();
  }, [formData]);

  useEffect(() => {
    onMounted();
    return () => {
      onUnMounted();
    };
  },[formObj, users]);

  const handleClose = () => {
    console.log("CallInModal closed");
    dispatch({ type: "CLOSE-FORM", name: "showCallin" })
  }

  return (
    <Dialog open={show} onClose={handleClose}>
      <DialogTitle>Schedule Update Form</DialogTitle>
      <DialogContent sx={{width: "500px"}}>
        <DialogContentText>
          Please fill out the form below to update the schedule after you've completed the call in sheet.
        </DialogContentText>
        <Grid container spacing={1} sx={{mt: 0}}>
          <Grid item xs={4}>
            <TextField
              className='bold-input'
              size="small"
              sx={{ width: "100%" }}
              margin="dense"
              id="name"
              label="Employee Name"
              type="text"
              value={formData.name}
            />
          </Grid>
          <Grid item xs={4}>
          <TextField
              className='bold-input'
              size="small"
              sx={{ width: "100%" }}
              margin="dense"
              id="job"
              label="Job"
              type="text"
              value={formData.job}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              className='bold-input'
              size="small"
              sx={{ width: "100%" }}
              margin="dense"
              id="shift"
              label="Shift"
              type="text"
              value={formData.shift}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              className='bold-input'
              size="small"
              sx={{ width: "100%" }}
              margin="dense"
              id="date"
              type="text"
              label="Date of Vacancy"
              value={dateDisplay("vacancy")}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              className='bold-input'
              size="small"
              sx={{ width: "100%" }}
              margin="dense"
              id="date-filled"
              type="text"
              label="Date of Filled"
              value={dateDisplay("today")}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{mt: 0}}>
          <Grid item xs={6}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="reason-label" sx={{fontWeight: 600}}>Reason</InputLabel>
              <Select
                label="Reason"
                labelId='reason-label'
                id="reason"
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              >
                {reasonOptions.map((option, index) => (
                  <MenuItem key={index} value={option}>{option}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="creator-name-label" sx={{fontWeight: formData.creator? 600:500}}>{formData.creator? "Filled By" : "Select Your Name"}</InputLabel>
              <Select
                id="creator"
                label={formData.creator? "Filled By" : "Select Your Name"}
                labelId="creator-name-label"
                value={formData.creator}
                onChange={(e) => setFormData({ ...formData, creator: e.target.value })}
              >
                {filteredUsers.map((user, index) => (
                  <MenuItem key={index} value={user.dName}>{user.dName}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        
        {formObj.shift.segs.map((seg, index) => (
          <ShiftSegment key={index} segment={seg} onUpdate={updateFormData} />
        ))}

      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose} disabled={submitDisabled}>Update Schedule</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CallInModal;