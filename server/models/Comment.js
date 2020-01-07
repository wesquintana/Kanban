import mongoose from "mongoose";
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

const Comment = new Schema(
  {
    content: { type: String, required: true },
    taskId: { type: ObjectId, ref: "Task", required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

//CASCADE ON DELETE
Comment.pre("deleteMany", function(next) {
  //lets find all the comments and remove them
  Promise.all([
    //_taskService.deleteMany({ listId: this._conditions_id }),
  ])
    .then(() => next())
    .catch(err => next(err));
});

//CASCADE ON DELETE
Comment.pre("findOneAndRemove", function(next) {
  //lets find all the comments and remove them
  Promise.all([
    // _taskRepo.deleteMany({ boardId: this._conditions._id })
  ])
    .then(() => next())
    .catch(err => next(err));
});

export default Comment;
