import { error, Form, merge_person1, merge_person2 } from "./utils.ts";
import { select_person1_s, select_person1_o, select_person2_o } from "./prs.ts";
import { checkIsStrong } from "./aor.ts";

export function select_person2_s(person_s, { root, note, thema }) {
  const isStrong = checkIsStrong(root, note, thema);

  return person_s == "S1"
    ? isStrong ? "ა" : "ო"
    : person_s == "S2"
    ? isStrong ? "ა" : "ო"
    : person_s == "S3"
    ? isStrong ? "ას" : "ოს"
    : person_s == "P1"
    ? isStrong ? "ათ" : "ოთ"
    : person_s == "P2"
    ? isStrong ? "ათ" : "ოთ"
    : person_s == "P3"
    ? isStrong ? "ან" : "ონ"
    : error(`Invalid person_s "${person_s}"`);
}

export default function getOPT(args, exceptions, person_s, person_o) {
  const obj = args.obj;
  const form = Form(person_s, person_o, obj);
  
  form.preverb = args.preverb;
  form.version = args.version;
  form.root = args.root;
  
  form.preverbExc = exceptions.preverb;
  form.versionExc = exceptions.version;
  form.rootExc = exceptions.root;
  
  const stem = form.stemValue;
  const rootValue = form.root.value;
  const rootNote = form.root.note;
  const themaValue = form.thema.value;
  const pre_s = select_person1_s(person_s);
  const pre_o = select_person1_o(person_o, { obj, stem });
  const post_s = select_person2_s(person_s, { root: rootValue, note: rootNote, thema: themaValue });
  const post_o = select_person2_o(person_o, { obj });
  form.person1 = merge_person1(pre_s, pre_o, person_s, person_o, obj);
  form.person2 = merge_person2(post_s, post_o, person_s, person_o, obj);
  
  form.person1Exc = exceptions.person1;
  form.person2Exc = exceptions.person2;
  
  form.thema = null;
  form.modus = null;
  
  form.themaExc = exceptions.thema;
  form.modusExc = exceptions.modus;
  
  return form;
}
