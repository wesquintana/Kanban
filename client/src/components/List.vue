<template>
  <div class="list">
    {{listData.title}}
    <div class="row border">
      <div class="col-12">
        <i @click="deleteList" class="far fa-times-circle"></i>
        <form @submit.prevent="addTask">
          <div class="form-group">
            <input
              v-model="newTask.description"
              type="text"
              class="form-control"
              placeholder="task name..."
              required
            />
          </div>
          <button class="btn button btn-primary">New Task</button>
        </form>
      </div>
    </div>
    <div class="row">
      <task-component v-for="task in tasks" :key="task._id" :taskData="task" class="col-10 m-auto" />
    </div>
  </div>
</template>
<script>
import taskComponent from "../components/Task";
export default {
  name: "List",
  props: ["listData"],
  mounted() {
    this.$store.dispatch("getTasksByListId", this.listData._id);
  },
  data() {
    return {
      newTask: {
        description: "",
        listId: this.listData._id,
        authorId: this.$store.state.user._id,
        boardId: this.listData.boardId
      }
    };
  },
  computed: {
    tasks() {
      return this.$store.state.tasks[this.newTask.listId] || [];
    }
  },
  methods: {
    addTask() {
      let task = { ...this.newTask };
      this.$store.dispatch("addTask", task);
      this.newTask.description = "";
    },
    deleteList() {
      this.$store.dispatch("removeResourceFromArray", {
        name: "lists",
        id: this.listData._id
      });
    }
  },
  components: {
    taskComponent
  }
};
</script>
<style>
</style>
