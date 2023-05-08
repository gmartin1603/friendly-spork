import React, { useEffect, useRef, useState } from "react";
import useWindowSize from "../helpers/windowSize";
import TopRow from "./TopRow";
import ArchCell from "./ArchCell";
import { useAuthState } from "../context/auth/AuthProvider";
import { button } from "../context/style/style";

const ArchBody = ({ shift, rows, cols }) => {
  const [activeMisc, setActiveMisc] = useState([]);
  const [toggle, setToggle] = useState("");

  const [width, height] = useWindowSize([0, 0]);
  const [{ rota, posts, profile, view }, dispatch] = useAuthState();

  useEffect(() => {
    // console.log(toggle)
    if (toggle !== "") {
      setTimeout(() => {
        setToggle("");
      }, 3000);
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

  const addRow = (e) => {
    e.preventDefault();
    const options = view
      .slice(1)
      .filter((row) => row.group === "misc" && !activeMisc.includes(row.id));

    let obj = {
      type: "week",
      dept: rota.dept,
      options: options,
      shift: shift,
      cols: cols,
    };

    if (rows[rows.length - 1].color === shift.color.misc[0]) {
      obj.color = shift.color.misc[1];
    } else {
      obj.color = shift.color.misc[0];
    }

    dispatch({
      type: "SET-OBJ",
      load: obj,
      name: "formObj",
    });

    return dispatch({ type: "OPEN-FORM", name: "showWeek" });
  };

  const styles = {
    main: ``,
    row: `bg-clearBlack`,
    cell: `text-center`,
  };

  return (
    <tbody className={styles.main}>
      <TopRow shift={shift} screen={width} cols={cols} />
      {rows.map((row, i) => {
        let next = rows[i + 1];
        let bottomBorder = false;
        if (row.group === "misc") {
          if (!activeMisc.includes(row.id)) {
            setActiveMisc((prev) => [...prev, row.id]);
          }
        }
        if (i < rows.length - 1 && row.group !== next.group) {
          bottomBorder = true;
        }
        return (
          <tr
            key={`${row.id} ${shift.id}`}
            style={{ borderBottom: bottomBorder ? "2px solid #000" : "none" }}
            className={styles.row}
          >
            <td
              className={`sticky left-0 bg-green text-right ${
                row.group !== "misc" ? "cursor-pointer hover:text-white" : ""
              }`}
              data-load={JSON.stringify(row)}
              onClick={(e) => openMisc(e)}
            >
              {row.label}
            </td>
            <ArchCell
              id={`${row.id} ${cols[0].label} ${shift.id}`}
              rowKey={1}
              value={row[1]}
              post={posts[`${row.id} ${cols[0].label} ${shift.id}`]}
              row={row}
              col={cols[0].label}
              shift={shift}
              toggle={toggle}
              setToggle={setToggle}
            />
            <ArchCell
              id={`${row.id} ${cols[1].label} ${shift.id}`}
              rowKey={2}
              value={row[2]}
              post={posts[`${row.id} ${cols[1].label} ${shift.id}`]}
              row={row}
              col={cols[1].label}
              shift={shift}
              toggle={toggle}
              setToggle={setToggle}
            />
            <ArchCell
              id={`${row.id} ${cols[2].label} ${shift.id}`}
              rowKey={3}
              value={row[3]}
              post={posts[`${row.id} ${cols[2].label} ${shift.id}`]}
              row={row}
              col={cols[2].label}
              shift={shift}
              toggle={toggle}
              setToggle={setToggle}
            />
            <ArchCell
              id={`${row.id} ${cols[3].label} ${shift.id}`}
              rowKey={4}
              value={row[4]}
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
              value={row[5]}
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
              value={row[6]}
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
              value={row[7]}
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
          <td className={`flex justify-center `}>
            <button
              className={`${button.green} w-[60%] px-10 my-[5px] border-2 text-xl hover:border-white`}
              onClick={(e) => addRow(e)}
            >
              New Row
            </button>
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default ArchBody;
