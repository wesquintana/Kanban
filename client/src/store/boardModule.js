import axios from "axios";
let _api = axios.create({
  baseURL: "http://localhost:3000/api/boards",
  timeout: 3000,
  withCredentials: true
});

export default {
  actions: {
    getBoards({ commit, dispatch }) {
      _api.get("").then(res => {
        commit("setResource", { resource: "boards", data: res.data });
      });
    },
    addBoard({ commit, dispatch }, boardData) {
      _api
        .post("", boardData)
        .then(serverBoard => {
          commit("addBoard", serverBoard.data);
        })
        .catch(err => {
          console.error(err);
        });
    },
    async getBoardById({ commit, dispatch }, id) {
      let data = await _api.get(id);
      commit("setResource", { resource: "activeBoard", data: data.data });
    },
    removeActiveBoard({ commit, dispatch }) {
      commit("removeActiveBoard");
    }
  }
};
