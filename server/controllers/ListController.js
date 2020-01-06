import _listService from "../services/ListService";
import express from "express";
import { Authorize } from "../middleware/authorize.js";

export default class ListController {
  constructor() {
    this.router = express
      .Router()
      .use(Authorize.authenticated)
      .post("", this.create)
      // .put("/:id", this.edit)
      // .delete("/:id", this.delete)
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
}
