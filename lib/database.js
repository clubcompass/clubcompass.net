import { create, get, update, del } from "./db";

export const db = {
  get,
  create,
  update,
  delete: del,
};
