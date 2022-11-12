import { log, SOFT_SOUNDS, T_SOUNDS, VOWELS } from "../deps.ts";
import { error, Form } from "./utils.ts";

Object.defineProperty(String.prototype, "startsWithSome", {
  value: function (arr) {
    return arr.some((el) => this.startsWith(el));
  },
});

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

export function select_person1_o(person_o, obj, { stem }) {
  return obj == "DIRECT"
    ? select_person1_do(person_o)
    : obj == "INDIRECT"
    ? select_person1_io(person_o, { stem })
    : error(`Invalid obj '${obj}'`);
}

export function select_person2_o(person_o, obj) {
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

// if stem.startsWithSome(VOWELS) like select_person1_do
export function select_person1_io(person_io, { stem }) {
  return person_io == "S1"
    ? "მ"
    : person_io == "S2"
    ? "გ"
    : person_io == "S3"
    ? stem.startsWithSome(T_SOUNDS)
      ? "ს"
      : stem.startsWithSome(VOWELS)
      ? null
      : stem.startsWithSome(SOFT_SOUNDS)
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

export function merge_person1(pz_s, pz_o, person_s, person_o, obj) {
  log.debug(
    `merge_person1: person_s '${person_s}', person_o '${person_o}', pz_s '${pz_s}', pz_o '${pz_o}'`,
  );

  // pz_o X1 and pz_s X1, pz_o X2 and pz_s X2
  if (
    (person_o.slice(-1) == "1" || person_o.slice(-1) == "2") &&
    person_o.slice(-1) == person_s.slice(-1)
  ) {
    throw new Error("reflexivity not possible");
  }

  // conflict, both non-null
  if (pz_s && pz_o) {
    // pz_o X2 supplants pz_s X1
    if (person_o.endsWith("2") && person_s.endsWith("1")) {
      return pz_o;

      // (ONLY IO) pz_o S3 appended after pz_s X1
    } else if (
      obj == "INDIRECT" && person_o.endsWith("3") && person_s.endsWith("1")
    ) {
      return pz_s + pz_o;

      // check that rules covered all conflicts
    } else {
      throw new Error("unexpected conflict without a rule");
    }

    // use non-null one if any
    // note: order doesn't matter since at most one is non-null
  } else {
    return pz_o ? pz_o : pz_s;
  }
}

export function merge_person2(pz_s, pz_o, person_s, person_o) {
  log.debug(
    `merge_person2: person_s '${person_s}', person_o '${person_o}', pz_s '${pz_s}', pz_o '${pz_o}'`,
  );

  // pz_o X1 and pz_s X1, pz_o X2 and pz_s X2
  if (
    (person_o.slice(-1) == "1" || person_o.slice(-1) == "2") &&
    person_o.slice(-1) == person_s.slice(-1)
  ) {
    throw new Error("reflexivity not possible");
  }

  // conflict, both non-null
  if (pz_s && pz_o) {
    // pz_o P2 appended after pz_s S1
    if (person_o == "P2" && person_s == "S1") {
      return pz_s + pz_o;

      // pz_o P2 appended after pz_s S3, pz_s S3 looses trailing -ს if any
    } else if (person_o == "P2" && person_s == "S3") {
      const pz_s_clean = pz_s.replace(/ს$/, "");
      return pz_s_clean + pz_o;

      // pz_s P1 supplants pz_o P2
    } else if (person_o == "P2" && person_s == "P1") {
      return pz_s;

      // pz_s P3 supplants pz_o P2
    } else if (person_s == "P3" && person_o == "P2") {
      return pz_s;

      // check that rules covered all conflicts
    } else {
      throw new Error("unexpected conflict without a rule");
    }

    // use non-null one if any
    // note: order doesn't matter since at most one is non-null
  } else {
    return pz_o ? pz_o : pz_s;
  }
}

export default function getPRS(args, person_s, person_o) {
  const obj = args.obj;
  const form = Form(person_s, person_o, obj);

  form.preverb = null;
  form.version = args.version;
  form.root = args.root;
  form.thema = args.thema;
  form.modus = null;
  form.perfect2 = null;

  const stem = form.stemValue;
  const pz1_s = select_person1_s(person_s);
  const pz1_o = select_person1_o(person_o, obj, { stem });
  const pz2_s = select_person2_s(person_s, { stem });
  const pz2_o = select_person2_o(person_o, obj);
  form.person1 = merge_person1(pz1_s, pz1_o, person_s, person_o, obj);
  form.person2 = merge_person2(pz2_s, pz2_o, person_s, person_o);

  return form;
}
