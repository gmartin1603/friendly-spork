const handleSegChange = (init, obj, update) => {
    let seg = {one:{},two:{}}
    if (init) {
        // build seg object
        for (const key in obj) {
            if (key !== "full") {
                seg[key] = {name:'', forced: false, trade: false}
            }
        }
    } else {
        // update seg object
    }
    return seg
}

export default handleSegChange