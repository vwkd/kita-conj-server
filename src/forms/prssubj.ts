import { error, Form } from "./utils.ts";
import { select_person1_s, select_person1_o, select_person2_o, merge_person1, merge_person2 } from "./prs.ts";

export function select_person2_s(person_s) {
  return person_s == "S1"
    ? "ე"
    : person_s == "S2"
    ? "ე"
    : person_s == "S3"
    ? "ეს"
    : person_s == "P1"
    ? "ეთ"
    : person_s == "P2"
    ? "ეთ"
    : person_s == "P3"
    ? "ნენ"
    : error(`Invalid person_s "${person_s}"`);
}

export default function getPRSSUBJ(args, exceptions, person_s, person_o) {
  const obj = args.obj;
  const form = Form(person_s, person_o, obj);
  
  form.preverb = null;
  form.version = args.version;
  form.root = args.root;
  form.thema = args.thema;
  form.modus = "დ";
  form.perfect2 = null;
  
  form.preverbExc = exceptions.preverb;
  form.versionExc = exceptions.version;
  form.rootExc = exceptions.root;
  form.themaExc = exceptions.thema;
  form.modusExc = exceptions.modus;
  form.perfect2Exc = exceptions.perfect2;
  
  const stem = form.stemValue;
  const pz1_s = select_person1_s(person_s);
  const pz1_o = select_person1_o(person_o, obj, { stem });
  const pz2_s = select_person2_s(person_s);
  const pz2_o = select_person2_o(person_o, obj);
  form.person1 = merge_person1(pz1_s, pz1_o, person_s, person_o, obj);
  form.person2 = merge_person2(pz2_s, pz2_o, person_s, person_o);
  
  form.person1Exc = exceptions.person1;
  form.person2Exc = exceptions.person2;
  
  return form;
}
