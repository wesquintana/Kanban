<template>
  <div class="comment">
    <div class="col-12 d-flex justify-content-between text-light mt-2">
      {{ commentData.content }}
      <i @click="deleteComment" class="fas fa-times text-danger"></i>
    </div>
  </div>
</template>
<script>
export default {
  name: "comment",
  props: ["commentData"],
  data() {
    return {};
  },
  methods: {
    deleteComment() {
      this.$store.dispatch("deleteResourceById", {
        name: "comments",
        id: this.commentData._id,
        parentId: this.commentData.taskId
      });
    }
  }
};
</script>
<style scoped>
i {
  font-size: 1.2rem;
}
i:hover {
  cursor: pointer;
}
</style>
