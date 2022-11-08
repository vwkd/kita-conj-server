import { error, Form, VOWELS, SOFT_SOUNDS, T_SOUNDS, merge_person1, merge_person2 } from "./utils.ts";

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

export function select_person2_s(person_s, { stem }) {
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

export function select_person1_o(person_o, { obj, stem }) {
  return obj == "DIRECT"
    ? select_person1_do(person_o)
    : obj == "INDIRECT"
    ? select_person1_io(person_o, { stem })
    : error(`Invalid obj '${obj}'`);
}

export function select_person2_o(person_o, { obj }) {
  return obj == "DIRECT"
    ? select_person2_do(person_o)
    : obj == "INDIRECT"
    ? select_person2_io(person_o)
    : error(`Invalid obj '${obj}'`);
}

function select_person1_do(person_do) {
  return person_do == "S1"
    ? "მ"
    : person_do == "S2"
    ? "გ"
    : person_do == "S3"
    ? null
    : person_do == "P1"
    ? "გვ"
    : person_do == "P2"
    ? "გ"
    : person_do == "P3"
    ? null
    : error(`Invalid person_do "${person_do}"`);
}

function select_person2_do(person_do) {
  return person_do == "S1"
    ? null
    : person_do == "S2"
    ? null
    : person_do == "S3"
    ? null
    : person_do == "P1"
    ? null
    : person_do == "P2"
    ? "თ"
    : person_do == "P3"
    ? null
    : error(`Invalid person_do "${person_do}"`);
}

// if stem.startsWithAny(VOWELS) like select_person1_do
function select_person1_io(person_io, { stem }) {
  return person_io == "S1"
    ? "მ"
    : person_io == "S2"
    ? "გ"
    : person_io == "S3"
    ? stem.startsWithAny(T_SOUNDS)
      ? "ს"
      : stem.startsWithAny(VOWELS)
      ? null
      : stem.startsWithAny(SOFT_SOUNDS)
      ? "(ჰ)"
      : "ჰ"
    : person_io == "P1"
    ? "გვ"
    : person_io == "P2"
    ? "გ"
    : person_io == "P3"
    ? null
    : error(`Invalid person_io "${person_io}"`);
}

// like select_person2_do
function select_person2_io(person_io) {
  return person_io == "S1"
    ? null
    : person_io == "S2"
    ? null
    : person_io == "S3"
    ? null
    : person_io == "P1"
    ? null
    : person_io == "P2"
    ? "თ"
    : person_io == "P3"
    ? null
    : error(`Invalid person_io "${person_io}"`);
}

export default function getPRS(args, exceptions, person_s, person_o) {
  const form = Form();
  
  form.preverb = null;
  form.version = args.version;
  form.root = args.root;
  form.thema = args.thema;
  form.modus = null;
  
  form.preverbExc = exceptions.preverb;
  form.versionExc = exceptions.version;
  form.rootExc = exceptions.root;
  form.themaExc = exceptions.thema;
  form.modusExc = exceptions.modus;
  
  const obj = args.obj;
  const stem = form.stemValue;
  const pre_s = select_person1_s(person_s);
  const pre_o = select_person1_o(person_o, { obj, stem });
  const post_s = select_person2_s(person_s, { stem });
  const post_o = select_person2_o(person_o, { obj });
  form.person1 = merge_person1(pre_s, pre_o, person_s, person_o, obj);
  form.person2 = merge_person2(post_s, post_o, person_s, person_o, obj);
  
  form.person1Exc = exceptions.person1;
  form.person2Exc = exceptions.person2;
  
  return form;
}
