import { log } from "../deps.ts";
import { Form } from "./utils.ts";
import { merge_person1, select_person1_io, select_person1_s } from "./prs.ts";

// beware: here name subject / object grammatically!

function checkIsS(thema) {
  return thema == "ავ" ? true : thema == "ამ" ? true : false;
}

export function select_person2_s(person_s, { thema }) {
  const isS = checkIsS(thema);
  return person_s == "S1"
    ? "ვარ"
    : person_s == "S2"
    ? "ხარ"
    : person_s == "S3"
    ? isS ? "ს" : "ა"
    : person_s == "P1"
    ? "ვართ"
    : person_s == "P2"
    ? "ხართ"
    : person_s == "P3"
    ? isS ? "ს" : "ა"
    : error(`Invalid person_s "${person_s}"`);
}

// like PRS but P3 -თ
export function select_person2_io(person_io) {
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
    ? "თ"
    : error(`Invalid person_io "${person_io}"`);
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

      // pz_o P2 or P3 appended after pz_s S3, pz_s S3 looses trailing -ს if any
    } else if ((person_o == "P2" || person_o == "P3") && person_s == "S3") {
      const pz_s_clean = pz_s.replace(/ს$/, "");
      return pz_s_clean + pz_o;

      // pz_o P2 or P3 appended after pz_s P3 if "ა" else supplants
    } else if ((person_o == "P2" || person_o == "P3") && person_s == "P3") {
      return pz_s == "ა" ? pz_s + pz_o : pz_o;

      // pz_s P1 supplants pz_o P2
    } else if (person_o == "P2" && person_s == "P1") {
      return pz_s;

      // pz_s X1 or X2 supplants pz_o P3
    } else if (!person_s.endsWith("3") && person_o == "P3") {
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

export default function getPERF(args, person_s, person_o) {
  const obj = "INDIRECT";
  const form = Form(person_o, person_s, obj);

  form.preverb = args.preverb;
  form.version = "OBJECTIVE";
  // todo: select root
  // todo: remove leading vowel from root ?!?
  form.root = args.root;
  // todo: select thema
  form.thema = args.thema;
  form.modus = null;
  // todo: select perfect2, maybe better name for suffix if no accompanying prefix perfect1 exists
  form.perfect2 = "ი";

  const stem = form.stemValue;
  const thema = form.thema.value;
  const pz1_s = select_person1_s(person_o);
  const pz1_io = select_person1_io(person_s, { stem });
  const pz2_s = select_person2_s(person_o, { thema });
  const pz2_io = select_person2_io(person_s);
  form.person1 = merge_person1(pz1_s, pz1_io, person_o, person_s, obj);
  form.person2 = merge_person2(pz2_s, pz2_io, person_o, person_s);

  return form;
}
