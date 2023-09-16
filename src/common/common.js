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
        mode: "cors",
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          console.warn(err);
          reject(err);
        });
    });
  },
};

export default commonService;
