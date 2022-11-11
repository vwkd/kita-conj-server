import { Form } from "./utils.ts";
import { select_person1_s, select_person1_io, merge_person1 } from "./prs.ts";
import { checkIsStrong } from "./aor.ts";
import { select_person2_io, merge_person2 } from "./perf.ts";

function select_person2_s(person_s, { root, note, thema }) {
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
    ? isStrong ? "ას" : "ოს"
    : error(`Invalid person_s "${person_s}"`);
}

export default function getPERFSUBJ(args, exceptions, person_s, person_o) {
  const obj = "INDIRECT";
  const form = Form(person_o, person_s, obj);
  
  form.preverb = args.preverb;
  form.version = "PSEUDO_E";
  // todo: select root
  // todo: remove leading vowel from root ?!?
  form.root = args.root;
  // todo: select thema
  form.thema = args.thema;
  form.modus = null;
  // todo: select perfect2
  form.perfect2 = "ინ";
  
  form.preverbExc = exceptions.preverb;
  form.versionExc = exceptions.version;
  form.rootExc = exceptions.root;
  form.themaExc = exceptions.thema;
  form.modusExc = exceptions.modus;
  form.perfect2Exc = exceptions.perfect2;
  
  const stem = form.stemValue;
  const root = form.root.value;
  const note = form.root.note;
  const thema = form.thema.value;
  const pz1_s = select_person1_s(person_o);
  const pz1_io = select_person1_io(person_s, { stem });
  const pz2_s = select_person2_s(person_o, { root, note, thema });
  const pz2_io = select_person2_io(person_s);
  form.person1 = merge_person1(pz1_s, pz1_io, person_o, person_s, obj);
  form.person2 = merge_person2(pz2_s, pz2_io, person_o, person_s);
  
  form.person1Exc = exceptions.person1;
  form.person2Exc = exceptions.person2;
  
  return form;
}
