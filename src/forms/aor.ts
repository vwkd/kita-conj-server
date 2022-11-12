import { error, Form, hasVowel } from "./utils.ts";
import { select_person1_s, select_person1_o, select_person2_o, merge_person1, merge_person2 } from "./prs.ts";

export function checkIsStrong(root, note, thema) {
  return thema == "ი" && note == "R4"
    ? true
    : thema == "ავ" && !hasVowel(root)
    ? true
    : thema == "ამ"
    ? true
    : thema == "ებ" && !hasVowel(root)
    ? true
    : false;
}

export function checkIsO(root, thema) {
  return thema == "ებ" && !hasVowel(root)
    ? true
    : thema == "ობ"
    ? true
    : false;
}

export function select_person2_s(person_s, { root, note, thema }) {
  const isStrong = checkIsStrong(root, note, thema);
  const isO = checkIsO(root, thema);

  return person_s == "S1"
    ? isStrong ? "ი" : "ე"
    : person_s == "S2"
    ? isStrong ? "ი" : "ე"
    : person_s == "S3"
    ? isO ? "ო" : "ა"
    : person_s == "P1"
    ? isStrong ? "ით" : "ეთ"
    : person_s == "P2"
    ? isStrong ? "ით" : "ეთ"
    : person_s == "P3"
    ? "ეს"
    : error(`Invalid person_s "${person_s}"`);
}

export default function getAOR(args, person_s, person_o) {
  const obj = args.obj;
  const form = Form(person_s, person_o, obj);
  
  form.preverb = args.preverb;
  form.version = args.version;
  form.root = args.root;
  
  const stem = form.stemValue;
  const root = form.root.value;
  const note = form.root.note;
  const thema = form.thema.value;
  const pz1_s = select_person1_s(person_s);
  const pz1_o = select_person1_o(person_o, obj, { stem });
  const pz2_s = select_person2_s(person_s, { root, note, thema });
  const pz2_o = select_person2_o(person_o, obj);
  form.person1 = merge_person1(pz1_s, pz1_o, person_s, person_o, obj);
  form.person2 = merge_person2(pz2_s, pz2_o, person_s, person_o);
  
  form.thema = null;
  form.modus = null;
  form.perfect2 = null;
  
  return form;
}
