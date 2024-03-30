let baseUrl = process.env.REACT_APP_BASEURL_STAGING;
if (process.env.NODE_ENV === "production") {
  baseUrl = process.env.REACT_APP_BASEURL;
}

const commonService = {
  commonAPI: (params, data) => {
    return new Promise((resolve, reject) => {
      //   console.log("commonAPI", `${baseUrl}${params}`);
      fetch(`${baseUrl}${params}`, {
        method: "POST",
        // mode: "cors",
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          console.warn(`commonAPI ERROR - Method: ${params}`);
          console.error(err);
          reject(err);
        });
    });
  },

  getColorInfo: (color) => {
    color = color.replace("#", "");
    return new Promise((resolve, reject) => {
      try {
        fetch(`https://api.color.pizza/v1/?values=${color}`)
          .then((res) => res.json())
          .then((data) => {
            resolve([data, null]);
          })
      } catch (err) {
        console.warn(`getColorInfo ERROR - Method: ${color}`);
        console.error(err);
        reject([null, err]);
      }
    });
  }
};

export default commonService;
