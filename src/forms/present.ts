import { error, Form } from "./utils.ts";

function select_person1_s(stem, person_s) {
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

function select_person2_s(stem, person_s) {
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

export default function getForm(args, exceptions, person_s) {
  const form = Form();
  
  form.preverb = null;
  form.version = args.version;
  form.root = args.root;
  form.thema = args.thema;
  
  form.preverbExc = exceptions.preverb;
  form.versionExc = exceptions.version;
  form.rootExc = exceptions.root;
  form.themaExc = exceptions.thema;
  
  const stem = form.stemValue;
  form.person1 = select_person1_s(stem, person_s);
  form.person2 = select_person2_s(stem, person_s);
  
  return form;
}
