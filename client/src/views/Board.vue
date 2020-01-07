<template>
  <main class="board container">
    <div class="row">
      <div class="col-12">
        <h1>{{ board.title }}</h1>
        <h4>{{ board.description }}</h4>
      </div>
    </div>
    <div class="row d-flex justify-content-center">
      <div class="col-4">
        <form @submit.prevent="addList">
          <div class="form-group">
            <input
              v-model="newList.title"
              type="text"
              class="form-control"
              placeholder="list name..."
              required
            />
          </div>
          <button class="btn button btn-success">New List</button>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "board",
  data() {
    return {
      newList: {
        title: "",
        authorId: this.$store.state.user._id,
        boardId: this.boardId
      }
    };
  },
  mounted() {
    this.$store.dispatch("getBoardById", this.$route.params.boardId);
  },
  methods: {
    addList() {
      let newList = { ...this.newList };
      this.$store.dispatch("addList", newList);
      this.newList.title = "";
    }
  },
  computed: {
    board() {
      return this.$store.state.activeBoard;
    }
  },
  props: ["boardId"]
};
</script>
