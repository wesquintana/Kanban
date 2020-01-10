<template>
  <div class="task">
    <div class="row">
      <div class="col-12 d-flex justify-content-center">
        <div class="card" style="width: 24rem">
          <div class="card-body bg-secondary">
            <div class="text-right">
              <i @click="deleteTask" class="far fa-times-circle"></i>
            </div>
            <h4 class="textlight">{{ taskData.description }}</h4>
            <form @submit.prevent="moveTask">
              <div class="form-group">
                <select v-model="selected" required>
                  <option
                    v-for="list in lists"
                    :key="list._id"
                    v-bind:value="list._id"
                    v-show="list._id != taskData.listId"
                  >{{ list.title }}</option>
                </select>
              </div>
              <button class="btn btn-info btn-sm">confirm</button>
            </form>
            <form @submit.prevent="addComment">
              <div class="form-group">
                <input
                  v-model="newComment.content"
                  type="text"
                  class="form-control"
                  placeholder="comment name..."
                  required
                />
              </div>
              <button class="btn button btn-primary">New Comment</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <comment-component
      v-for="comment in comments"
      :key="comment._id"
      :commentData="comment"
      class="row border"
    />
  </div>
</template>
<script>
import commentComponent from "../components/Comment";
export default {
  name: "Task",
  props: ["taskData"],
  mounted() {
    this.$store.dispatch("getCommentsByTaskId", this.taskData._id);
  },
  data() {
    return {
      newComment: {
        content: "",
        authorId: this.$store.state.user._id,
        taskId: this.taskData._id,
        boardId: this.taskData.boardId,
        listId: this.taskData.listId
      },
      selected: ""
    };
  },
  computed: {
    lists() {
      return this.$store.state.lists;
    },
    comments() {
      return this.$store.state.comments[this.newComment.taskId] || [];
    }
  },
  methods: {
    addComment() {
      let comment = { ...this.newComment };
      this.$store.dispatch("addComment", comment);
      this.newComment.content = "";
    },
    deleteTask() {
      this.$store.dispatch("deleteResourceById", {
        name: "tasks",
        id: this.taskData._id,
        parentId: this.taskData.listId
      });
    },
    moveTask() {
      this.$store.dispatch("moveTask", {
        id: this.taskData._id,
        listId: this.selected,
        parentId: this.taskData.listId,
        name: "tasks"
      });
      this.selected = "";
    }
  },
  components: {
    commentComponent
  }
};
</script>
<style>
</style>