<template>
  <div class="comment">
    <div class="col-12 d-flex justify-content-between">
      {{commentData.content}}
      <i @click="deleteComment" class="far fa-times-circle"></i>
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
<style>
i:hover {
  cursor: pointer;
}
</style>