import TextField from '@mui/material/TextField';
import { Select, MenuItem, FormControl, InputLabel, Grid, FormControlLabel, Checkbox, Autocomplete } from '@mui/material';
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
import { Upload } from '@mui/icons-material';
import { FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';
import colors from "../../assets/colors";
import commonService from '../../common/common';

const CallInModal = ({ show }) => {
  const reasonOptions = [
    "CallIn",
    "Leave Early",
    "Vacation",
    "Extra Help",
    "Sick",
    "Personal",
    "Family",
    "Bereavement",
    "No Show",
    "Leave"
  ];
  const initialFormData = {
    name: "",
    reason: reasonOptions[0],
    date: "",
    shift: "",
    job: "",
    creator: "",
    seg: {},
    color: "",
  }

  const [{formObj, users, cols}, dispatch] = useAuthState();

  const [filteredUsers, setFilteredUsers] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [disabled, setDisabled] = useState({
    name: false,
    reason: false,
    color: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [colorOptions, setColorOptions] = useState([]);
  const [colorLoading, setColorLoading] = useState(false);
  const [nameOptions, setNameOptions] = useState([""]);

  const onMounted = async () => {
    console.log("CallInModal mounted",
      // formObj.date,
      // formObj.shift.label,
      // formObj.pos.label,
      // formObj.norm,
      // formObj.pos.color,
      // formObj.shift.segs
    );
    // Get the current values for the cell
    let cell_values = [];
    if (formObj.post) {
      console.log("Post", formObj.post);
      //TODO: Get cell values from post[seg]
    } else {
      console.log("No Post");
      if (!formObj.norm) {
        setDisabled((prev) => ({ ...prev, name: true, reason: true, color: true}));
      }
      cell_values.push(formObj.norm? formObj.norm : formObj.pos.label);
    }
    setNameOptions(cell_values);

    // Get creator options from users that have the ee role
    let creatorOptions = [];
    users.forEach(user => {
      if (user.role === "ee") {
        creatorOptions.push(user.dName);
      }
    });
    // console.log(creatorOptions);
    setFilteredUsers(creatorOptions);
    let initial_seg = {};
    formObj.shift.segs.forEach(seg => {
      initial_seg[seg.key] = seg;
    });
    let form = {
      name: formObj.norm? formObj.norm : formObj.pos.label,
      reason: reasonOptions[3],
      date: formObj.date,
      shift: formObj.shift.label,
      job: formObj.pos.label,
      seg: initial_seg,
      color: formObj.pos.color,
    }
    setFormData((prev) => ({ ...prev, ...form }));
    console.log("colors", colorOptions);
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

  const getColorInfo = async (color) => {
    
    const [res, error] = await commonService.getColorInfo(color);
    if (error) {
      console.error(error);
      throw new Error("Error getting color info");
    } else {
      return res
    }
  }

  const updateFormData = (seg) => {
    console.log("Updating Form Data", seg);
    setFormData((prev) => ({ ...prev, seg: {...prev.seg, [seg.key]: seg}}));
  }

  const validateForm = () => {
    let valid = true;
    if (!formData.creator) {
      console.log("No creator");
      valid = false;
    } 
    if (!formData.seg) {
      console.log("No segments");
      valid = false;
    } else {
      for (let key in formData.seg) {
        if (!formData.seg[key].value && formData.seg[key].fill) {
          console.log("No value in filled segment", key);
          valid = false;
        }
      }
    }
    console.log("Valid", valid);
    setSubmitDisabled(!valid);
  }

  const handleSubmit = async () => {
    console.log("Submit Form Data", formData);
    setIsLoading(true);
    setSubmitDisabled(true);
    let down_date = new Date().getTime();

    console.table(formObj.id, formObj.shift.id, formObj.pos.id, formObj.norm, formObj.date, down_date, new Date().getTime(), formData.creator, formData.seg, formData.color, formData.reason, formData.name)
    let post = {
      id: formObj.id,
      shift: formObj.shift.id,
      pos: formObj.pos.id,
      norm: formData.name,
      date: formObj.date,
      down: down_date,
      created: new Date().getTime(),
      creator: formData.creator,
      seg: formData.seg,
      tag: {
        color: formData.color, 
        reason: formData.reason,
        name: formData.name,
      },
    };

    // console.table(post.seg);

    setIsLoading(false);
    setSubmitDisabled(false);

    const data = {
      dept: formObj.dept,
      pos: formObj.pos.id,
      archive: `${new Date(cols[0].label).toDateString()}`,
      data: [post],
    };

    console.log(data);
    await toast.promise(
      commonService.commonAPI("fsApp/setPost", data).then((res) => {
        console.log(res.message);
        if (res.message.toLowerCase().includes("error")) {
          setDisabled(false);
        } else {
          handleClose();
        }
      }), {
        pending: "Posting Update...",
        success: "Schedule Updated",
        error: "Error updating schedule",
      });
  }

  useEffect(() => {
    // console.log("Form Data", formData);
    validateForm();
  }, [formData]);

  useEffect(() => {
    onMounted();
    return () => {
      onUnMounted();
    };
  },[formObj, users]);

  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  
  function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

  // Color Options
  useEffect(() => {
    setColorLoading(true);
    (async () => {
      let options = [];
      if (formObj.pos.color.includes("rgb") && !formObj.norm) {
        let rgb = formObj.pos.color.replace("rgb(", "").replace(")", "").split(",");
        let converted_color = rgbToHex(parseInt(rgb[0]), parseInt(rgb[1]), parseInt(rgb[2]));
        console.log("Converted Color", converted_color);
        
        const current_color = await getColorInfo(converted_color);
        console.log("Current Color", current_color);
        options.push({
          name: "Default",
          text: current_color.colors[0].bestContrast,
          code: formObj.pos.color,
        });
      }

      for (let i in colors) {
        let color = colors[i];
        try {
          const res = await getColorInfo(color);
          if (i > 0 && i < 5) {
            console.log("Color Info", res);
          }
          options.push({
            name: res.colors[0].name,
            text: res.colors[0].bestContrast,
            code: color,
          });
        } catch (error) {
          console.error(error);
          options.push({
            name: "Unknown",
            text: "black",
            code: color,
          });
        }
      }
      console.log("Color Options", options);
      setFormData((prev) => ({ ...prev, color: formObj.norm? options[0].code : formObj.pos.color }));
      setColorOptions(options);
      // setColorLoading(false);
    })();
    return () => {
      // cleanup
      // setColorLoading(false);
    }
  }, []);

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
          {/* <Grid item xs={4}>
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
          </Grid> */}
          <Grid item xs={6}>
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
          <Grid item xs={6}>
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
              label="Date Filled"
              value={dateDisplay("today")}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{mt: 0}}>
          <Grid item xs={6}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="name-label">Name</InputLabel>
              <Select
                id="name"
                label="Name"
                labelId='name-label'
                value={formData.name}
                disabled={disabled.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              >
                {nameOptions.map((option, index) => (
                  <MenuItem key={index} value={option}>{option}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="reason-label">Reason</InputLabel>
              <Select
                label="Reason"
                labelId='reason-label'
                id="reason"
                value={formData.reason}
                disabled={disabled.reason}
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
              <div className="input-loading-overlay">
                {colorLoading && 
                  <FaSpinner className="animate-spin" />
                }
              </div>
              <InputLabel id="color-label">Color</InputLabel>
              <Select
                id="color"
                labelId='color-label'
                label="Color"
                value={formData.color}
                disabled={disabled.color}
                isLoading={colorOptions.length === 0}
                onChange={(e) => setFormData((prev) => ({ ...prev, color: e.target.value }))}
              >
                {colorOptions.map((color, index) => (
                  <MenuItem key={index} value={color.code}>
                    <div
                      style={{
                        width: "100%",
                        height: "30px",
                        fontWeight: "bold",
                        color: color.text,
                        backgroundColor: color.code,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "5px",
                        border: "1px solid black",
                      }}
                    >{color.name}</div>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              id="creator"
              disablePortal
              options={filteredUsers}
              sx={{ width: "100%" }}
              onChange={(e, value) => setFormData((prev) => ({ ...prev, creator: value }))}
              renderInput={
                (params) => 
                  <TextField {...params} 
                    error={!formData.creator} 
                    helperText={!formData.creator && "Please select your name"} 
                    label={formData.creator? "Filled By" : "Select Your Name"} 
                  />
              }
            />
          </Grid>
        </Grid>
        
        {formObj.shift.segs.map((seg, index) => (
          <ShiftSegment key={index} segment={seg} onUpdate={updateFormData} />
        ))}

      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button 
          variant="contained"
          color="success"
          endIcon={<Upload />}
          onClick={handleSubmit} 
          disabled={submitDisabled}
        >
          {
            isLoading? "Posting Update..." : "Update Schedule"
          }
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CallInModal;