<template>
  <div class="board">{{board.title}}</div>
</template>

<script>
export default {
  name: "board",
  mounted() {
    this.$store.dispatch("getBoardById", this.$route.params.boardId);
  },
  computed: {
    board() {
      return (
        //FIXME This does not work on page reload because the boards array is empty in the store
        this.$store.state.activeBoard
      );
    }
  },
  props: ["boardId"]
};
</script>
