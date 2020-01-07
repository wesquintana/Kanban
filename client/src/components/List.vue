<template>
  <div class="list">
    {{listData.title}}
    <div class="row">
      <div class="col-12">
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
          <button class="btn button btn-primary">New List</button>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col-10 m-auto"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "List",
  props: ["listData"],
  data() {
    return {
      newTask: {
        description: "",
        listId: this.listData._id,
        authorId: this.$store.state.user._id,
        boardId: this.boardId
      }
    };
  },
  methods: {
    addTask() {
      let task = { ...this.newTask };
      this.$store.dispatch("addTask", task);
      this.newTask.description = "";
    }
  }
};
</script>
<style>
</style>
