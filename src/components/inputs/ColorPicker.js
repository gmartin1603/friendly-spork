import { useState } from "react";
import { GithubPicker } from "react-color";
import colors from "../../assets/colors";
import { input } from "../../context/style/style";

function ColorPicker({group, value, setValue}) {
    const [show, setShow] = useState(false)
    const [color, setColor] = useState(value)

    const handleColorChange = (color, e) => {
        // console.log(color.rgb)
        let rgb = color.rgb
        const newValue = `rgb(${rgb.r},${rgb.g},${rgb.b})`
        setValue({target:{name: "color", value: newValue}})
        setColor(newValue)
        setShow(false)
    }

    const styles = {
        main:`w-full select-none relative`,
        h2:`font-bold text-green`,
        button: `w-full cursor-pointer border-2 border-clearBlack shadow-inner shadow-[rgb(253,254,254,0.7)]`,
    }
    return (
        <div className={styles.main}>
            <div
            key={group}
            className={input.text}
            >
                <div
                key={group}
                className={styles.button}
                style={{backgroundColor:color}}
                onClick={() => setShow(!show)}
                >
                   - Select -
                </div>
            </div>
            { show?
                <div className={`absolute bottom-[-260%]`}>
                    <GithubPicker
                    width="250px"
                    colors={colors}
                    onChangeComplete={(color,e) => handleColorChange(color,e)}
                    />
                </div>
                : null
            }
        </div>
    )
}

export default ColorPicker