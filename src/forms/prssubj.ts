import { error, Form } from "./utils.ts";
import { select_person1_s } from "./prs.ts";

function select_person2_s(person_s) {
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

export default function getPRSSUBJ(args, exceptions, person_s) {
  const form = Form();
  
  form.preverb = null;
  form.person1 = select_person1_s(person_s);
  form.version = args.version;
  form.root = args.root;
  form.thema = args.thema;
  form.modus = "დ";
  form.person2 = select_person2_s(person_s);
  
  form.preverbExc = exceptions.preverb;
  form.person1Exc = exceptions.person1;
  form.versionExc = exceptions.version;
  form.rootExc = exceptions.root;
  form.themaExc = exceptions.thema;
  form.modusExc = exceptions.modus;
  form.person2Exc = exceptions.person2;
  
  return form;
}
