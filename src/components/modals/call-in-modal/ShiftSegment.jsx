import { Autocomplete, Checkbox, FormControlLabel, Grid, Switch, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuthState } from "../../../context/auth/AuthProvider";

const ShiftSegment = ({ segment, onUpdate, index }) => {
  const [{ users, rota, formObj }, _] = useAuthState();
  const [userOptions, setUserOptions] = useState([]);
  const [state, setState] = useState({
    key: "",
    name: "",
    label: "",
    bids: [],
    fill: false,
    forced: false,
    trade: false,
  });

  const toggleSegment = (checked) => {
    let container = document.getElementById(`${state.key}-container`);
    if (!container) {
      if (process.env.NODE_ENV === "development") {
        console.log("Container not found");
      }
      return;
    }
    if (!checked) {
      container.classList.add("no-fill");
    } else {
      container.classList.remove("no-fill");
    }
  }

  const handleChange = (e, val) => {
    // console.log("handleChange", e.target.id, e.target.checked, e.target.innerText)
    const id = e.target.id.split("-")[1];
    const value = val ? val : e.target.value;
    // console.log("ID", id, value);
    
    let update = {...state};
    // console.log("Update", update);
    switch (id) {
      case "fill":
        update.fill = e.target.checked;
        if (e.target.checked) {
          update.name = "";
        } else if (formObj.norm[0] !== formObj.pos.label) {
          update.name = formObj.norm[0];
        } else {
          update.name = "N/F";
        }
          toggleSegment(e.target.checked);
        break;
      case "name":
        update.name = value;
        break;
      case "forced":
        update.forced = e.target.checked;
        break;
      case "trade":
        update.trade = e.target.checked;
        break;
      default:
        break;
    }
      
    setState(update);
  };

  const onMounted = () => {
    console.log(segment, formObj)
    let update = {};
    if (formObj.post) {

      if (segment.hasOwnProperty("segs") && Array.isArray(segment.segs)) {
        // console.log("Segment has slots", segment.segs);
      } else {
        update = {
          key: segment.key,
          name: "",
          label: segment.label,
          bids: segment.bids,
          fill: segment.fill,
          forced: segment.forced,
          trade: segment.trade,
        };
      }
    } else {
      // Create a new posting segment
      update = {
        key: segment.key,
        name: "",
        label: segment.name,
        bids: [],
        fill: true,
        forced: false,
        trade: false,
      };
    }
    // console.log("Mounted", update);

    // update.key = segment.key? segment.key : index;

    let hasFill = segment.hasOwnProperty("fill")
    if (hasFill) { 
      update.fill = segment.fill;
      // toggleSegment(segment.fill);
    } else {
      if (formObj.pos.group === "misc") {
        update.fill = true;
        toggleSegment(true);
      } else {
        console.log("No fill property", segment);
        update.fill = false;
      }
    }

    setState(update);
    onUpdate(update);
    
    // toggleSegment(!segment.fill);
    return;
  }

  useEffect(() => {
    // console.log("Segment", segment);
    onMounted();
  }, [segment, formObj]);

  useEffect(() => {
    let options = []
    users.map(user => {
      if (user.role === "ee" && user.dept.includes(rota.dept)) {
        if (user.quals.includes(formObj.pos.id)) {
          options.push(user.dName);
        } else {
          // console.log("User does not have the required qualifications", user.dName);
        }
      }
    });
    options.push("N/F");
    setUserOptions(options);
  }, [users]);

  useEffect(() => {
    console.log("Updating Parent ", state);
    onUpdate(state);
    // console.log("Updated Parent ", segment);

    return () => {
      // cleanup
    }
  }, [state]);

  return (
    <Grid container spacing={2} sx={{mt: 0}}>
      <Grid item xs={12} sx={{display: "flex", alignItems: "center"}}>
        <FormControlLabel 
          control={
            <Switch 
              id={`${segment.key}-fill`} 
              sx={{marginLeft: 2, marginRight: 1}}
              color="primary" 
              checked={state.fill} 
              onChange={(e) => handleChange(e)}
            />
          } 
          label="Fill" 
        />
        {!state.fill && (
          <h6 className="ml-2 font-semibold text-lg">{segment.name}</h6>
        )}
      </Grid>
      <div id={`${state.key}-container`} className={`seg-info-container`}>
        <Grid item xs={6}>
        <Autocomplete
          id={`${segment.key}-name`} 
          disablePortal
          disabled={!state.fill}
          size="small"
          options={userOptions}
          sx={{ width: "100%" }}
          value={state.name}
          onChange={(e, value) => handleChange(e, value)}
          isOptionEqualToValue={(option, value) => option === value || value === ""}
          renderInput={
            (params) => 
              <TextField {...params} 
                value={state.name}
                label={state.label}
                disabled={!state.fill}
                error={state.fill && !state.name}
                helperText={state.fill && !state.name && "Please select a user"} 
              />
          }
        />
          {/* <TextField
            sx={{ width: "100%" }}
            size="small"
            margin="dense"
            id={`${segment.key}-value`}
            label={segment.name}
            type="text"
            value={state.value}
            onChange={(e) => handleChange(e)}
          /> */}
        </Grid>
        <Grid item >
          <FormControlLabel 
            control={
              <Checkbox 
                id={`${segment.key}-forced`}
                color="error" 
                checked={state.forced} 
                disabled={!state.fill}
                onChange={(e) => handleChange(e)} 
              />
            } 
            label="Force"
          />
          <FormControlLabel 
            control={
              <Checkbox 
                id={`${segment.key}-trade`}
                color="success" 
                checked={state.trade} 
                disabled={!state.fill}
                onChange={(e) => handleChange(e)}
              />
            } 
            label="Trade"
          />
        </Grid>
      </div>
    </Grid>
  )
};

export default ShiftSegment;