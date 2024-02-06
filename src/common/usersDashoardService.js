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

  disableUser: (data) => {
    return new Promise((resolve, reject) => {
      let rand_int = Math.floor(Math.random() * 10);
      setTimeout(() => {
        if (rand_int % 2 === 0) reject({ data: { status: "error" } });
        resolve({ data: { status: "success" } });
      }, 1000);
    });
    return commonService.commonAPI("app/disableUser", data);
  },

  deleteUser: (data) => {
    return commonService.commonAPI("app/deleteUser", data);
  },
};

export default usersDashoardService;