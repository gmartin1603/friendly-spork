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

  getJobs: (data) => {
    return new Promise((resolve, reject) => {
      fetch(`${baseUrl}fsApp/getJobs`, {
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

  addJob: (data) => {
    return new Promise((resolve, reject) => {
      fetch(`${baseUrl}fsApp/addJob`, {
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

  editJob: (data) => {
    return new Promise((resolve, reject) => {
      fetch(`${baseUrl}fsApp/editJob`, {
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

  deleteJob: (data) => {
    return new Promise((resolve, reject) => {
      fetch(`${baseUrl}fsApp/deleteJob`, {
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
