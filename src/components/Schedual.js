import React, {useEffect, useState } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import {button} from '../context/style/style'
import useWindowSize from '../helpers/windowSize';
import TableBody from './TableBody';
import FormInput from './FormInput';
import usePostsListener from '../helpers/postsListener';
import useCollListener from '../helpers/collectionListener';
import WeekBar from './WeekBar';

//************** TODO **************** */
// row add/removal transition effect

function Schedual() {
  const [state, dispatch] = useAuthState()
  const [width, height] = useWindowSize([0,0]);

  const [filter, setFilter] = useState("shift")
  const [screen, setScreen] = useState(0)
  const [dayCount, setDayCount] = useState(0)

  const start = state.view[0].start //week 1
  const rotaLength = state.view[0].length //weeks

  usePostsListener(`${state.view[0].dept}-posts`)
  useCollListener(state.view[0].dept)

  const updateContext = (type, name, load) => {
    dispatch({
      type: type,
      name: name,
      load: load
    })
  }

  useEffect(() => {
    console.log({week:state.week, count: state.count,})
  },[state.week])

  const buildRows = () => {
    if (state.view[0]) {
      // console.log(state.view)
      switch (filter) {
        case "group":
          return (
            state.rota.groups.map(group => (
              <TableBody
              key={group}
              shift={shift}
              rows={state.view.slice(1)}
              // dayCount={dayCount}
              cols={state.cols}
              screen={width}
              rota={state.view[0]}
              />
            ))
          )
        default:
          return (
            state.shifts.map(shift => (
              <TableBody
              key={shift.label}
              shift={shift}
              rows={state.view.slice(1)}
              // dayCount={dayCount}
              cols={state.cols}
              screen={width}
              rota={state.view[0]}
              />
            ))
          )
        }
      }
  }

  const buildHead = () => {
    // console.log(dayCount)
    // if (screen <= 500) {
    //   return (
    //       <th
    //       scope='col'
    //       id={state.cols[dayCount].label}
    //       key={state.cols[dayCount].id}
    //       align={state.cols[dayCount].align}
    //       className={styles.hdStd}
    //       >
    //         {state.cols[dayCount].tag}
    //           <br />
    //         {new Date(state.cols[dayCount].label).toDateString().slice(4, 10)}
    //       </th>
    //   )
    // } else {
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
    // }
  }

  const styles = {
    container:`w-full h-[93vh] select-none overflow-auto flex-col rounded-md text-xl font-semibold bg-clearGreen`,
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
              {buildRows()}
          </table>
        </div>
        <WeekBar/>
      </div>
    );
}

export default Schedual;