import axios from "axios";
let _api = axios.create({
  baseURL: "http://nabnak.herokuapp.com/api",
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
    },
    async moveTask({ commit, dispatch }, payload) {
      let data = await _api.put("tasks/" + payload.id, {
        listId: payload.listId
      });
      commit("addTask", data.data);
      commit("removeResource", payload);
    }
  }
};
