import React, {useEffect } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import {button} from '../context/style/style'
import TableBody from './TableBody';

//************** TODO **************** */
// row add/removal transition effect
// add filter funtionality to display by shift or by group
// automaticaly updating schedule archive:
//   - every Monday at 12:01am add the schedual for 2 weeks prior to archive
//   - archive includes posting data (bids, notes, etc.)

function Schedual() {
  const [state, dispatch] = useAuthState()

  useEffect(() => {
    console.log(state.view[0].dept.toUpperCase(), {week:state.week, count: state.count,})

    // console.log(state)
  },[state.week, state.rota.dept])

  const buildTables = () => {
    let arr = []
      state.shifts.map(shift => {
        arr.push({
          shift: shift,
        })
    })
    return arr
  }

  const buildHead = () => {

    return (
      state.cols.map(col => {
          return (
            <th
              key={col.id}
              align={col.align}
              className={`${state.today.getMonth()} ${state.today.getDate()}` === `${new Date(col.label + (7*60*60*1000)).getMonth()} ${new Date(col.label + (7*60*60*1000)).getDate()}` ? styles.hdToday : styles.hdStd}
            >
              {col.tag}
              <br />
              {new Date(col.label).toDateString().slice(4, 10)}
            </th>
          )
      })
    )
  }

  const styles = {
    container:`w-full h-[90vh] pb-[110px] select-none overflow-auto overscroll-none flex-col rounded-md text-xl font-semibold bg-clearGreen`,
    top:`w-full flex flex-wrap justify-around items-center`,
    wrapper:`w-full h-[93vh] rounded-md`,
    table:`w-full rounded-md`,
    head:`sticky top-0 left-0 bg-black z-10`,
    hdPos:'bg-green p-.01 text-white min-w-[130px]',
    hdStd:'bg-green p-.01 text-white min-w-[170px]',
    hdToday:'bg-todayGreen text-white p-.01 min-w-[170px]',
    button:`${button.green} px-.01 py-[2px] rounded-xl text-2xl font-semibold`,
  }

    return (
      <div className={styles.container}>
        <div className={styles.top}>
        {
          state.profile.dept.length > 2 &&
          <h1
          className={`text-white w-.5 text-center text-4xl font-bold`}
          >
            {state.view[0].dept.toUpperCase()}
          </h1>
        }
        </div>
        <div classame={styles.wrapper}>
          <table id='myTable' className={styles.table}>
              <thead className={styles.head}>
                  <tr>
                    <th
                      scope='col'
                      key='position'
                      align='center'
                      className={`${styles.hdPos} sticky left-0 `}
                    >
                        Position
                    </th>
                    {state.cols.length > 1 && buildHead()}
                  </tr>
              </thead>
              {buildTables().map(table => (
                <TableBody
                key={table.shift.label}
                shift={table.shift}
                rows={state.view.slice(1)}
                week={state.week}
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