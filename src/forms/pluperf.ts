import { Form, hasVowel } from "./utils.ts";
import { merge_person1, select_person1_io, select_person1_s } from "./prs.ts";
import { checkIsO } from "./aor.ts";
import {
  merge_person2,
  select_perfect2 as select_perfect2_perf,
  select_person2_io,
  select_root as select_root_perf,
  select_thema,
} from "./perf.ts";
import { getRootAor } from "./aor.ts";

export function select_root(root, root_srs2, thema) {
  return thema == "ებ" && hasVowel(root)
    ? select_root_perf(root, root_srs2, thema)
    : getRootAor(root, { root_srs2, thema, person_s: "S3" });
}

export function select_perfect2(root, thema, person_s) {
  return thema == "ებ" && hasVowel(root)
    ? "ინ"
    : select_perfect2_perf(thema, person_s);
}

function select_person2_s(person_s, { root, thema }) {
  const isO = checkIsO(root, thema);

  return person_s == "S1"
    ? "ე"
    : person_s == "S2"
    ? "ე"
    : person_s == "S3"
    ? isO ? "ო" : "ა"
    : person_s == "P1"
    ? "ეთ"
    : person_s == "P2"
    ? "ეთ"
    : person_s == "P3"
    ? isO ? "ო" : "ა"
    : error(`Invalid person_s "${person_s}"`);
}

export default function getPLUPERF(args, person_s, person_o) {
  const obj = "INDIRECT";
  const form = Form(person_o, person_s, obj);

  form.preverb = args.preverb;
  form.version = "PSEUDO_E";

  const root = args.root;
  const root_srs2 = args.root_srs2;
  const thema = args.thema;

  form.root = select_root(root, root_srs2, thema);
  form.thema = select_thema(thema, root, person_s);
  form.modus = null;
  form.perfect2 = select_perfect2(root, thema, person_s);

  const stem = form.stemValue;
  const pz1_s = select_person1_s(person_o);
  const pz1_io = select_person1_io(person_s, { stem });
  const pz2_s = select_person2_s(person_o, { root, thema });
  const pz2_io = select_person2_io(person_s);
  form.person1 = merge_person1(pz1_s, pz1_io, person_o, person_s, obj);
  form.person2 = merge_person2(pz2_s, pz2_io, person_o, person_s);

  return form;
}
