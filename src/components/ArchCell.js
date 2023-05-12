import { useEffect, useState } from "react";
import { useAuthState } from "../context/auth/AuthProvider";
import { FaEdit } from "react-icons/fa";

const ArchCell = ({
  id,
  rowKey,
  rowIndex,
  value,
  post,
  row,
  col,
  shift,
  edit,
  editUpdate,
  setEditUpdate,
  toggle,
  setToggle,
}) => {
  const [{ rota, profile }, dispatch] = useAuthState();
  const [valueUpdate, setValueUpdate] = useState(false);

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

  useEffect(() => {
    // console.log("EditUpdate Running");
    if (edit) {
      if (editUpdate.rows[rowIndex][rowKey] === value) {
        setValueUpdate(false);
      } else {
        setValueUpdate(true);
      }
    }
  }, [editUpdate]);

  const handleChange = (e) => {
    // console.log(editUpdate.rows[rowIndex][rowKey]);
    let obj = structuredClone(editUpdate);
    obj.rows[rowIndex][rowKey] = e.target.value;
    setEditUpdate(obj);
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
    color: post
      ? post.color
        ? { backgroundColor: post.color }
        : { backgroundColor: row.color }
      : { backgroundColor: row.color },
    miscColor: post
      ? { backgroundColor: row.color }
      : { backgroundColor: "black" },
    input: {
      backgroundColor: valueUpdate ? "rgb(124, 252, 0, 0.8)" : "transparent",
      textAlign: "center",
      width: "65%",
    },
  };

  return (
    <td
      className={`${styles.cell} ${toggle === id ? styles.click : ""}`}
      style={row.group === "misc" ? styles.miscColor : styles.color}
    >
      <div className="flex justify-center">
        {edit && row.group !== "misc" ? (
          <>
            <input
              type="text"
              value={editUpdate.rows[rowIndex][rowKey]}
              onChange={(e) => handleChange(e)}
              style={styles.input}
            />
            <FaEdit cursor="none" />
          </>
        ) : (
          <div className="min-w-full min-h-full" onClick={() => handleClick()}>
            {post ? styleValue() : value}
          </div>
        )}
      </div>
    </td>
  );
};

export default ArchCell;
