import commonService from "./common";

const jobsDashboardService = {
    getJobs: (data) => {
      console.log("jobsDashboardService.getJobs", data);
      let param = "fsApp/getJobs";
      return commonService.commonAPI(param, data);
    },

    addJob: (data) => {
      let param = "fsApp/addJob";
      return commonService.commonAPI(param, data);
    },

    editJob: (data) => {
      let param = "fsApp/editJob";
      return commonService.commonAPI(param, data);
    },
    
    deleteJob: (data) => {
      let param = "fsApp/deleteJob";
      return commonService.commonAPI(param, data);
    },
};

export default jobsDashboardService; 