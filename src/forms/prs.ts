import { error, Form } from "./utils.ts";

export function select_person1_s(person_s) {
  return person_s == "S1"
    ? "ვ"
    : person_s == "S2"
    ? null
    : person_s == "S3"
    ? null
    : person_s == "P1"
    ? "ვ"
    : person_s == "P2"
    ? null
    : person_s == "P3"
    ? null
    : error(`Invalid person_s "${person_s}"`);
}

export function select_person2_s(stem, person_s) {
  return person_s == "S1"
    ? null
    : person_s == "S2"
    ? null
    : person_s == "S3"
    ? "ს"
    : person_s == "P1"
    ? "თ"
    : person_s == "P2"
    ? "თ"
    : person_s == "P3"
    ? stem.endsWith("ი") ? "ან" : "ენ"
    : error(`Invalid person_s "${person_s}"`);
}

export default function getPRS(args, exceptions, person_s) {
  const form = Form();
  
  form.preverb = null;
  form.person1 = select_person1_s(person_s);
  form.version = args.version;
  form.root = args.root;
  form.thema = args.thema;
  form.modus = null;
  
  form.preverbExc = exceptions.preverb;
  form.person1Exc = exceptions.person1;
  form.versionExc = exceptions.version;
  form.rootExc = exceptions.root;
  form.themaExc = exceptions.thema;
  form.modusExc = exceptions.modus;
  
  const stem = form.stemValue;
  form.person2 = select_person2_s(stem, person_s);
  form.person2Exc = exceptions.person2;
  
  return form;
}
