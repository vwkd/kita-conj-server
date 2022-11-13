import { log } from "$utils/logger.ts";
import { VOWELS } from "$utils/constants.ts";

const CATEGORY = [1, 2, 3, 4, 5];

const PREVERB = [
  null,
  "მი",
  "მო",
  "მიმო",
  "წა",
  "წამო",
  "შე",
  "შემო",
  "გა",
  "გამო",
  "ა",
  "ამო",
  "ჩა",
  "ჩამო",
  "და",
  "გადა",
  "გადმო",
];

const VERSION = [
  "NEUTRAL1",
  "NEUTRAL2",
  "SUBJECTIVE",
  "OBJECTIVE",
  "SUPERESSIVE",
  "PSEUDO_E",
];

const ROOT_SRS2 = [null, "R1", "R2", "R3", "R4", "R5", "R6"];

const THEMA = [null, "ი", "ავ", "ამ", "ებ", "ობ"];

const OBJ = ["DIRECT", "INDIRECT"];

const MODUS = [null, "დ"];

const PERFECT2 = [null, "ი", "ინ"];

const PERSON = ["S1", "S2", "S3", "P1", "P2", "P3"];

export function select_version(version, person_o) {
  return version == "NEUTRAL1"
    ? null
    : version == "NEUTRAL2"
    ? "ა"
    : version == "SUBJECTIVE"
    ? "ი"
    : version == "OBJECTIVE"
    ? person_o.slice(-1) == "3" ? "უ" : "ი"
    : version == "SUPERESSIVE"
    ? "ა"
    : version == "PSEUDO_E"
    ? "ე"
    : error(`Invalid version "${version}"`);
}

export function error(msg) {
  throw new Error(msg);
}

export function Form(person_s, person_o, obj) {
  log.debug("Creating form:", person_s, person_o, obj);

  validatePerson(person_s);
  validatePerson(person_o);
  validateObj(obj);

  const preverb = {};

  const person1 = {};

  const version = {};

  const root = {};

  const thema = {};

  const modus = {};

  const perfect2 = {};

  const person2 = {};

  return {
    get preverb() {
      return preverb;
    },
    set preverb(value) {
      validatePreverb(value);
      preverb.value = value;
    },
    get person1() {
      return person1;
    },
    set person1(value) {
      validatePersonX(value);
      person1.value = value;
    },
    get version() {
      return version;
    },
    set version(value) {
      validateVersion(value, obj);
      version.valueRaw = value;
      version.value = select_version(value, person_o);
    },
    get root() {
      return root;
    },
    set root(value) {
      validateRoot(value);
      root.value = value;
    },
    get thema() {
      return thema;
    },
    set thema(value) {
      validateThema(value);
      thema.value = value;
    },
    get modus() {
      return modus;
    },
    set modus(value) {
      validateModus(value);
      modus.value = value;
    },
    get perfect2() {
      return perfect2;
    },
    set perfect2(value) {
      validatePerfect2(value);
      perfect2.value = value;
    },
    get person2() {
      return person2;
    },
    set person2(value) {
      validatePersonX(value);
      person2.value = value;
    },
    get stemValue() {
      return [
        version.value,
        root.value,
        thema.value,
        modus.value,
        perfect2.value,
      ].filter(Boolean).join("");
    },
  };
}

export function validateArgs(
  { category, preverb, version, root, root_srs2, thema, obj },
) {
  validateCategory(category);
  validatePreverb(preverb);
  validateObj(obj);
  validateVersion(version, obj);
  validateRoot(root);
  validateRootSrs2(root_srs2);
  validateThema(thema);
}

function validateCategory(value) {
  if (typeof value != "number") {
    throw new Error("category must be a number");
  }

  if (!CATEGORY.some((v) => v == value)) {
    throw new Error(`category must be one of '${CATEGORY.join("', '")}'`);
  }
}

function validateObj(value) {
  if (typeof value != "string") {
    throw new Error("obj must be a string");
  }

  if (!OBJ.some((v) => v == value)) {
    throw new Error(`obj must be one of '${OBJ.join("', '")}'`);
  }
}

function validateRootSrs2(value) {
  if (typeof value != "string" && value !== null) {
    throw new Error("root_srs2 must be a string or null");
  }

  if (!ROOT_SRS2.some((v) => v == value)) {
    throw new Error(`root_srs2 must be one of '${ROOT_SRS2.join("', '")}'`);
  }
}

function validatePerson(value) {
  if (typeof value != "string") {
    throw new Error("person must be a string");
  }

  if (!PERSON.some((v) => v == value)) {
    throw new Error(`person must be one of '${PERSON.join("', '")}'`);
  }
}

function validatePreverb(value) {
  if (typeof value != "string" && value !== null) {
    throw new Error("preverb must be a string or null");
  }

  if (!PREVERB.some((p) => p == value)) {
    throw new Error(`preverb must be one of '${PREVERB.join("', '")}'`);
  }
}

function validateVersion(value, obj) {
  if (typeof value != "string") {
    throw new Error("version must be a string");
  }

  if (!VERSION.some((v) => v == value)) {
    throw new Error(`version must be one of '${VERSION.join("', '")}'`);
  }

  if (obj != "DIRECT" && value == "SUBJECTIVE") {
    throw new Error(`object must be 'DIRECT' for '${value}' version`);
  }

  if (
    obj != "INDIRECT" && ["OBJECTIVE", "SUPERESSIVE"].some((v) => v == value)
  ) {
    throw new Error(`object must be 'INDIRECT' for '${value}' version`);
  }
}

function validateRoot(value) {
  if (typeof value != "string") {
    throw new Error("root must be a string");
  }

  if (value == "") {
    throw new Error("root must not be empty");
  }
}

function validateThema(value) {
  if (typeof value != "string" && value !== null) {
    throw new Error("thema must be a string or null");
  }

  if (!THEMA.some((t) => t == value)) {
    throw new Error(`thema must be one of '${THEMA.join("', '")}'`);
  }
}

function validateModus(value) {
  if (typeof value != "string" && value !== null) {
    throw new Error("modus must be a string or null");
  }

  if (!MODUS.some((t) => t == value)) {
    throw new Error(`modus must be one of '${MODUS.join("', '")}'`);
  }
}

function validatePerfect2(value) {
  if (typeof value != "string" && value !== null) {
    throw new Error("perfect2 must be a string or null");
  }

  if (!PERFECT2.some((t) => t == value)) {
    throw new Error(`perfect2 must be one of '${PERFECT2.join("', '")}'`);
  }
}

function validatePersonX(value) {
  if (typeof value != "string" && value !== null) {
    throw new Error("person must be a string or null");
  }

  if (value === "") {
    throw new Error("person must not be empty");
  }
}

function validateNote(value) {
  if (typeof value != "string") {
    throw new Error("note must be a string");
  }

  if (value == "") {
    throw new Error("note must not be empty");
  }
}

export function hasVowel(value) {
  return VOWELS.some((v) => value.includes(v));
}
