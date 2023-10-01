import React, { useEffect, useState } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import { button } from '../context/style/style'
import { getArchive } from '../firebase/firestore';
import ArchBody from './ArchBody';
import TableBody from './TableBody';
import useArchiveListener from '../helpers/archiveListener';

//************** TODO **************** */
// row add/removal transition effect
// add filter funtionality to display by shift or by group
// automaticaly updating schedule archive:
//   - every Monday at 12:01am add the schedual for 2 weeks prior to archive
//   - archive includes posting data (bids, notes, etc.)

function Schedual() {
  const [state, dispatch] = useAuthState()
  const archive = state.archive;
  useArchiveListener(
    state.rota.dept,
    `${new Date(state.cols[0].label).toDateString()}`
  );

  useEffect(() => {
    console.log(state.view[0].dept.toUpperCase(), {
      week: state.week,
      count: state.count,
    });
  }, [state.week, state.rota.dept, state.count]);

  const sort = (arr) => {
    arr.sort((a, b) => {
      if (a.shift.order < b.shift.order) {
        return -1;
      }
      if (a.shift.order > b.shift.order) {
        return 1;
      }
      // if (a === b)
      return 0;
    });
  };

  const buildTables = () => {
    let arr = [];
    if (archive) {
      for (const key in archive) {
        console.log(archive[key].rows)
        arr.push({
          shift: archive[key].shift,
          rows: archive[key].rows,
        });
      }
      sort(arr);
    } else {
      state.shifts.map((shift) => {
        arr.push({
          shift: shift,
        });
      });
    }
    // console.log(arr)
    return arr;
  };

  const buildHead = () => {
    return state.cols.map((col) => {
      return (
        <th
          key={col.id}
          align={col.align}
          className={
            `${state.today.getMonth()} ${state.today.getDate()}` ===
              `${new Date(col.label + 7 * 60 * 60 * 1000).getMonth()} ${new Date(
                col.label + 7 * 60 * 60 * 1000
              ).getDate()}`
              ? styles.hdToday
              : styles.hdStd
          }
        >
          {col.tag}
          <br />
          {new Date(col.label).toDateString().slice(4, 10)}
        </th>
      );
    });
  };

  const styles = {
    container: `w-full h-[90vh] pb-[110px] select-none overflow-auto overscroll-none flex-col rounded-md text-xl font-semibold bg-clearGreen`,
    top: `w-full flex flex-wrap justify-around items-center`,
    wrapper: `w-full h-[93vh] rounded-md`,
    table: `w-full rounded-md`,
    head: `sticky top-0 left-0 bg-black z-10`,
    hdPos: "bg-green p-.01 text-white min-w-[130px]",
    hdStd: "bg-green p-.01 text-white min-w-[170px]",
    hdToday: "bg-todayGreen text-white p-.01 min-w-[170px]",
    button: `${button.green} w-full py-.01 rounded-xl text-xl font-semibold`,
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        {state.profile.dept.length > 2 && (
          <h1 className={`text-white w-.5 text-center text-4xl font-bold`}>
            {state.view[0].dept.toUpperCase()}
          </h1>
        )}
      </div>
      <div classame={styles.wrapper}>
        <table id="myTable" className={styles.table}>
          <thead className={styles.head}>
            <tr>
              <th
                scope="col"
                key="position"
                align="center"
                className={`${styles.hdPos} sticky left-0 `}
              >
                Position
              </th>
              {state.cols.length > 1 && buildHead()}
            </tr>
          </thead>
          {archive
            ? buildTables().map((table) => (
              <ArchBody
                key={table.shift.id}
                shift={table.shift}
                rows={table.rows}
                cols={state.cols}
              />
            ))
            : buildTables().map((table) => (
              <TableBody
                key={table.shift.id}
                shift={table.shift}
                rows={state.view.slice(1)}
                cols={state.cols}
                rota={state.view[0]}
              />
            ))}
        </table>
      </div>
    </div>
  );
}

export default Schedual;