import { CONSONANTS, VOWELS } from "$utils/constants.ts";
import { error, Form, hasVowel } from "./utils.ts";
import {
  merge_person1,
  merge_person2,
  select_person1_o,
  select_person1_s,
  select_person2_o,
} from "./prs.ts";

Object.defineProperty(String.prototype, "includesSome", {
  value: function (arr) {
    return arr.some((el) => this.includes(el));
  },
});

// index must be non-negative integer
Object.defineProperty(String.prototype, "insertAt", {
  value: function (idx, val) {
    return idx > 0 ? this.slice(0, idx) + val + this.slice(idx) : val + this;
  },
});

Object.defineProperty(String.prototype, "lastIndexOfSome", {
  value: function (arr) {
    return Math.max(...arr.map((el) => this.lastIndexOf(el)));
  },
});

Object.defineProperty(String.prototype, "insertBeforeLast", {
  value: function (arr, val) {
    return this.insertAt(this.lastIndexOfSome(arr), val);
  },
});

export function getRootAor(root, { root_srs2, thema, person_s }) {
  return root_srs2 == null
    ? root
    // R1: [thema 'null'] Alterates vocal 'ე' to 'ი'.
    // TODO: can have only single match? use relace instead
    : root_srs2 == "R1" && thema == null && root.includes("ე")
    ? root.replaceAll("ე", "ი")
    // R2: [thema 'null'] Alterates vocal 'ე' to 'ი' and loses 'ვ' of ending 'ევ'.
    : root_srs2 == "R2" && thema == null && root.includes("ე") &&
        root.endsWith("ევ")
    ? root.replaceAll("ე", "ი").slice(0, -1)
    // R3: [thema 'ი', no vowels] Extends root before last consonant with 'ა'.
    : root_srs2 == "R3" && thema == "ი" && !root.includesSome(VOWELS)
    ? root.insertBeforeLast(CONSONANTS, "ა")
    // R4: [thema 'ი', no vowels, person_s X1 X2] Extends root before last consonant with 'ე'.
    : root_srs2 == "R4" && thema == "ი" && !root.includesSome(VOWELS)
    ? person_s.endsWith("3") ? root : root.insertBeforeLast(CONSONANTS, "ე")
    // R5: [thema 'ავ', no vowels, person_s X1 X2] Extends root before last consonant with 'ა'.
    : root_srs2 == "R5" && thema == "ავ" && !root.includesSome(VOWELS)
    ? person_s.endsWith("3") ? root : root.insertBeforeLast(CONSONANTS, "ა")
    // R6: [thema 'ობ', person_s X1 X2] Extends root at end with 'ვ'.
    : root_srs2 == "R6" && thema == "ობ"
    ? person_s == "S3" ? root : root + "ვ"
    : error(`Invalid root_srs2 "${root_srs2}"`);
}

export function checkIsStrong(root, root_srs2, thema) {
  return thema == "ი" && root_srs2 == "R4"
    ? true
    : thema == "ავ" && !hasVowel(root)
    ? true
    : thema == "ამ"
    ? true
    : thema == "ებ" && !hasVowel(root)
    ? true
    : false;
}

export function checkIsO(root, thema) {
  return thema == "ებ" && !hasVowel(root) ? true : thema == "ობ" ? true : false;
}

export function select_person2_s(person_s, { root, root_srs2, thema }) {
  const isStrong = checkIsStrong(root, root_srs2, thema);
  const isO = checkIsO(root, thema);

  return person_s == "S1"
    ? isStrong ? "ი" : "ე"
    : person_s == "S2"
    ? isStrong ? "ი" : "ე"
    : person_s == "S3"
    ? isO ? "ო" : "ა"
    : person_s == "P1"
    ? isStrong ? "ით" : "ეთ"
    : person_s == "P2"
    ? isStrong ? "ით" : "ეთ"
    : person_s == "P3"
    ? "ეს"
    : error(`Invalid person_s "${person_s}"`);
}

export default function getAOR(args, person_s, person_o) {
  const obj = args.obj;
  const form = Form(person_s, person_o, obj);

  form.preverb = args.preverb;
  form.version = args.version;

  const rootMain = args.root;
  const root_srs2 = args.root_srs2;
  const thema = args.thema;
  form.root = getRootAor(rootMain, { root_srs2, thema, person_s });

  const stem = form.stemValue;
  const root = form.root.value;
  const pz1_s = select_person1_s(person_s);
  const pz1_o = select_person1_o(person_o, obj, { stem });
  const pz2_s = select_person2_s(person_s, { root, root_srs2, thema });
  const pz2_o = select_person2_o(person_o, obj);
  form.person1 = merge_person1(pz1_s, pz1_o, person_s, person_o, obj);
  form.person2 = merge_person2(pz2_s, pz2_o, person_s, person_o);

  form.thema = null;
  form.modus = null;
  form.perfect2 = null;

  return form;
}
