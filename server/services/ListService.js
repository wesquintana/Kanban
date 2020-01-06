import mongoose from "mongoose";
import List from "../models/List";

const _repository = mongoose.model("List", List);

class ListService {
  async create(rawData) {
    let data = await _repository.create(rawData);
    return data;
  }
}

const _listService = new ListService();
export default _listService;
