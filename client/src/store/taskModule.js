import axios from "axios";
let _api = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 3000,
  withCredentials: true
});

export default {
  actions: {
    addTask({ commit, dispatch }, taskData) {
      _api
        .post("tasks", taskData)
        .then(serverTask => {
          commit("addTask", serverTask.data);
        })
        .catch(err => {
          console.error(err);
        });
    },
    async getTasksByListId({ commit, dispatch }, id) {
      let data = await _api.get("lists/" + id + "/tasks");
      commit("setTasks", { data: data.data, listId: id });
    }
  }
};
