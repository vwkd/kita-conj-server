import { error, Form } from "./utils.ts";
import { select_person1_s } from "./prs.ts";
import { checkIsStrong } from "./aor.ts";

export function select_person2_s(person_s, root, note, thema) {
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

export default function getOPT(args, exceptions, person_s) {
  const form = Form();
  
  form.preverb = args.preverb;
  form.person1 = select_person1_s(person_s);
  form.version = args.version;
  form.root = args.root;
  
  form.preverbExc = exceptions.preverb;
  form.person1Exc = exceptions.person1;
  form.versionExc = exceptions.version;
  form.rootExc = exceptions.root;
  
  const rootValue = form.root.value;
  const rootNote = form.root.note;
  const themaValue = form.thema.value;
  form.person2 = select_person2_s(person_s, rootValue, rootNote, themaValue);
  form.person2Exc = exceptions.person2;
  
  form.thema = null;
  form.modus = null;
  form.themaExc = exceptions.thema;
  form.modusExc = exceptions.modus;
  
  return form;
}
