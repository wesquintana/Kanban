import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import router from "../router/index";
import AuthService from "../AuthService";
import boardModule from "./boardModule";
import listModule from "./listModule";
import taskModule from "./taskModule";
import commentModule from "./commentModule";
Vue.use(Vuex);

//Allows axios to work locally or live
let base = window.location.host.includes("localhost:8080")
  ? "//localhost:3000/"
  : "/";

let api = Axios.create({
  baseURL: base + "api/",
  timeout: 3000,
  withCredentials: true
});

export default new Vuex.Store({
  modules: {
    boardModule,
    listModule,
    taskModule,
    commentModule
  },
  state: {
    user: {},
    boards: [],
    activeBoard: {},
    lists: [],
    tasks: {},
    comments: {}
  },
  mutations: {
    setResource(state, payload) {
      state[payload.resource] = payload.data;
    },
    setUser(state, user) {
      state.user = user;
    },
    setTasks(state, payload) {
      Vue.set(state.tasks, payload.listId, payload.data);
    },
    setComments(state, payload) {
      Vue.set(state.comments, payload.taskId, payload.data);
    },
    addBoard(state, board) {
      state.activeBoard = board;
      state.boards.push(board);
    },
    addList(state, list) {
      state.lists.push(list);
    },
    addTask(state, task) {
      state.tasks[task.listId].push(task);
    },
    addComment(state, comment) {
      state.comments[comment.taskId].push(comment);
    },
    removeResourceFromArray(state, payload) {
      let index = state[payload.name].findIndex(
        resource => resource._id == payload.id
      );
      state[payload.name].splice(index, 1);
    },
    removeResource(state, payload) {
      let index = state[payload.name][payload.parentId].findIndex(
        resource => resource._id == payload.id
      );
      state[payload.name][payload.parentId].splice(index, 1);
    }
  },
  actions: {
    //#region -- AUTH STUFF --
    async register({ commit, dispatch }, creds) {
      try {
        let user = await AuthService.Register(creds);
        commit("setUser", user);
        router.push({ name: "boards" });
      } catch (e) {
        console.warn(e.message);
      }
    },
    async login({ commit, dispatch }, creds) {
      try {
        let user = await AuthService.Login(creds);
        commit("setUser", user);
        router.push({ name: "boards" });
      } catch (e) {
        console.warn(e.message);
      }
    },
    async logout({ commit, dispatch }) {
      try {
        let success = await AuthService.Logout();
        if (!success) {
        }
        commit("resetState");
        router.push({ name: "login" });
      } catch (e) {
        console.warn(e.message);
      }
    },
    async deleteResourceById({ commit, dispatch }, payload) {
      try {
        await api.delete(payload.name + "/" + payload.id);
        commit("removeResource", payload);
      } catch (error) {
        console.error(error);
      }
    },
    async removeResourceFromArray({ commit, dispatch }, payload) {
      try {
        await api.delete(payload.name + "/" + payload.id);
        commit("removeResourceFromArray", payload);
      } catch (error) {
        console.error(error);
      }
    }
    //#endregion

    //#region -- BOARDS --

    //#endregion

    //#region -- LISTS --

    //#endregion
  }
});
