import { entries } from "./deps.ts";

function entry(id) {
  return entries.find(entry => entry.id == id);
}

const database = {
  entry,
}

export { database };
