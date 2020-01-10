<template>
  <div class="boards container-fluid bg-light">
    <div class="row d-flex justify-content-center">
      <div class="col-3">
        <h2>Boards</h2>
        <form @submit.prevent="addBoard">
          <div class="form-group">
            <input
              type="text"
              placeholder="title"
              class="form-control"
              v-model="newBoard.title"
              maxlength="25"
              required
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              placeholder="description"
              v-model="newBoard.description"
            />
          </div>

          <button class="btn button btn-success" type="submit">
            Create Board
          </button>
        </form>
        <div
          v-for="board in boards"
          :key="board._id"
          class="d-flex justify-content-between mt-2"
        >
          <h5>
            <router-link
              :to="{ name: 'board', params: { boardId: board._id } }"
              >{{ board.title }}</router-link
            >
          </h5>
          <h5>
            <i
              @click="deleteBoard(board._id)"
              class="far fa-times-circle delete-board text-danger"
            ></i>
          </h5>
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
.delete-board {
  font-size: 1.2rem;
}
.boards {
  height: 94vh;
}
</style>
