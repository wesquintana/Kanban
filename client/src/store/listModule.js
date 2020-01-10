import axios from "axios";
let _api = axios.create({
  baseURL: "http://nabnak.herokuapp.com/api",
  timeout: 3000,
  withCredentials: true
});

export default {
  actions: {
    addList({ commit, dispatch }, listData) {
      _api
        .post("lists", listData)
        .then(serverList => {
          commit("addList", serverList.data);
        })
        .catch(err => {
          console.error(err);
        });
    },
    async getListsByBoardId({ commit, dispatch }, id) {
      let data = await _api.get("boards/" + id + "/lists");
      commit("setResource", { resource: "lists", data: data.data });
    }
  }
};
