import commonService from "./common";

const scheduleDashboardService = {
    editRota(data) {
      let param = "fsApp/editRota";
      // console.log("scheduleDashboardService.editRota", data);
      return commonService.commonAPI(param, data);
    },

    updateArchive(data) {
      let param = "fsApp/updateArchive";
      // console.log("scheduleDashboardService.updateArchive", data);
      return commonService.commonAPI(param, data);
    },
};

export default scheduleDashboardService;