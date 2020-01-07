import axios from "axios";
let _api = axios.create({
  baseURL: "http://localhost:3000/api/lists",
  timeout: 3000,
  withCredentials: true
});

export default {
  actions: {
    addList({ commit, dispatch }, listData) {
      _api
        .post("", listData)
        .then(serverList => {
          commit("addList", serverList.data);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
