<template>
  <div class="boards container-fluid bg-light">
    <div class="row">
      <div class="col-12">
        <h2>Boards</h2>
        <form @submit.prevent="addBoard">
          <input
            type="text"
            placeholder="title"
            v-model="newBoard.title"
            required
          />
          <input
            type="text"
            placeholder="description"
            v-model="newBoard.description"
          />
          <button type="submit">Create Board</button>
        </form>
        <div v-for="board in boards" :key="board._id">
          <router-link
            :to="{ name: 'board', params: { boardId: board._id } }"
            >{{ board.title }}</router-link
          >
          <i @click="deleteBoard(board._id)" class="far fa-times-circle"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  name: "boards",
  mounted() {
    this.$store.dispatch("getBoards");
    this.$store.dispatch("clearChildren");
  },
  data() {
    return {
      newBoard: {
        title: "",
        description: ""
      }
    };
  },
  computed: {
    boards() {
      return this.$store.state.boards;
    }
  },
  methods: {
    addBoard() {
      this.$store.dispatch("addBoard", this.newBoard);
      this.newBoard = { title: "", description: "" };
    },
    deleteBoard(boardId) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085D6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          this.$store.dispatch("removeResourceFromArray", {
            name: "boards",
            id: boardId
          });
          this.$store.dispatch("removeActiveBoard");
        }
      });
    }
  }
};
</script>
<style>
.boards {
  height: 93vh;
}
</style>
