import { error, Form } from "./utils.ts";
import {
  merge_person1,
  merge_person2,
  select_person1_o,
  select_person1_s,
  select_person2_o,
} from "./prs.ts";

export function select_person2_s(person_s) {
  return person_s == "S1"
    ? "ი"
    : person_s == "S2"
    ? "ი"
    : person_s == "S3"
    ? "ა"
    : person_s == "P1"
    ? "ით"
    : person_s == "P2"
    ? "ით"
    : person_s == "P3"
    ? "ნენ"
    : error(`Invalid person_s "${person_s}"`);
}

export default function getIMPF(args, person_s, person_o) {
  const obj = args.obj;
  const form = Form(person_s, person_o, obj);

  form.preverb = null;
  form.version = args.version;
  form.root = args.root;
  form.thema = args.thema;
  form.modus = "დ";
  form.perfect2 = null;

  const stem = form.stemValue;
  const pz1_s = select_person1_s(person_s);
  const pz1_o = select_person1_o(person_o, obj, { stem });
  const pz2_s = select_person2_s(person_s);
  const pz2_o = select_person2_o(person_o, obj);
  form.person1 = merge_person1(pz1_s, pz1_o, person_s, person_o, obj);
  form.person2 = merge_person2(pz2_s, pz2_o, person_s, person_o);

  return form;
}
