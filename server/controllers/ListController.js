import _listService from "../services/ListService";
import _taskService from "../services/TaskService";
import express from "express";
import { Authorize } from "../middleware/authorize.js";

export default class ListController {
  constructor() {
    this.router = express
      .Router()
      .use(Authorize.authenticated)
      .post("", this.create)
      .put("/:id", this.edit)
      .get("/:id/tasks", this.getTasksByListId)
      .delete("/:id", this.delete)
      .use(this.defaultRoute);
  }
  // this is pretty neat

  defaultRoute(req, res, next) {
    next({ status: 404, message: "No Such Route" });
  }

  async create(req, res, next) {
    try {
      let data = await _listService.create(req.body);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      let data = await _listService.edit(
        req.params.id,
        req.session.uid,
        req.body
      );
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async getTasksByListId(req, res, next) {
    try {
      let data = await _taskService.getTasksByListId(
        req.params.id,
        req.session.uid
      );
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async delete(req, res, next) {
    try {
      let data = await _listService.delete(req.params.id, req.session.uid);
      res.send("Sucessfully Deleted");
    } catch (error) {
      next(error);
    }
  }
}
