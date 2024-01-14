import { updateProfile } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "../context/auth/AuthProvider";
import { button, input } from "../context/style/style";
import FormInput from "./FormInput";
import FormInputCont from "./inputs/FormInputCont";
import { toast } from "react-toastify";
import commonService from "../common/common";

function Profile(props) {
    let url;
    if (process.env.NODE_ENV === "production") {
        url = process.env.REACT_APP_BASEURL;
    } else {
        url = process.env.REACT_APP_BASEURL_STAGING;
    }

    const [{ profile, view }, dispatch] = useAuthState();

    const [newPhone, setNewPhone] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [editPhone, setEditPhone] = useState(false);

    const handleChange = (e) => {
        e.preventDefault();
        switch (e.target.name) {
            case "phone":
                // console.log(e.target.value);
                let formattedPhone = formatPhoneNumber(e.target.value);
                // console.log(formattedPhone);
                setNewPhone(formattedPhone);
                break;
            default:
                console.log("handleChange Default");
        }
    };

    const formatPhoneNumber = (str) => {
        // Format input as: (xxx) xxx-xxxx
        let cleaned = ("" + str).replace(/\D/g, "");
        let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return "(" + match[1] + ") " + match[2] + "-" + match[3];
        }
        return str;
    };

    const updateProfile = async (e) => {
        e.preventDefault();
        const load = {
            id: profile.id,
            profile: { phone: newPhone },
        };
        await toast.promise(
            commonService.commonAPI("app/updateUser", load).then((res) => {
                console.log(res);
                dispatch({
                    type: "SET-VALUE",
                    name: "profile",
                    load: { ...profile, phone: newPhone },
                }),
                    setNewPhone("");
                setEditPhone(false);
            }),
            {
                pending: "Updating Profile...",
                success: "Profile Updated!",
                error: "Error Updating Profile!",
            }
        );
    };

    useEffect(() => {
        let validated = false;
        if (newPhone.length === 14) {
            if (newPhone !== profile.phone) {
                validated = true;
            }
        }
        if (validated) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [newPhone]);

    const styles = {
        main: `h-[93vh] flex flex-wrap justify-around w-max text-green overflow-auto`,
        h1: `text-2xl font-bold text-center mb-[20px]`,
        qualCont: `bg-white text-center font-semibold text-xl mx-[20px] my-10 py-20 px-[40px] rounded-xl w-max h-min`,
        qual: `my-.02 p-.02 text-white shadow-black shadow-inner  rounded bg-green`,
        submit: `${button.green} w-full p-[5px] mt-[20px]`,
    };
    return (
        <div className={styles.main}>
            <div className={styles.qualCont}>
                <h1 className={styles.h1}>Qualified Jobs</h1>
                <ul className={styles.qualList}>
                    {view &&
                        view.map((job) => {
                            if (profile.quals.includes(job.id)) {
                                return (
                                    <li className={styles.qual} key={job.id}>
                                        {job.label}
                                    </li>
                                );
                            }
                        })}
                </ul>
            </div>
            <div className={styles.qualCont}>
                <h1 className={styles.h1}>Phone Number</h1>
                <FormInputCont styling={`my-10`} label="Current">
                    <input
                        type="tel"
                        className={input.text}
                        name="phone"
                        id="phone"
                        value={profile.phone}
                        disabled
                        onChange={(e) => handleChange(e)}
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        placeholder="(123)-456-7890"
                    />
                </FormInputCont>
                {editPhone ? (
                    <>
                        <FormInputCont styling={`my-10`} label="New Phone Number">
                            <input
                                type="tel"
                                className={input.text}
                                name="phone"
                                id="phone"
                                value={newPhone}
                                onChange={(e) => handleChange(e)}
                                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                placeholder="(123)-456-7890"
                            />
                        </FormInputCont>
                        <button
                            className={styles.submit}
                            disabled={disabled}
                            onClick={(e) => updateProfile(e)}
                        >
                            Save New Number
                        </button>
                    </>
                ) : (
                    <button className={styles.submit} onClick={() => setEditPhone(true)}>
                        Change Phone Number
                    </button>
                )}
            </div>
        </div>
    );
}

export default Profile;
