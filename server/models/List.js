import mongoose from "mongoose";
import _taskService from "../services/TaskService";
import _commentService from "../services/CommentService";
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

const List = new Schema(
  {
    title: { type: String, required: true },
    authorId: { type: ObjectId, ref: "User", required: true },
    boardId: { type: ObjectId, ref: "Board", required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

//CASCADE ON DELETE
// List.pre("deleteMany", function(next) {
//   //lets find all the lists and remove them
//   Promise.all([_taskService.deleteMany({ listId: this._conditions._id })])
//     .then(() => next())
//     .catch(err => next(err));
// });

//CASCADE ON DELETE
List.pre("findOneAndRemove", function(next) {
  //lets find all the lists and remove them
  Promise.all([
    _taskService.deleteMany({ listId: this._conditions._id }),
    _commentService.deleteMany({ listId: this._conditions._id })
  ])
    .then(() => next())
    .catch(err => next(err));
});

export default List;
