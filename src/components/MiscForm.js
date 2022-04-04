import React, { useState } from 'react';
import { checkBox } from '../context/style/style';

//************ TODO ************** */
// bottom down transition for segment inputs on check
// place holder segment hours depnding on shift selected
// 

function MiscForm({cols, jobs}) {
    const [first, setFirst] = useState(false)
    const [second, setSecond] = useState(false)
    const [third, setThird] = useState(false)
    const [night, setNight] = useState(false)
    const [mon, setMon] = useState(false)
    const [tue, setTue] = useState(false)
    const [wed, setWed] = useState(false)
    const [thu, setThu] = useState(false)
    const [fri, setFri] = useState(false)
    const [sat, setSat] = useState(false)
    const [sun, setSun] = useState(false)

    const shifts = {
        1: {label:'1st Shift', segs: ['7 AM - 3 PM', '7 AM - 11 AM', '11 AM - 3 PM']},
        2: {label:'2nd Shift', segs: ['3 PM - 11 PM','3 PM - 7 PM', '7 PM - 11 PM']},
        3: {label:'3rd Shift', segs: ['11 PM - 7 AM', '11 PM - 3 AM', '3 AM - 7 AM']},
        4: {label:'Night Shift', segs: ['7 PM - 7 AM', '7 PM - 11 PM', '11 PM - 3 AM', '3 AM - 7 AM',]},
    }

    return (
        <div className={`bg-purple w-max border justify-center flex-column  p-.01`}>
            <div className={`flex  w-1k `}>
                <select className={` w-.5 `} name="misc jobs" >
                    <option value="">Select Position</option>
                    {
                        jobs.map(job => (
                            <option key={job.id} value={job.id}>{job.label}</option>
                        ))
                    }
                </select>
                <div className={`w-.5 flex justify-around text-center font-bold`}>
                    <label htmlFor="first">
                        <h6>
                        1st Shift
                        </h6>
                        <input className={checkBox.standard} type="checkbox" name="first" />
                    </label>
                    <label htmlFor="second">
                        <h6>
                        2nd Shift
                        </h6>
                        <input type="checkbox" name="second" />
                    </label>
                    <label htmlFor="third">
                        <h6>
                        3rd Shift
                        </h6>
                        <input type="checkbox" name="third" />
                    </label>
                    <label htmlFor="third">
                        <h6>
                        Night Shift
                        </h6>
                        <input type="checkbox" name="third" />
                    </label>
                </div>
            </div>
            <div className={` w-1k`}>
                <div className={`flex justify-between text-center font-bold `}>
                    <label htmlFor="" className={`border w-max h-max p-.02`}>
                        <h6>{new Date(cols[0]?.label).toDateString().slice(0,3)} <br /> {new Date(cols[0]?.label).toDateString().slice(3,10)}</h6>
                        <input type="checkbox" value={mon} onChange={() => setMon(!mon)} name={cols[0]?.label} id="" />
                        {
                        mon &&
                        <label htmlFor="">
                            <h6>Segment</h6>
                            <input className={`w-80`} type="text" name="" id="" />
                            <h6>Segment</h6>
                            <input className={`w-80`} type="text" name="" id="" />
                        </label>
                        } 
                    </label>
                    <label htmlFor="" className={`border w-max p-.02`}>
                        <h6>{new Date(cols[1]?.label).toDateString().slice(0,3)} <br /> {new Date(cols[1]?.label).toDateString().slice(3,10)}</h6>
                        <input type="checkbox" value={tue} onChange={() => setTue(!tue)} name={cols[1]?.label} id="" />
                        {
                        tue &&
                        <label htmlFor="">
                            <h6>Segment</h6>
                            <input className={`w-80`} type="text" name="" id="" />
                            <h6>Segment</h6>
                            <input className={`w-80`} type="text" name="" id="" />
                        </label>
                        }
                    </label>
                    <label htmlFor="" className={`border w-max p-.02`}>
                        <h6>{new Date(cols[2]?.label).toDateString().slice(0,3)} <br /> {new Date(cols[2]?.label).toDateString().slice(3,10)}</h6>
                        <input type="checkbox" value={wed} onChange={() => setWed(!wed)} name={cols[2]?.label} id="" />
                        {
                        wed &&
                        <label htmlFor="">
                            <h6>Segment</h6>
                            <input className={`w-80`} type="text" name="" id="" />
                            <h6>Segment</h6>
                            <input className={`w-80`} type="text" name="" id="" />
                        </label>
                        }
                    </label>
                    <label htmlFor="" className={`border w-max p-.02`}>
                        <h6>{new Date(cols[3]?.label).toDateString().slice(0,3)} <br /> {new Date(cols[3]?.label).toDateString().slice(3,10)}</h6>
                        <input type="checkbox" value={thu} onChange={() => setThu(!thu)} name={cols[3]?.label} id="" />
                        {
                        thu &&
                        <label htmlFor="">
                            <h6>Segment</h6>
                            <input className={`w-80`} type="text" name="" id="" />
                            <h6>Segment</h6>
                            <input className={`w-80`} type="text" name="" id="" />
                        </label>
                        } 
                    </label>
                    <label htmlFor="" className={`border w-max p-.02`}>
                        <h6>{new Date(cols[4]?.label).toDateString().slice(0,3)} <br /> {new Date(cols[4]?.label).toDateString().slice(3,10)}</h6>
                        <input type="checkbox" value={fri} onChange={() => setFri(!fri)} name={cols[4]?.label} id="" />
                        {
                        fri &&
                        <label htmlFor="">
                            <h6>Segment</h6>
                            <input className={`w-80`} type="text" name="" id="" />
                            <h6>Segment</h6>
                            <input className={`w-80`} type="text" name="" id="" />
                        </label>
                        }
                    </label>
                    <label htmlFor="" className={`border w-max p-.02`}>
                        <h6>{new Date(cols[5]?.label).toDateString().slice(0,3)} <br /> {new Date(cols[5]?.label).toDateString().slice(3,10)}</h6>
                        <input type="checkbox" value={sat} onChange={() => setSat(!sat)} name={cols[5]?.label} id="" />
                        {
                        sat &&
                        <label htmlFor="">
                            <h6>Segment</h6>
                            <input className={`w-80`} type="text" name="" id="" />
                            <h6>Segment</h6>
                            <input className={`w-80`} type="text" name="" id="" />
                        </label>
                        }
                    </label>
                    <label htmlFor="" className={`border w-max p-.02`}>
                        <h6>{new Date(cols[6]?.label).toDateString().slice(0,3)} <br /> {new Date(cols[6]?.label).toDateString().slice(3,10)}</h6>
                        <input type="checkbox" value={sun} onChange={() => setSun(!sun)} name={cols[6]?.label} id="" />
                        {
                        sun &&
                        <label htmlFor="">
                            <h6>Segment</h6>
                            <input className={`w-80`} type="text" name="" id="" />
                            <h6>Segment</h6>
                            <input className={`w-80`} type="text" name="" id="" />
                        </label>
                        }
                    </label>
                </div>
                
            </div>
        </div>
    );
}

export default MiscForm;