import mongoose from "mongoose";
import _commentService from "../services/CommentService";
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

const Task = new Schema(
  {
    description: { type: String, required: true },
    authorId: { type: ObjectId, ref: "User", required: true },
    boardId: { type: ObjectId, ref: "Board", required: true },
    listId: { type: ObjectId, ref: "List", required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

//CASCADE ON DELETE
// Task.pre("deleteMany", function(next) {
//   //lets find all the tasks and remove them
//   Promise.all([_commentService.deleteMany({ taskId: this._conditions._id })])
//     .then(() => next())
//     .catch(err => next(err));
// });

//CASCADE ON DELETE
Task.pre("findOneAndRemove", function(next) {
  //lets find all the tasks and remove them
  Promise.all([_commentService.deleteMany({ taskId: this._conditions._id })])
    .then(() => next())
    .catch(err => next(err));
});

Task.pre("findOneAndUpdate", function(next) {
  Promise.all([
    _commentService
      .updateMany({
        taskId: this._conditions._id,
        update: this._conditions.update
      })
      .then(() => next())
      .catch(err => next(err))
  ]);
});

export default Task;
