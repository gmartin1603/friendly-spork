import { useAuthState } from "../context/auth/AuthProvider";

const ArchCell = ({
  id,
  rowKey,
  value,
  post,
  row,
  col,
  shift,
  toggle,
  setToggle,
}) => {
  const [{ rota, profile }, dispatch] = useAuthState();

  const handleClick = () => {
    console.log(id);
    if (toggle !== id) {
      setToggle(id);
      return;
    }
    let callIn = false;
    let reason = "Call in";
    if (profile.level > 2) {
      setToggle("");
      return;
    } else if (profile.level === 2) {
      const now = new Date();
      const date = new Date(col);
      // today
      if (now.getDay() === date.getDay()) {
        if (now.getHours() < shift.end) {
          // reason = "Leave early"
          callIn = true;
          console.log("Callin Same Shift");
        } else if (now.getHours() < shift.start) {
          callIn = true;
          console.log("Callin Later Today");
        } else {
          setToggle("");
          return;
        }
        // tomorrow
      } else if (now.getTime() < date.getTime()) {
        if (now.getDay !== date.getDay()) {
          if (now.getTime() + 24 * 60 * 60 * 1000 > date.getTime()) {
            callIn = true;
            console.log("Callin Tomorrow");
          } else {
            setToggle("");
            return;
          }
        } else {
          setToggle("");
          return;
        }
        // Out of authorized range
      } else {
        setToggle("");
        return;
      }
    }
    let obj = {};
    if (!post) {
      // console.log("new post")
      obj = {
        type: "single",
        id: `${row.id} ${col} ${shift.id}`,
        dept: rota.dept,
        pos: row,
        shift: shift,
        date: col,
        norm: value,
        color: row.color,
      };
      if (callIn) {
        obj["reason"] = reason;
        obj["down"] = col;
      }
      dispatch({
        type: "SET-OBJ",
        name: "formObj",
        load: obj,
      });
    } else {
      console.log(post);
      if (post.tag) {
        obj = {
          type: "single",
          modify: true,
          filled: post.filled,
          lastMod: post.lastMod,
          id: post.id,
          dept: rota.dept,
          pos: row,
          shift: shift,
          date: post.date,
          down: post.down,
          creator: post.creator,
          seg: post.seg,
          norm: post.norm,
          color: post.color,
          tag: post.tag,
        };
        dispatch({
          type: "SET-OBJ",
          name: "formObj",
          load: obj,
        });
      } else {
        obj = {
          type: "single",
          modify: true,
          down: post.down,
          filled: post.filled,
          lastMod: post.lastMod,
          id: post.id,
          dept: rota.dept,
          pos: row,
          shift: shift,
          date: post.date,
          seg: post.seg,
          slots: post.slots,
          color: post.color,
        };
        dispatch({
          type: "SET-OBJ",
          name: "formObj",
          load: obj,
        });
      }
    }
    setToggle("");
    return dispatch({ type: "OPEN-FORM", name: "show" });
  };

  const handleChange = (e) => {
    const value = e.target.value;
  };

  const formatValue = () => {
    // console.log(value)
    // const post = testPost
    let keys = Object.keys(post.seg);
    const segs = post.seg;
    let cells = [];
    let cell = { one: {}, two: {} };
    if (segs.three) {
      cell = { one: {}, two: {}, three: {} };
    }
    cells.push(cell);
    keys.map((key, index) => {
      if (segs[key].segs) {
        for (const i in segs[key].segs) {
          if (cells.length !== segs[key].segs.length) {
            cells.push(cell);
          }
          // console.log(segs[key].segs)
          cells[i] = { ...cells[i], [key]: segs[key].segs[i] };
        }
      } else {
        cells[0] = { ...cells[0], [key]: segs[key] };
      }
    });
    // console.log(cells)
    return cells;
  };

  const styleValue = () => {
    let arr = formatValue();
    // console.log(arr)
    return arr.map((cell, index) => {
      let keys = Object.keys(cell);
      return (
        <div className={`flex justify-center`} key={index}>
          {keys.map((key, i) => {
            // console.log(keys[i-1])
            // console.log(cell)
            let prev = {};
            if (i !== 0) {
              prev = cell[keys[i - 1]];
              // console.log(prev)
              if (cell[key].name === prev.name) {
                if (cell[key].forced === prev.forced) {
                  if (cell[key].trade === prev.trade) {
                    return;
                  }
                }
              }
            }
            let text = {};
            if (cell[key].trade) {
              text.color = "rgb(128, 255, 0)";
              text.weight = "semibold";
            } else if (cell[key].forced) {
              text.color = "red";
              text.weight = "bold";
            }
            return (
              <div key={`${key}${i}`} className={`flex  justify-center`}>
                {i > 0
                  ? // night shift check
                    keys.length > 2
                    ? // posts filled check
                      !post.filled
                      ? ""
                      : //post.filled = true
                        "/"
                    : //shift !== 3
                    prev.name !== cell[key].name
                    ? "/"
                    : prev.forced !== cell[key].forced
                    ? "/"
                    : prev.trade !== cell[key].trade
                    ? "/"
                    : ""
                  : // i === 0
                    ""}
                <p
                  className={`font-${text.weight} mx-[5px]`}
                  style={{ color: text.color }}
                >
                  {cell[key].name}
                </p>
              </div>
            );
          })}
        </div>
      );
    });
  };

  const styles = {
    cell: `text-center transition-transform cursor-pointer hover:text-[gray]`,
    click: `scale-110 -translate-y-1 border-2 border-black`,
    close:
      "bg-red p-2 rounded-2xl text-base font-bold text-white border-black min-w-max mx-2",
    color: post
      ? post.color
        ? { backgroundColor: post.color }
        : { backgroundColor: row.color }
      : { backgroundColor: row.color },
    miscColor: post
      ? { backgroundColor: row.color }
      : { backgroundColor: "black" },
    input: {
      appearance: "none",
      backgroundColor: "transparent",
      border: "none",
      textAlign: "center",
      width: "65%",
    },
  };

  return (
    <td
      className={`${styles.cell} ${toggle === id ? styles.click : ""}`}
      style={row.group === "misc" ? styles.miscColor : styles.color}
      onClick={() => handleClick()}
    >
      <div className="flex justify-between">
        {/* {toggle === id && profile.level < 1?
                    <button className={styles.close} onClick={(e) => {e.preventDefault(); setToggle('')}}>X</button>
                    : ''
                } */}
        <div className="flex-1">
          {post
            ? styleValue()
            : // toggle === id && profile.level < 1?
              // <input type="text" name={id} style={styles.input} ref={active}
              // onChange={(e) => handleChange(e)}
              // defaultValue= {value}
              // />
              // :
              value}
        </div>
        {/* {toggle === id && profile.level < 1?
                    <button onClick={(e) => {e.preventDefault(); active.current.focus();}}>ET</button>
                    : ''
                } */}
      </div>
    </td>
  );
};

export default ArchCell;
