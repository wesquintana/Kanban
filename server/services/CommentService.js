import mongoose from "mongoose";
import Comment from "../models/Comment";
import ApiError from "../utils/ApiError";

const _repository = mongoose.model("Comment", Comment);

class CommentService {
  async create(rawData) {
    let data = await _repository.create(rawData);
    return data;
  }

  async edit(id, userId, update) {
    let data = await _repository.findOneAndUpdate({ _id: id }, update, {
      new: true
    });
    if (!data) {
      throw new ApiError("Invalid ID", 400);
    }
    return data;
  }
  async delete(id, userId) {
    let data = await _repository.findOneAndRemove({
      _id: id
    });
    if (!data) {
      throw new ApiError("Invalid ID", 400);
    }
    return data;
  }
  async deleteMany(task) {
    let data = await _repository.deleteMany(task);
  }
  async getCommentByTaskId(id) {
    let data = await _repository.find({ taskId: id });
    if (!data) {
      throw new ApiError("Invalid ID", 400);
    }
    return data;
  }
  get repository() {
    return _repository;
  }
}

const _commentService = new CommentService();
export default _commentService;
