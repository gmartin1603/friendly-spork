import TextField from "@mui/material/TextField";
import {
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Grid,
	FormControlLabel,
	Checkbox,
	Autocomplete,
  FormHelperText,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import ShiftSegment from "./call-in-modal/ShiftSegment";
import { useEffect, useState } from "react";
import { useAuthState } from "../../context/auth/AuthProvider";
import moment from "moment";
import { Upload } from "@mui/icons-material";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
// import colors from "../../assets/colors";
import commonService from "../../common/common";

const CallInModal = ({ closeModal }) => {
	const reasonOptions = [
		"Call In",
		"Leave Early",
		"Vacation",
		"Extra Help",
		"Sick",
		"Personal",
		"Family",
		"Bereavement",
		"No Show",
		"Leave",
	];
	const initialFormData = {
		name: "",
		reason: reasonOptions[0],
		date: 0,
		shift: "",
		job: "",
		creator: "",
		seg: {},
		color: "",
	};

	const [{ formObj, users, cols, app_colors, profile }, dispatch] =
		useAuthState();

  	const [filteredUsers, setFilteredUsers] = useState([]);
	const [formData, setFormData] = useState(initialFormData);
	const [submitDisabled, setSubmitDisabled] = useState(true);
	const [disabled, setDisabled] = useState({
		name: false,
		reason: false,
		color: false,
	});
	const [isLoading, setIsLoading] = useState(false);
	const [nameOptions, setNameOptions] = useState([]);

	const newPost = () => {
		let obj = {};
    // console.log(formObj.shift.segs);
		formObj.shift.segs.map((seg) => {
      obj[seg.key] = seg;
    });
    // console.log(obj);
		if (formObj.norm) {
      let positionLabel = formObj.pos.hasOwnProperty("load") ? formObj.pos.load.label : formObj.pos.label;
			setFormData((prev) => ({
				...prev,
				id: formObj.id,
				job: positionLabel,
				date: formObj.date,
				creator: "",
				down: formObj.down ? formObj.down : 0,
				norm: formObj.norm.length > 1 ? "" : formObj.norm[0],
				color: "",
				tag: {
					name: formObj.norm,
					reason: profile.level > 1 ? formObj.reason : "Vacation",
					color: "",
				},
				shift: formObj.shift,
				seg: obj,
			}));
		} else {
			setFormData((prev) => ({
				...prev,
				id: formObj.id,
				// job: formObj.pos.id,
        job: positionLabel,
				date: formObj.date,
				creator: profile.dName,
				shift: formObj.shift,
				color: formObj.color,
				seg: obj,
			}));
		}
    if (formObj.pos.group === "misc") {
      setDisabled({
        name: true,
        reason: true,
        color: true,
      });
    }
	};

	const modifyPost = () => {
    console.log(formObj);	
    let positionLabel = formObj.pos.hasOwnProperty("load") ? formObj.pos.load.label : formObj.pos.label;	
    let obj = {};
    // console.log(formObj.shift.segs);
		formObj.shift.segs.map((seg) => {
      obj[seg.key] = {...formObj.post.seg[seg.key], key: seg.key};
    });
    // if (formObj.post.slots < 2) {
      // for (const key in obj) {
      //   if (!obj[key].hasOwnProperty("key")) {
      //     console.log(key);
      //     obj[key].key = key;
      //     obj[key].label = formObj.shift.segs[key].label;
      //   }
      // }
    // }
    console.log(obj);
		if (formObj.norm[0] !== formObj.pos.label) {
			setFormData((prev) => ({
				...prev,
				id: formObj.id,
				job: positionLabel,
				date: formObj.date,
				down: formObj.down,
				creator: "",
				norm: formObj.norm.length > 1 ? "" : formObj.norm[0],
				color: formObj.post.color,
				tag: {
					name: formObj.post.tag.name,
					reason: formObj.post.tag.reason,
					color: formObj.post.color,
				},
				shift: formObj.shift,
				seg: obj,
			}));
		} else {
			setFormData((prev) => ({
				...prev,
				id: formObj.id,
				job: positionLabel,
				date: formObj.date,
				down: formObj.down,
				creator: "",
				shift: formObj.shift,
				seg: obj,
				slots: formObj.post.slots,
			}));
		}
	};

	const onMounted = async () => {
		console.log(
			"CallInModal mounted"
			// formObj.date,
			// formObj.shift.label,
			// formObj.pos.label,
			// formObj.norm,
			// formObj.pos.color,
			// formObj.shift.segs
		);

		// Get the current values for the cell
		let cell_values = [];
    setNameOptions(formObj.norm);
    setFilteredUsers(filterUsers());
    
		if (formObj.post) {
			// console.log("Post", formObj.post);
      setDisabled({
        name: true,
        reason: true,
        color: true,
      });
			modifyPost();
		} else {
			newPost();
		}
	};

	const onUnMounted = () => {
		// console.log("CallInModal unmounted");
		setFormData(initialFormData);
	};

  const filterUsers = () => {
    let filtered = [];

    users.map((user) => {
      if (user.role === "ee" && user.dept.includes(profile.dept[0])) {
        filtered.push(user.dName);
      }
    });

    return filtered;
  };

	const dateDisplay = (day) => {
		let date = new Date(formData.date);
		if (day === "today") {
			return moment().format("MMM DD, YYYY");
		}
		return moment(date).format("MMM DD, YYYY");
	};

	const updateFormData = (seg) => {
		// console.log("Updating Form Data", seg);
		// console.log("Form Data", formData.seg);
		let update = { ...formData.seg };
		// console.log(update);
		update[seg.key] = seg;
		// console.log(update);
		setFormData((prev) => ({ ...prev, seg: update }));
	};

	const validateForm = () => {
		const shouldLog = false;
		const log = (message, ...optionalParams) => {
			if (shouldLog) {
				console.log(message, ...optionalParams);
			}
		};

		log("Validating Form Data");

		let isValid = true;

		if (!formData.creator) {
			log("No creator");
			isValid = false;
		}

		if (!formData.seg) {
			log("No segments");
			isValid = false;
		} else {
			Object.entries(formData.seg).forEach(([key, segment]) => {
				if (!segment.name && segment.fill) {
					log("No value in filled segment", key);
					isValid = false;
				}
			});
		}

		log("Form validation result:", isValid);
		setSubmitDisabled(!isValid);
	};

	const handleChange = (e) => {
		// console.log("Handle Change", e.target.name, e.target.value);
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async () => {
		// console.log("Submit Form Data", formData);
		setIsLoading(true);
		setSubmitDisabled(true);
		let down_date = new Date().getTime();

		let post = {
			id: `${formObj.pos.id} ${formObj.date} ${formObj.shift.id}`,
			shift: formObj.shift.id,
			pos: formObj.pos.id,
			color: formData.color,
			date: formObj.date,
			down: down_date,
			filled: true,
			// created: new Date().getTime(),
			// creator: formData.creator,
			seg: formData.seg,
		};

		if (formObj.norm[0] !== formObj.pos.label) {
			post.norm = formData.norm;
      post['tag'] = {
				color: formData.color,
				reason: formData.reason,
				name: formData.norm,
			};
		}

		if (formObj.post) {
			post.id = formObj.post.id;
			post["modDate"] = new Date().getTime();
			post["lastMod"] = formData.creator;
		} else {
			post["created"] = new Date().getTime();
			post["creator"] = formData.creator;
		}

		// console.table(post.seg);

		// setIsLoading(false);
		// setSubmitDisabled(false);

		const data = {
			dept: formObj.dept,
			pos: formObj.pos.id,
			archive: `${new Date(cols[0].label).toDateString()}`,
			data: [post],
		};

		// console.log(post);
		// return;
		await toast.promise(
			commonService.commonAPI("fsApp/setPost", data).then((res) => {
				// console.log(res.message);
				if (res.message.toLowerCase().includes("error")) {
					setDisabled(false);
				} else {
					handleClose();
				}
			}),
			{
				pending: "Posting Update...",
				success: "Schedule Updated",
				error: "Error updating schedule",
			}
		);
	};

	useEffect(() => {
		// console.log("Form Data", formData);
		validateForm();
	}, [formData]);

	useEffect(() => {
		// getCurrentColor(formObj.pos.color);
		onMounted();
		// console.log("CallInModal mounted", formObj);

		return () => {
			onUnMounted();
		};
	}, [formObj, users]);

	const handleClose = (e, reason) => {
		// console.log("Handle Close Call In Modal");
		// console.log("Reason", reason);

		if (reason !== "backdropClick") {
			setFormData(initialFormData);
			closeModal(e, "cancel button");
		}
	};

	return (
		<>
			<DialogTitle>Schedule Update Form</DialogTitle>
			<DialogContent sx={{ width: "500px" }}>
				<DialogContentText>
					Please fill out the form below to update the schedule after you've
					completed the call in sheet.
				</DialogContentText>
				<Grid container spacing={1} sx={{ mt: 0 }}>
					<Grid item xs={6}>
						<TextField
							className="bold-input"
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
							className="bold-input"
							size="small"
							sx={{ width: "100%" }}
							margin="dense"
							id="shift"
							label="Shift"
							type="text"
							value={formObj.shift.label}
						/>
					</Grid>
				</Grid>
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<TextField
							className="bold-input"
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
							className="bold-input"
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
				<Grid container spacing={2} sx={{ mt: 0 }}>
					<Grid item xs={6}>
						<FormControl sx={{ width: "100%" }}>
							<InputLabel id="name-label">Name</InputLabel>
							<Select
								id="name"
								name="norm"
								label="Name"
								labelId="name-label"
								disabled={disabled.name}
								onChange={(e) => handleChange(e)}
                value={formData.norm || ""}
							>
								{nameOptions.map((option, index) => (
									<MenuItem key={index} value={option}>
										{option}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={6}>
						<FormControl sx={{ width: "100%" }}>
							<InputLabel id="reason-label">Reason</InputLabel>
							<Select
								label="Reason"
								labelId="reason-label"
								id="reason"
								name="reason"
								value={formData.reason}
								disabled={disabled.reason}
								onChange={(e) => handleChange(e)}
							>
								{reasonOptions.map((option, index) => (
									<MenuItem key={index} value={option}>
										{option}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={6}>
						<FormControl sx={{ width: "100%" }} error={!disabled.color && formData.color === ""}>
							<InputLabel id="color-label">Color</InputLabel>
							<Select
								id="color"
								name="color"
								labelId="color-label"
								label="Color"
								value={formData.color || ""}
								disabled={disabled.color}
								onChange={(e) => handleChange(e)}
                
							>
								{app_colors.map((color, index) => (
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
										>
											{color.name}
										</div>
									</MenuItem>
								))}
							</Select>
              <FormHelperText>{(!disabled.color && formData.color === "") && "* Required" }</FormHelperText>
						</FormControl>
					</Grid>
					<Grid item xs={6}>
						<Autocomplete
							id="creator"
							disablePortal
							options={filteredUsers}
							sx={{ width: "100%" }}
							value={formData.creator}
							isOptionEqualToValue={(option, value) =>
								option === value || value === ""
							}
							onChange={(e, value) =>
								setFormData((prev) => ({ ...prev, creator: value }))
							}
							renderInput={(params) => (
								<TextField
									{...params}
									error={!formData.creator}
									helperText={!formData.creator && "Please select your name"}
									label={formData.creator ? "Filled By" : "Select Your Name"}
								/>
							)}
						/>
					</Grid>
				</Grid>

				{formObj.shift.segs.map((seg, index) => {
					if (formObj.post) {
						if (formObj.post.seg[seg.key]) {
							return (
								<ShiftSegment
									key={index}
                  index={index}
									segment={formObj.post.seg[seg.key]}
									onUpdate={updateFormData}
								/>
							);
						}
					} else {
						return (
							<ShiftSegment
								key={index}
                index={index}
								segment={seg}
								onUpdate={updateFormData}
							/>
						);
					}
				})}
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
					{isLoading ? "Posting Update..." : "Update Schedule"}
				</Button>
			</DialogActions>
		</>
	);
};

export default CallInModal;
