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
  
  // const [cols, setCols] = useState([])
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
  
  // useEffect(() => {
  //   if (state.today.getDay() === 0 ) {
  //     setDayCount(6)
  //   } else {
  //     setDayCount(state.today.getDay() - 1)
  //   } 

  // },[screen])

  useEffect(() => {
    console.log({week:state.week, count: state.count,})
  },[state.week])
  
  // useEffect(() => {
  //   setScreen(width) 

  // },[width]) 

  const shifts = [
    {
      id: 'first',
      index: 0,
      label:'1st',
      color: {
        util: ['rgb(144, 233, 233)','rgb(144, 233, 233, 0.8)'],
        po: ['rgb(253, 254, 254)','rgb(253, 254, 254, 0.8)'],
        misc: ['rgb(9, 189, 149 )','rgb(9, 189, 149, 0.8)'],
      },
      segs: {full:'7 AM - 3 PM', one:'7 AM - 11 AM', two:'11 AM - 3 PM'},
    },
    {
      id: '11-7',
      index: 4,
      label:'11am to 7pm',
      color: {
        util: ['rgb(144, 233, 233)','rgb(144, 233, 233, 0.8)'],
        po: ['rgb(253, 254, 254)','rgb(253, 254, 254, 0.8)'],
        misc: ['rgb(9, 189, 149 )','rgb(9, 189, 149, 0.8)'],
      },
      segs: {full:'11 AM - 7 PM',one:'11 AM - 3 PM', two:'3 PM - 7 PM'},
    },
    {
      id: 'second',
      index: 1,
      label:'2nd',
      color: {
        util: ['rgb(144, 233, 233)','rgb(144, 233, 233, 0.8)'],
        po: ['rgb(253, 254, 254)','rgb(253, 254, 254, 0.8)'],
        misc: ['rgb(9, 189, 149 )','rgb(9, 189, 149, 0.8)'],
      },
      segs: {full:'3 PM - 11 PM',one:'3 PM - 7 PM', two:'7 PM - 11 PM'},
    },
    {
      id: 'third',
      index: 2,
      label:'3rd',
      color: {
        util: ['rgb(144, 233, 233)','rgb(144, 233, 233, 0.8)'],
        po: ['rgb(253, 254, 254)','rgb(253, 254, 254, 0.8)'],
        misc: ['rgb(9, 189, 149 )','rgb(9, 189, 149, 0.8)'],
      },
      segs: {full:'11 PM - 7 AM', one:'11 PM - 3 AM', two:'3 AM - 7 AM'},
    },
    {
      id: 'night',
      index: 3,
      label:'Night',
      color: {
        util: ['rgb(144, 233, 233)','rgb(144, 233, 233, 0.8)'],
        misc: ['rgb(9, 189, 149 )','rgb(9, 189, 149, 0.8)'],
      },
      segs: {full:'7 PM - 7 AM', one:'7 PM - 11 PM', two:'11 PM - 3 AM', three:'3 AM - 7 AM'},
    },
    
  ]

  const buildRows = () => {
    if (state.view[0]) {
      // console.log(rows)
      return (
        // shifts.length > 0 &&
        // shifts.map(shift => (
        state.view[0].shifts.length > 0 &&
        state.view[0].shifts.map(shift => (
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
    container:`w-full h-[93vh] select-none overflow-auto flex-col w-screen rounded-md text-xl font-semibold bg-clearGreen`,
    top:`w-full flex flex-wrap justify-around items-center`,
    wrapper:`w-full rounded-md`,
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
        
        {/* <FormInput
        style={`sticky left-0 flex w-[275px] px-.01 items-center justify-between text-white p-[5px] mb-[10px]`}
        label="Date Search"
        type="date"
        setValue={(e) => handleChange(e)}
        /> */}
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
        {/* <div className={styles.foot}>        
          <button className={styles.button} onClick={(e) => {e.preventDefault(); prevWeek()}}>{`<<`} {screen <= 500? 'Day' : 'Week'} </button> 
          <button className={styles.button} onClick={(e) => {e.preventDefault(); screen <= 500? setScreen(550) : setScreen(499)}}> {screen <= 500? 'Week View':'Day View'} </button> 
          <button className={styles.button} onClick={(e) => {e.preventDefault();  nextWeek()}}> {screen <= 500? 'Day' : 'Week'}  {`>>`} </button>  
        </div> */}
      </div>
    );
}

export default Schedual;

