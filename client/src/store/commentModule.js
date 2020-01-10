import axios from "axios";
let _api = axios.create({
  baseURL: "http://nabnak.herokuapp.com/api",
  timeout: 3000,
  withCredentials: true
});

export default {
  actions: {
    addComment({ commit, dispatch }, commentData) {
      _api
        .post("comments", commentData)
        .then(serverComment => {
          commit("addComment", serverComment.data);
        })
        .catch(err => {
          console.error(err);
        });
    },
    async getCommentsByTaskId({ commit, dispatch }, id) {
      let data = await _api.get("tasks/" + id + "/comments");
      commit("setComments", { data: data.data, taskId: id });
    }
  }
};
