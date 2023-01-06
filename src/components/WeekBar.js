import React, { Profiler, useState } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import { button } from '../context/style/style';
import { getPosts } from '../firebase/firestore';
import useCollListener from '../helpers/collectionListener';
import usePostsListener from '../helpers/postsListener';
import useWindowSize from '../helpers/windowSize';
import FormInput from './FormInput';
import ScheSettings from './forms/ScheSettings';

function WeekBar(props) {
    const [{profile, posts, count, rota, cols},dispatch] = useAuthState()
    const [width, height] = useWindowSize([0,0]);
    const [show, setShow] = useState(false)

    usePostsListener(`${rota.dept}-posts`)
    // useCollListener(rota.dept)

    const updateContext = (type, name, load) => {
      dispatch({
        type: type,
        name: name,
        load: load
      })
    }

    const handleChange = async (e) => {
      e.preventDefault();

      const day = (24*60*60*1000)
      const dateValue = document.getElementById("today").value
      let dateFlag = false
      let update = new Object(posts)

      if (dateValue) {
        dateFlag = true
      }

      switch (e.target.id) {
        case "today":
          if (e.target.value) {
            updateContext("SET-TODAY", "today",new Date(new Date(e.target.value).getTime() + (24*60*60*1000)))
          } else {
            updateContext("SET-TODAY", "today",new Date())
          }
          break
        case "next":
          updateContext("NEXT-WEEK")
          break
          case "prev":
            if (count === 0) {
              console.log("Call for arch posts")

              await getPosts(`${rota.dept}-posts`, cols[0].label - (day * 14), cols[6].label - (day * 14))
              .then(newPosts => {
                console.log(newPosts)
                newPosts.map(post => {
                  if (!update.hasOwnProperty(post.id)) {
                    update[post.id] = post
                  }
                })
                updateContext("PREV-WEEK", "name", update)
              })
            } else {
              updateContext("PREV-WEEK", "name", update)
            }
          break
        default:
          console.log("WeekBar switch Default")
      }
    }

    const handleClick = (e) => {
      e.preventDefault()
      if (show) {
        setShow(false)
      } else {
        setShow(!show)
      }
    }

    const styles = {
        foot:`bg-clearBlack
        border-2
        border-black
        flex
        items-start justify-around
        h-max
        sticky
        bottom-0
        left-0
        pb-[15px]
        w-screen`,
        drawer:`bg-clearBlack absolute w-max max-w-[80%] p-.01 h-max`,
        open:`transition translate-y-[-100%] translate-x-[0%] duration-[1000ms]`,
        closed:`transition translate-y-[-100%] translate-x-[-300%] duration-[1500ms]`,
        button:`${button.green} px-.01 py-[5px] mt-10 rounded-xl text-2xl font-semibold`,
        closeBtn:`${button.red} px-.01 py-[5px] mt-10 rounded-xl text-2xl font-semibold`,
    }
    return (
        <div className={styles.foot}>
            { profile.level === 0?
            <div className={`${styles.drawer} ${show? styles.open : styles.closed}`}>
              <ScheSettings
              toggle={setShow}
              />
            </div>
            : null}
            <button
            id="prev"
            className={styles.button}
            onClick={(e) => {handleChange(e)}}
            >
                {`<<`} {'Week'}
            </button>
            { profile.level === 0
            && width > 900?
            <button
            className={show? styles.closeBtn:styles.button}
            id="settings"
            onClick={(e) => handleClick(e)}
            >
              {show? "Close":"Settings"}
            </button>
            : null }
            <FormInput
            style={`flex w-[210px] px-.01 flex-wrap items-center justify-between text-white p-[5px] mb-[10px]`}
            label="Date Search"
            id="today"
            type="date"
            setValue={(e) => handleChange(e)}
            />
            <button
            id="next"
            className={styles.button}
            onClick={(e) => {handleChange(e)}}
            >
                {'Week'}  {`>>`}
            </button>
        </div>
    );
}

export default WeekBar;