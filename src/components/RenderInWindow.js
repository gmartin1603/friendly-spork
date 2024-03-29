import {useState, useEffect, useRef} from 'react';
import { createPortal } from "react-dom";
import { useAuthState } from '../context/auth/AuthProvider';
import useWindowSize from '../helpers/windowSize';

const RenderInWindow = (props) => {
  const [width, height] = useWindowSize([0,0])
    const [container, setContainer] = useState(null);
    const newWindow = useRef(null);

    const [{}, dispatch] = useAuthState()

    const updateContext = (type, name, load) => {
      dispatch({
          type: type,
          name: name,
          load: load
      })
    }

    useEffect(() => {
      // Create container element on client-side
      setContainer(document.createElement("div"));
    }, []);

    useEffect(() => {
      // When container is ready
      if (container) {
        // Create window
        newWindow.current = window.open(
          "",
          "_blank",
          `width=600,height=800,left=${width/2},top=200`
        );
        // Append container
        newWindow.current.document.body.appendChild(container);
        newWindow.current.document.title = "Callin Form"
        // Save reference to window for cleanup
        const curWindow = newWindow.current;
        // on close listener
        curWindow.addEventListener("beforeunload", (e) => {
          dispatch({type: "CLOSE-FORM", name: "showCallin"})
          updateContext("SET-ARR", "options", [])
          updateContext("SET-ARR", "filtered", [])
        }, false)

        // Return cleanup function
        return () => {
          dispatch({type: "CLOSE-FORM",  name: "showCallin"}),
          updateContext("SET-OBJ", "formObj", {})
          // updateContext("SET-ARR", "filtered", []),
          // updateContext("SET-ARR", "options", []),
          curWindow.close()}
      }
    }, [container]);

    return container && createPortal(props.children, container);
  };

export default RenderInWindow;