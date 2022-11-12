import { entries } from "./generate.ts";

function entry(id) {
  return entries.find((entry) => entry.id == id);
}

const database = {
  entry,
};

export { database };
