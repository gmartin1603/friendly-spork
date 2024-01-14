import commonService from "./common";

const usersDashoardService = {
  getUsers: (data) => {
    return commonService.commonAPI("app/getUsers", data);
  },

  addUser: (data) => {
    return commonService.commonAPI("app/newUser", data);
  },

  editUser: (data) => {
    return commonService.commonAPI("app/updateUser", data);
  },

  deleteUser: (data) => {
    return commonService.commonAPI("app/deleteUser", data);
  },
};

export default usersDashoardService;