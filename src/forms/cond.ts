import { Form } from "./utils.ts";
import {
  merge_person1,
  merge_person2,
  select_person1_o,
  select_person1_s,
  select_person2_o,
} from "./prs.ts";
import { select_person2_s } from "./impf.ts";

export default function getCOND(args, person_s, person_o) {
  const obj = args.obj;
  const form = Form(person_s, person_o, obj);

  form.preverb = args.preverb;
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
