import { error, Form } from "./utils.ts";
import {
  merge_person1,
  merge_person2,
  select_person1_o,
  select_person1_s,
  select_person2_o,
} from "./prs.ts";
import { checkIsStrong, getRootAor } from "./aor.ts";

export function select_person2_s(person_s, { root, root_srs2, thema }) {
  const isStrong = checkIsStrong(root, root_srs2, thema);

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

export default function getOPT(args, person_s, person_o) {
  const obj = args.obj;
  const form = Form(person_s, person_o, obj);

  form.preverb = args.preverb;
  form.version = args.version;

  const rootMain = args.root;
  const root_srs2 = args.root_srs2;
  const thema = args.thema;
  form.root = getRootAor(rootMain, { root_srs2, thema, person_s: "S3" });

  const stem = form.stemValue;
  const root = form.root.value;
  const pz1_s = select_person1_s(person_s);
  const pz1_o = select_person1_o(person_o, obj, { stem });
  const pz2_s = select_person2_s(person_s, { root, root_srs2, thema });
  const pz2_o = select_person2_o(person_o, obj);
  form.person1 = merge_person1(pz1_s, pz1_o, person_s, person_o, obj);
  form.person2 = merge_person2(pz2_s, pz2_o, person_s, person_o);

  form.thema = null;
  form.modus = null;
  form.perfect2 = null;

  return form;
}
