import axios from "axios";
class AuthService {
  constructor() {}
  getAxios() {
    return axios;
  }

  loginAuth(credentials) {
    if (credentials.username === "hruday@gmail.com" && credentials.password === "hruday123") {
      let userinfo = credentials;
      let data = { code: "DONE", message: "successfully", accountType: "admin", ...userinfo };
      return new Promise(function (resolve, reject) {
        return resolve({
          status: 200,
          data,
        });
      });
    } else {
      let data = { code: "FAIL", message: "Email or Password is not valid.", accountType: "admin" };
      return new Promise(function (resolve, reject) {
        return reject({
          status: 400,
          data,
        });
      });
    }
  }
}

export default new AuthService();
