import commonService from "./common";

const scheduleDashboardService = {
    editRota(data) {
      let param = "fsApp/editRota";
      // console.log("scheduleDashboardService.editRota", data);
      return commonService.commonAPI(param, data);
    }
};

export default scheduleDashboardService;