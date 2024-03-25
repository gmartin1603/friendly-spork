import { Autocomplete, Checkbox, FormControlLabel, Grid, Switch, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuthState } from "../../../context/auth/AuthProvider";

const ShiftSegment = ({ segment, onUpdate }) => {
  const [{ users, rota }, _] = useAuthState();
  const [userOptions, setUserOptions] = useState([]);
  const [state, setState] = useState({
    name: "",
    value: "",
    fill: false,
    forced: false,
    trade: false,
  });

  const toggleSegment = (checked) => {
    let container = document.getElementById(`${segment.key}-container`);
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
    if (id === "value") {
      setState((prev) => ({ ...prev, [id]: value }));
      return;
    }

    const checked = e.target.checked;
    let update = { ...state, [id]: checked };
    console.log("Update", update);
    if (id === "fill") {
      toggleSegment(checked);
    } else {
      if (id === "forced" && checked) {
        update.trade = false;
      } 
      if (id === "trade" && checked) {
        update.forced = false;
      }
    }
      
    setState(update);
  };

  useEffect(() => {
    setState(segment);
  }, []);

  useEffect(() => {
    let options = []
    users.map(user => {
      if (user.role === "ee" && user.dept.includes(rota.dept)) {
        options.push(user.dName);
      }
    });
    setUserOptions(options);
  }, [users]);

  useEffect(() => {
    if (state.name) {
      onUpdate(state);
    }

    // console.log("State", state);

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
      <div id={`${segment.key}-container`} className={`seg-info-container`}>
        <Grid item xs={6}>
        <Autocomplete
          id={`${segment.key}-value`} 
          disablePortal
          size="small"
          options={userOptions}
          sx={{ width: "100%" }}
          onChange={(e, value) => handleChange(e, value)}
          renderInput={
            (params) => 
              <TextField {...params} 
                value={state.value} 
                label={segment.name}
                error={state.fill && !state.value}
                helperText={state.fill && !state.value && "Please select a user"} 
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