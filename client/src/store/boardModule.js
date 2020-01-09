import axios from "axios";
import Router from "../router";
import router from "../router";
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
    async addBoard({ commit, dispatch }, boardData) {
      try {
        let data = await _api.post("", boardData);
        commit("addBoard", data.data);
        Router.push({
          name: "board",
          params: { boardId: data.data._id }
        });
      } catch (error) {
        console.error(error);
      }
    },
    async getBoardById({ commit, dispatch }, id) {
      try {
        let data = await _api.get(id);
        commit("setResource", { resource: "activeBoard", data: data.data });
      } catch (error) {
        Router.push({
          name: "boards"
        });
      }
    },
    removeActiveBoard({ commit, dispatch }) {
      commit("removeActiveBoard");
    },
    clearChildren({ commit, dispatch }) {
      commit("clearChildren");
    }
  }
};
