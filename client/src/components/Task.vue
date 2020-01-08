<template>
  <div class="task">
    {{ taskData.description }}
    <div class="row">
      <div class="col-12">
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
    <comment-component v-for="comment in comments" :key="comment._id" :commentData="comment" />
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
        taskId: this.taskData._id
      }
    };
  },
  computed: {
    comments() {
      return this.$store.state.comments[this.newComment.taskId] || [];
    }
  },
  methods: {
    addComment() {
      let comment = { ...this.newComment };
      this.$store.dispatch("addComment", comment);
      this.newComment.content = "";
    }
  },
  components: {
    commentComponent
  }
};
</script>
<style>
</style>