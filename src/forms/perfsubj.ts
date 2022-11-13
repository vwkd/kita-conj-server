import { Form } from "./utils.ts";
import { merge_person1, select_person1_io, select_person1_s } from "./prs.ts";
import { checkIsStrong } from "./aor.ts";
import { merge_person2, select_person2_io, select_thema } from "./perf.ts";
import { select_perfect2, select_root } from "./pluperf.ts";

function select_person2_s(person_s, { root, root_srs2, thema }) {
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
    ? isStrong ? "ას" : "ოს"
    : error(`Invalid person_s "${person_s}"`);
}

export default function getPERFSUBJ(args, person_s, person_o) {
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
  const pz2_s = select_person2_s(person_o, { root, root_srs2, thema });
  const pz2_io = select_person2_io(person_s);
  form.person1 = merge_person1(pz1_s, pz1_io, person_o, person_s, obj);
  form.person2 = merge_person2(pz2_s, pz2_io, person_o, person_s);

  return form;
}
