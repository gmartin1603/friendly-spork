import React, { useEffect, useRef, useState } from "react";
import { useAuthState } from "../context/auth/AuthProvider";
import { button } from "../context/style/style";
import useWindowSize from "../helpers/windowSize";
import TopRow from "./TopRow";
import ArchCell from "./ArchCell";

function TableBody({ rota, cols, shift, rows, dayCount }) {
  const [{ profile, posts, week }, dispatch] = useAuthState();

  const [width, height] = useWindowSize([0, 0]);

  const [toggle, setToggle] = useState("");

  const activeMisc = useRef([]);

  useEffect(() => {
    // console.log(toggle);
    if (toggle !== "") {
      setTimeout(() => {
        setToggle("");
      }, 4000);
    }
  }, [toggle]);

  const openMisc = (e) => {
    e.preventDefault();
    if (width < 1200) return;
    if (profile.level > 1) return;
    let load = JSON.parse(e.target.dataset.load);
    if (load.group === "misc") return;
    let obj = {
      type: "week",
      dept: rota.dept,
      pos: load,
      shift: shift,
      cols: cols,
    };

    dispatch({
      type: "SET-OBJ",
      load: obj,
      name: "formObj",
    });

    return dispatch({ type: "OPEN-FORM", name: "showWeek" });
  };

  const getCellValue = (load, day) => {
    if (!load.data) return "";
    if (load.data[day][shift.id]) {
      return rota.fields[shift.id][load.group][load.data[day][shift.id][week]]
    }
  }

  const addRow = (e) => {
    e.preventDefault();
    let options = [];

    rows.forEach((row) => {
      if (row.group === "misc") {
        if (!activeMisc.current.includes(row.id)) {
          options.push(row);
        }
      }
    });

    let obj = {
      type: "week",
      dept: rota.dept,
      options: options,
      shift: shift,
      cols: cols,
    };

    dispatch({
      type: "SET-OBJ",
      load: obj,
      name: "formObj",
    });

    return dispatch({ type: "OPEN-FORM", name: "showWeek" });
  };

  const buildRows = () => {
    const mon = cols[0].label;
    const sun = cols[6].label;
    let arr = [];
    let misc = [];
    rows.length > 0 &&
      rows.map((row, i) => {
        if (row[shift.id]) {
          let show = true;
          if (!row.data) {
            show = false;
            for (const key in posts) {
              const post = posts[key];
              // console.log(post)
              if (post.shift === shift.id) {
                if (post.pos === row.id) {
                  if (post.date >= mon) {
                    if (post.date <= sun) {
                      show = true;
                    }
                  }
                }
              }
            }
          }

          // group border check
          const nxtRow = rows[i + 1];
          let border = false;
          if (nxtRow) {
            // console.log(row)
            if (row.group !== nxtRow.group) {
              if (nxtRow[shift.id]) {
                border = true;
              } else {
                border = false;
              }
            }
          } else {
            border = true;
          }

          if (show) {
            // color selection
            const prevRow = arr[arr.length - 1];
            let color = 0;
            if (prevRow) {
              if (row.group !== prevRow.load.group) {
                color = 0;
              } else {
                if (prevRow.color === shift.color[row.group][0]) {
                  color = 1;
                } else {
                  color = 0;
                }
              }
            }

            if (!activeMisc.current.includes(row.id)) {
              activeMisc.current.push(row.id);
            }

            arr.push({
              key: `${row.id}${shift.id}`,
              load: row,
              color: shift.color[row.group][color],
              screen: width,
              day: dayCount,
              border: border,
              load: row,
            });
          } else {
            if (activeMisc.current.includes(row.id)) {
              activeMisc.current.map((id) => {
                if (id !== row.id) {
                  misc.push(id);
                }
              });
              activeMisc.current = misc;
            }
          }
        }
      });
    // console.log(arr)
    return arr;
  };

  const styles = {
    main: ``,
    row: `bg-clearBlack`,
    cell: `text-center`,
  };

  return (
    <tbody className={styles.main}>
      <TopRow shift={shift} screen={width} cols={cols} />
      {buildRows().map((row, i) => {
        row.id = row.load.id
        let next = rows[i + 1];
        let bottomBorder = false;
        if (!next[shift.id]) {
          next = rows[i + 2];
        } else if (!next[shift.id]) {
          // find the next row with shift === true
          for (let j = i + 1; j < rows.length; j++) {
            if (rows[j][shift.id]) {
              next = rows[j];
              break;
            }
          }
        }
        if (i < rows.length - 1 && row.load.group !== next.group) {
          bottomBorder = true;
        }
        return (
          <tr
            key={row.key}
            style={{ borderBottom: bottomBorder ? "2px solid #000" : "none" }}
            className={styles.row}
          >
            <td
              className={`sticky left-0 bg-green text-right hover:text-white ${row.group !== "misc" && profile.level < 2 ? "cursor-pointer" : ""
                }`}
              data-load={JSON.stringify(row.load)}
              onClick={(e) => openMisc(e)}
              title={profile.level < 2 ? "Fill positon by week" : ""}
            >
              {row.load.label}
            </td>
            <ArchCell
              id={`${row.load.id} ${cols[0].label} ${shift.id}`}
              rowKey={1}
              rowIndex={i}
              value={getCellValue(row.load, 1)}
              post={posts[`${row.id} ${cols[0].label} ${shift.id}`]}
              row={row}
              col={cols[0].label}
              shift={shift}
              toggle={toggle}
              setToggle={setToggle}
            />
            <ArchCell
              id={`${row.load.id} ${cols[1].label} ${shift.id}`}
              rowKey={2}
              rowIndex={i}
              value={getCellValue(row.load, 2)}
              post={posts[`${row.id} ${cols[1].label} ${shift.id}`]}
              row={row}
              col={cols[1].label}
              shift={shift}
              toggle={toggle}
              setToggle={setToggle}
            />
            <ArchCell
              id={`${row.load.id} ${cols[2].label} ${shift.id}`}
              rowKey={3}
              rowIndex={i}
              value={getCellValue(row.load, 3)}
              post={posts[`${row.id} ${cols[2].label} ${shift.id}`]}
              row={row}
              col={cols[2].label}
              shift={shift}
              toggle={toggle}
              setToggle={setToggle}
            />
            <ArchCell
              id={`${row.load.id} ${cols[3].label} ${shift.id}`}
              rowKey={4}
              rowIndex={i}
              value={getCellValue(row.load, 4)}
              post={posts[`${row.id} ${cols[3].label} ${shift.id}`]}
              row={row}
              col={cols[3].label}
              shift={shift}
              toggle={toggle}
              setToggle={setToggle}
            />
            <ArchCell
              id={`${row.id} ${cols[4].label} ${shift.id}`}
              rowKey={5}
              rowIndex={i}
              value={getCellValue(row.load, 5)}
              post={posts[`${row.id} ${cols[4].label} ${shift.id}`]}
              row={row}
              col={cols[4].label}
              shift={shift}
              toggle={toggle}
              setToggle={setToggle}
            />
            <ArchCell
              id={`${row.id} ${cols[5].label} ${shift.id}`}
              rowKey={6}
              rowIndex={i}
              value={getCellValue(row.load, 6)}
              post={posts[`${row.id} ${cols[5].label} ${shift.id}`]}
              row={row}
              col={cols[5].label}
              shift={shift}
              toggle={toggle}
              setToggle={setToggle}
            />
            <ArchCell
              id={`${row.id} ${cols[6].label} ${shift.id}`}
              rowKey={7}
              rowIndex={i}
              value={getCellValue(row.load, 7)}
              post={posts[`${row.id} ${cols[6].label} ${shift.id}`]}
              row={row}
              col={cols[6].label}
              shift={shift}
              toggle={toggle}
              setToggle={setToggle}
            />
          </tr>
        );
      })}
      {width > 1200 && profile.level <= 1 && (
        <tr>
          <td className={`sticky left-0 flex justify-center `}>
            <button
              className={`${button.green} w-full px-10 my-[5px] border-1 text-xl hover:border-white`}
              onClick={(e) => {
                addRow(e);
              }}
              title="Post openings for misc jobs"
            >
              New Row
            </button>
          </td>
        </tr>
      )}
    </tbody>
  );
}

export default TableBody;
