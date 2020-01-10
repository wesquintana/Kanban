<template>
  <div class="list">
    <div class="row">
      <div class="col-12 d-flex justify-content-center">
        <div class="card" style="width: 32rem">
          <div class="card-body bg-info custom-list-card">
            <div class="card-text text-right text-danger">
              <i @click="deleteList" class="far fa-times-circle"></i>
            </div>
            <h4 class="card-title text-light">{{listData.title}}</h4>

            <div class="row">
              <task-component
                v-for="task in tasks"
                :key="task._id"
                :taskData="task"
                class="col-10 mb-2 mr-auto ml-auto"
              />
            </div>
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
      </div>
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
i {
  font-size: 1.5rem;
}
.custom-list-card {
  display: inline-block;
  float: none;
  overflow-y: auto;
  max-height: 70vh;
}
.custom-list-card::-webkit-scrollbar {
  width: 8px;
}
.custom-list-card::-webkit-scrollbar-thumb {
  background-color: rgba(100, 100, 100, 0.7);
  border-radius: 4px;
}
.custom-list-card::-webkit-scrollbar-thumb:hover {
  background-color: rgba(100, 100, 100, 0.9);
}
</style>
